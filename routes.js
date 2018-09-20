module.exports = (app, db, moment) => {

  app.get('/case-id', (req, res) => {
    db.collection('enforcement_data')
    .find({ 'case_id': Number(req.query.case_id) })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

  app.get('/zip-code', (req, res) => {
    db.collection('enforcement_data')
    .find({ 'zip_cd': Number(req.query.zip_cd) })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

  app.get('/date', (req, res) => {
    db.collection('enforcement_data')
    .find({ 'findings_end_date': {
      '$gte': new Date(moment(req.query.start_dt, 'YYYY-MM-DD').toISOString()),
      '$lte': new Date(moment(req.query.end_dt, 'YYYY-MM-DD').toISOString())
    } })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

  app.get('/date-state', (req, res) => {
    db.collection('enforcement_data')
    .find({ '$and': [
      { 'st_cd': req.query.st_cd },
      { 'findings_end_date': {
        '$gte': new Date(moment(req.query.start_dt, 'YYYY-MM-DD').toISOString()),
        '$lte': new Date(moment(req.query.end_dt, 'YYYY-MM-DD').toISOString())
      } }
    ] })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

  app.get('/', (req, res) => {
    let params = []
    if (req.query.zip_cd) {
      params.push({ 'zip_cd': Number(req.query.zip_cd) })
    }
    if (req.query.end_dt) {
      params.push({
        'findings_end_date': {
          '$gte': new Date(moment(req.query.start_dt, 'YYYY-MM-DD').toISOString()),
          '$lte': new Date(moment(req.query.end_dt, 'YYYY-MM-DD').toISOString())
        }
      })
    }
    db.collection('enforcement_data')
    .find({ '$and': params })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

  app.post('/zip-latlng', (req, res) => {
    db.collection('zip_latlng')
    .find({ 'ZIP': { '$in': req.body.zip } })
    .toArray((err, docs) => {
      if (err) res.json({ error: err })
      res.json({ results: docs })
    })
  })

}
