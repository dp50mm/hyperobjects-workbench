function workbenchCodeWrapper(code) {
    return `
const WORKBENCH_MODULES = "WORKBENCH_MODULES"
if (!_.has(window, WORKBENCH_MODULES)) {
    window["WORKBENCH_MODULES"] = {}
}
function loadModule(moduleName) {
    // check if module is loaded on window.WORKBENCH_MODULES
    var moduleToLoad = _.get(window[WORKBENCH_MODULES], moduleName, false)
    if(moduleToLoad === "loading") {
        return false
    }
    if(moduleToLoad === false) {
        console.log("load module: ", moduleName)
        window[WORKBENCH_MODULES][moduleName] = "loading"
        return false
    }
    return moduleToLoad
}
${code}
`
}

export default workbenchCodeWrapper