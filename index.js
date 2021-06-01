const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/translate', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://translate.google.com.br/?hl=pt-BR');
  
  await page.type('textarea[jsname=BJE2fc]', req.body.word, { delay: 10 });
  setTimeout(async () => {
    try {
      const StringContent = await page.$eval('span[jsname=W297wb]', el => el.textContent);
      res.json(`${StringContent}`);
      browser.close();
    } catch (error) {
      const AnotherString = await page.$eval('span[jsname=jqKxS]', el => el.textContent);
      res.json(`${AnotherString} / feminino|masculino`);
      browser.close();
    }
  }, 2000);
})

app.listen(3232, () => {
  console.log('Acesse em http://localhost:3232');
})
