const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const url = 'https://www.theguardian.com/uk'

app.get('/', (req, res) => {
  res.json('This is my Web Scraper');
})

app.get('/results', (req, res) => {
  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $('.fc-item__title', html).each(() => { // <-- Cannot be a function expression
        const title = $(this).text();
        const url = $(this).find('a').attr('href');
        articles.push({
          title,
          url
        });
      });

      res.json(articles);
    })
    .catch(err => console.log(err));  
})

app.listen(PORT, () => console.log(`server runnnig on PORT ${PORT}`));