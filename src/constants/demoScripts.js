export const demoScript = `model.addEditableGeometry(
    "test",
    new Path([
        {x: 10, y: 10}
    ])
)
  
  model.addProcedure(
    "test-procedure",
    (self) => {
        return new Path([
          {x: 50, y: 100},
          {x: 60, y: 500}
        ])
    }
)`