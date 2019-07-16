[![Latest Stable Version](https://img.shields.io/npm/v/clear-score.svg)](https://www.npmjs.com/package/clear-score)
[![License](https://img.shields.io/npm/l/clear-score.svg)](https://www.npmjs.com/package/clear-score)
[![NPM Downloads](https://img.shields.io/npm/dt/clear-score.svg)](https://www.npmjs.com/package/clear-score)

# Collect credit score from clearscore.com

A simple way to collect your score from clearscore.com

### Example result of work

```
Report date: 2019-04-17
Days until new: 12
Score: 615
```

### Install

1. `git clone https://github.com/Toxblh/ClearScore`
2. `cd ClearScore`
3. `echo "module.exports = { login: 'YourL0gin', pass: 'YourPassw0rd'}" > creds.js`
4. `yarn` or `npm i`
5. `node ./index.js`
6. Your score already front of you

### Lib version

1. `npm i clear-score`
2. Use

```js
const getClearScore = require('clear-score')

getClearScore({
  login,
  pass,
}).then(score => {
  console.log('Report date:', score.report_date)
  console.log('Days until new:', score.updated_date)
  console.log('Score:', score.score)
  console.log('Report:', score.report)
})
```
