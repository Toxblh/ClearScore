const puppeteer = require('puppeteer')

async function getClearScore({ login, pass }) {
  let userReport

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  page.on('response', response => {
    if (response.url() === 'https://app.clearscore.com/api/gb/report-viewer/v2/report') {
      response.json().then(report => userReport = report)
    }
  });

  await page.goto('https://app.clearscore.com/login', { waitUntil: 'networkidle2' })
  await page.waitFor(1000)

  await page.focus('input#loginform_email_input')
  await page.keyboard.type(login)

  await page.focus('input#loginform_password_input')
  await page.keyboard.type(pass)

  const inputElement = await page.$('button[type=submit]')
  await inputElement.click()

  await page.waitForNavigation()

  await page.goto('https://app.clearscore.com/report', { waitUntil: 'networkidle2' })

  const output = {
    report_data: userReport.overview.reportDate,
    updated_date: userReport.overview.daysUntilNextReport,
    score: userReport.overview.score.score,
    report: userReport
  }

  await browser.close()

  return output
}

module.exports = getClearScore
