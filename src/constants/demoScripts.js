export const demoScript = `model.addEditableGeometry(
    "test",
    new Path([
        {x: 300, y: 300},
        {x: 700, y: 300},
        {x: 700, y: 700},
        {x: 300, y: 700}
    ]).r(5).closed(true).fillOpacity(0.1)
)
  
  model.addProcedure(
    "test-procedure",
    (self) => {
        return [
            self.geometries['test'].clone()
                .translate({x: -100, y: 0})
                .rotate(0.1, self.center())
                .fill("#15232E")
                .fillOpacity(0.9)
                .strokeOpacity(0)
                ,
            self.geometries['test'].clone()
                .translate({x: 100, y: 0})
                .rotate(-0.1, self.center())
                .fill("#EA344C")
                .fillOpacity(0.9)
                .strokeOpacity(0)
        ]
    }
)`