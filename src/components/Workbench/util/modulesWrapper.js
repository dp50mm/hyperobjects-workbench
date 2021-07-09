import _ from "lodash"

var esprima = require('esprima')


function modulesWrapper(code, modules) {
    var moduleFunctionsCode = ""
    modules.forEach(module => {
        moduleFunctionsCode += wrapModuleScript(module)
    })
    return addModulesCode(code, moduleFunctionsCode)
}

/**
 * Weird formatting to make sure final script is nicely alligned
 * and doesn't include unnecessary tabs in the backtic strings
 */

function wrapModuleScript(module) {
    var moduleScript = _.get(module, "moduleScript", "")
    // TODO: implement better module code & syntax checking
    if(moduleScript === "/") moduleScript = "// bad module code"
var wrappedModuleScript = `
if(_.has(window, "WORKBENCH_MODULES")) {

    window.WORKBENCH_MODULES["${module.name}"] = function(inputParameters) {
${moduleScript}
}

}

`
    // test script for syntax errors
    try {
        let syntax = esprima.parseScript(wrappedModuleScript, {
            tolerant: false,
            loc: true
        })
        if(syntax.hasOwnProperty('errors')) {
            console.log("module syntax errors: ", module, syntax.errors)
            return `// module ${module.name} has errors`
        }
    } catch(err) {
        console.log("module syntax errors: ", module, err)
        return `// module ${module.name} has errors`
    }
    
    return wrappedModuleScript
}


function addModulesCode(code, modulesCode) {
return `
// modules code 
${modulesCode}
// direct code
${code}
`
}

export default modulesWrapper