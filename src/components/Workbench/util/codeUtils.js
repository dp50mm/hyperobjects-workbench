import _ from 'lodash'

var esprima = require('esprima')

export function getLetWarnings(code) {
    let coreSyntax = esprima.parseScript(code, {
        tolerant: false,
        loc: true
      })
      let flattenExpressionDeclarations = coreSyntax.body.filter(p => p.type === 'VariableDeclaration')
      coreSyntax.body.forEach(p => {
        if(p.type === 'ExpressionStatement') {
          let expressionArguments = _.get(p, 'expression.arguments', [])
          expressionArguments.forEach(argument => {
            if(argument.type === "ArrowFunctionExpression") {
              flattenExpressionDeclarations = flattenExpressionDeclarations.concat(argument.body.body)
            }
          })
        }
      })
      return flattenExpressionDeclarations.filter(p => {
        return _.get(p, 'kind', false) === 'let'
      })
}