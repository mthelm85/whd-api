module.exports = (app, db) => {

  app.get('/case-id', (req, res) => {
    db.collection('enforcement_data')
    .find({ case_id: req.query.case_id })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

}
