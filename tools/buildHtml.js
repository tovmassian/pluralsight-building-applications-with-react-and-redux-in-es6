import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint-disable no-console */

fs.readFile('./src/index.html', 'utf-8', (err, markup) => {
   if (err) {
       console.log(err.red);
   }

   const $ = cheerio.load(markup);

   $('head').prepend('<link rel="stylesheet" href="style.css">');

   fs.writeFile('dist/index.html', $.html(), 'utf-8', (err) => {
      if (err) {
         console.log(err.red);
      }
       console.log('index.html written to /dist'.green);
   });
});