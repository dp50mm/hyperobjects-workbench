import React, { useRef, useState, useEffect } from 'react'

import {
Frame,
Model,
Path,
hyperobjectsLanguageWrapper,
executeCode,
setupCodeExecution
} from '@dp50mm/hyperobjects-language'
import '@dp50mm/hyperobjects-language/dist/index.css'
import './workbench.scss'
import useComponentSize from '@rehooks/component-size'
import { ControlledEditor as MonacoEditor } from '@monaco-editor/react'
import _ from 'lodash'
import useMouse from '@react-hook/mouse-position'
import ReactResizeDetector from 'react-resize-detector'
import { demoScript } from 'constants/demoScripts'
setupCodeExecution()


var esprima = require('esprima')

let model = new Model()


let editor = false


const Workbench = ({
  script,
  onChange,
  scriptFromProp
}) => {
    const workbenchRef = useRef(null)
    const frameContainerRef = useRef(null)
    const frameContainerSize = useComponentSize(frameContainerRef)
    const [code, setCode] = useState(script)
    const [codeUpdated, setCodeUpdated] = useState(true)
    const [modelUpdated, setModelUpdated] = useState(false)
    const [modelIncrement, setModelIncrement] = useState(0)
    const [colDivision, setColDivision] = useState(0.5)
    const [resizingColumns, setResizingColumns] = useState(false)
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
        setCodeUpdated(true)
      }
    })
    useEffect(() => {
        if(codeUpdated) {
        // code has updated, run code
        let wrappedCode = hyperobjectsLanguageWrapper(code)
        try {
            let syntax = esprima.parseModule(wrappedCode.script, {
            tolerant: false,
            loc: true
            })
            if(syntax.hasOwnProperty('errors')) {
            console.log('syntax errors')
            console.log(syntax.errors)
            } else {
            let id = executeCode(wrappedCode)
            setTimeout(() => {
                model = window[`OUTPUTMODEL${id}`]
                onChange(code)
                setModelUpdated(true)
            }, 10)
            }
        } catch(error) {
            // console.log(error)
        }
        
        setCodeUpdated(false)
        }

        if(modelUpdated) {
        setModelIncrement(modelIncrement + 1)
        setModelUpdated(false)
        }
    })

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
    const frameWidth = windowSize.width - windowSize.width * colDivision
    const codeEditorWidth =  windowSize.width * colDivision - resizerPadding
    useEffect(() => {
      if(editor) {
        editor.layout()
      }
    })
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
      <div
        style={{display: 'flex', position: 'relative'}}
        onPointerMove={() => {

        }}
        >
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
        <div style={{width: codeEditorWidth, marginRight: resizerPadding}}>
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
              console.log(editor)
            }}
            />
        </div>
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
            />
        </div>
      </div>
    </div>
  );
}

Workbench.defaultProps = {
  script: demoScript,
  scriptFromProp: false,
  onChange: () => {}
}

export default Workbench