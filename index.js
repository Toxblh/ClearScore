const getClearScore = require('./lib')
const creds = require('./creds')

getClearScore({
  login: creds.login,
  pass: creds.pass,
}).then(score => {
  console.log('Report date:', score.report_date)
  console.log('Days until new:', score.updated_date)
  console.log('Score:', score.score)
})
