module.exports = (app, db) => {

  app.get('/case-id', (req, res) => {
    db.collection('enforcement_data')
    .find({ "case_id": Number(req.query.case_id) })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

  app.get('/zip-code', (req, res) => {
    db.collection('enforcement_data')
    .find({ "zip_cd": Number(req.query.zip_cd) })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

}
