/**
 * Weird formatting to make sure final script is nicely alligned and doesn't include unnecessary tabs in the backtic strings
 */

function modulesWrapper(code, modules) {
    var moduleFunctionsCode = ""
    modules.forEach(module => {

        moduleFunctionsCode += `
if(_.has(window, "WORKBENCH_MODULES")) {

    window.WORKBENCH_MODULES["${module.name}"] = function(inputParameters) {
${module.moduleScript}
}

}

`
    })
    return `
${moduleFunctionsCode}

${code}
`
}

export default modulesWrapper