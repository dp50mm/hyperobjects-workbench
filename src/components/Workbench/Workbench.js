import React, { useRef, useState, useEffect } from 'react'

import {
Frame,
Model,
hyperobjectsLanguageWrapper,
executeCode,
setupCodeExecution
} from '@dp50mm/hyperobjects-language'
import '@dp50mm/hyperobjects-language/dist/index.css'
import './workbench.scss'
import { ControlledEditor as MonacoEditor } from '@monaco-editor/react'
import _ from 'lodash'
import useMouse from '@react-hook/mouse-position'
import { demoScript } from 'constants/demoScripts'
import getParams from 'util/getParams'
import AlertMessages from './components/AlertMessages'
import {
  getLetWarnings 
} from './util/codeUtils'
import workbenchCodeWrapper from "./util/workbenchCodeWrapper"
import modulesWrapper from "./util/modulesWrapper"

setupCodeExecution()


var esprima = require('esprima')


let model = new Model()

let editor = false

let moduleEditor = false

const urlParams = getParams(window.location.href)
let dontRunCode = _.get(urlParams, 'stop-code', false) === 'y'



const Workbench = ({
	name,
	script,
	moduleScript,
	modules = [],
	onChange,
	scriptFromProp,
	autoRun
}) => {
    const workbenchRef = useRef(null)
    const frameContainerRef = useRef(null)
    const [code, setCode] = useState(script)
    const [moduleCode , setModuleCode] = useState(moduleScript)
    const [codeUpdated, setCodeUpdated] = useState(true)
    const [modelUpdated, setModelUpdated] = useState(false)
    const [modelIncrement, setModelIncrement] = useState(0)
    const [colDivision, setColDivision] = useState(0.5)
    const [resizingColumns, setResizingColumns] = useState(false)
    const [alertMessages, setAlertMessages] = useState({
      let_warning: false,
      script_error: false
    })
    const mouse = useMouse(workbenchRef, {
		enterDelay: 100,
		leaveDelay: 100
    })
    const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight
    })
    
    useEffect(() => {
		if(scriptFromProp) {
			setCode(script)
			setModuleCode(moduleScript)
			setCodeUpdated(true)
		}
    }, [scriptFromProp, script, moduleScript])
    
    useEffect(() => {
        if(codeUpdated) {
			if(_.isUndefined(window.WORKBENCH_MODULES)) {
				window.WORKBENCH_MODULES = {}
			}
          // code has updated, run code
			try {
			  
				var wrappedCode = hyperobjectsLanguageWrapper(workbenchCodeWrapper(modulesWrapper(code, modules)))
				let letWarnings = getLetWarnings(code)
				if(letWarnings.length > 0) {
					let letAlertMessageText = "Warning: using let can cause crashes with double declarations. Try using var instead! check code line(s): "
					letWarnings.forEach(declaration => {
						letAlertMessageText = letAlertMessageText + `${declaration.loc.start.line}, `
					})
					if(!alertMessages.let_warning || alertMessages.let_warning.text !== letAlertMessageText) {
						setAlertMessages({...alertMessages, let_warning: {text: letAlertMessageText}})
					}
					var codeWithLetReplaced = _.clone(code).replace(/let \b/g, 'var ')
					wrappedCode = hyperobjectsLanguageWrapper(workbenchCodeWrapper(modulesWrapper(codeWithLetReplaced, modules)))
				} else {
					if(alertMessages.let_warning) {
						setAlertMessages({...alertMessages, let_warning: false})
					}
				}
				let syntax = esprima.parseScript(wrappedCode.script, {
					tolerant: false,
					loc: true
				})
				if(syntax.hasOwnProperty('errors')) {
					console.log('syntax errors')
					console.log(syntax.errors)
				
				} else {
					let id = false
					if(!dontRunCode && autoRun) {
						id = executeCode(wrappedCode)
					}
					setTimeout(() => {
						if(!dontRunCode && autoRun) {
							model = window[`OUTPUTMODEL${id}`]
						}
						if(alertMessages.script_error !== false) {
							setAlertMessages({...alertMessages, script_error: false})
						}
						onChange(code, moduleCode)
						setModelUpdated(true)
					}, 10)
				}
          } catch(error) {
              console.log(error)
              setAlertMessages({...alertMessages, script_error: { text: `Line: ${error.lineNumber} - ${error.description}`}})
          }
          
          setCodeUpdated(false)
        }

        if(modelUpdated) {
        setModelIncrement(modelIncrement + 1)
        setModelUpdated(false)
        }
    }, [codeUpdated, modelUpdated, code, moduleCode, alertMessages, onChange, modelIncrement])

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setWindowSize])
    const resizerPadding = 5
    const menuHeight = 41
    const _colDivision = windowSize.width < 450 ? 0 : colDivision
    const frameWidth = windowSize.width - windowSize.width * _colDivision
    const codeEditorWidth =  windowSize.width * _colDivision - resizerPadding
    useEffect(() => {
        if(editor) {
          editor.layout()
        }
    })
    model.name = name
	return (
		<div className="workbench" ref={workbenchRef}
		style={{
			cursor: resizingColumns ? 'col-resize' : 'inherit',
			height: windowSize.height - menuHeight
		}}
		onPointerMove={() => {
			if(resizingColumns) {
			setColDivision(mouse.x / mouse.elementWidth)
			}
		}}
		onPointerUp={() => {
			setResizingColumns(false)
		}}
		onPointerLeave={() => {
			setResizingColumns(false)
		}}
		>
		<div style={{display: 'flex', position: 'relative'}} >
      {windowSize.width > 450 && (
        <React.Fragment>
        <div className='resizer'
          style={{
            position: 'absolute',
            top: 0,
            left: codeEditorWidth,
            height: windowSize.height - menuHeight,
            width: resizerPadding,
            background: 'black',
            opacity: 0.5,
            cursor: 'col-resize',
            zIndex: 100
          }}
          onPointerDown={() => {
            setResizingColumns(true)
          }}
          />
          <div style={{width: codeEditorWidth, marginRight: resizerPadding, zIndex: 3}}>
            {moduleCode ? (
				<React.Fragment>
					<label>Module</label>
					<MonacoEditor
						value={moduleCode}
						onChange={(e, newValue) => {
							console.log(newValue)
							setModuleCode(newValue)
							setCodeUpdated(true)
						}}
						language="javascript"
						options={{
							selectOnLineNumbers: true,
							automaticLayout: true
						}}
						automaticLayout={true}
						height={(windowSize.height - menuHeight) * 0.5 - 10}
						theme='vs-dark'
						editorDidMount={(_editor, monaco) => {
							moduleEditor = monaco
						}}
						/>
					<label>Test</label>
					<MonacoEditor
						value={code}
						onChange={(e, newValue) => {
							setCode(newValue)
							setCodeUpdated(true)
						}}
						language="javascript"
						options={{
							selectOnLineNumbers: true,
							automaticLayout: true
						}}
						automaticLayout={true}
						height={(windowSize.height - menuHeight) * 0.5 - 4}
						theme='vs-dark'
						editorDidMount={(_editor, monaco) => {
							editor = monaco
						}}
						/>
					<AlertMessages
						width={codeEditorWidth}
						messages={alertMessages}
						/>
				</React.Fragment>
            ) : (
				<React.Fragment>
					<MonacoEditor
						value={code}
						onChange={(e, newValue) => {
							setCode(newValue)
							setCodeUpdated(true)
						}}
						language="javascript"
						options={{
							selectOnLineNumbers: true,
							automaticLayout: true
						}}
						automaticLayout={true}
						height={windowSize.height - menuHeight}
						theme='vs-dark'
						editorDidMount={(_editor, monaco) => {
							editor = monaco
						}}
						/>
					<AlertMessages
						width={codeEditorWidth}
						messages={alertMessages}
						/>
				</React.Fragment>
            )}
            
          </div>
        </React.Fragment>
      )}
			
			
			<div style={{width: frameWidth}} ref={frameContainerRef}>
			<Frame
				width={frameWidth}
				height={windowSize.height - menuHeight}
				model={model}
				modelHasUpdated={modelUpdated}
				editable={true}
				showBounds={true}
				showGridLines={true}
				showZoomControls={true}
				exportControls={true}
				renderControls={model.animated}
        animationControls={model.animated}
				/>
			</div>
		</div>
		</div>
	);
}

Workbench.defaultProps = {
	script: demoScript,
	scriptFromProp: false,
	moduleScript: false,
	onChange: () => {}
}

export default Workbench