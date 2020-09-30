const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const { exit } = require("process");
const writeStream = fs.createWriteStream("urls.csv");
writeStream.write("Url \n");

console.log(process.argv);
const links = new Set([process.argv[2]]);
const flag = true;
links.forEach((url) => {
  request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(html);

      const linkObj = $("a");

      const total = linkObj.length;

      for (let i = 0; i < Math.min(total); i++) {
        const link = linkObj[i].attribs.href;
        if (link.includes("http")) {
          links.add(link);

          if (links.size > limit) {
            flag = false;
          }

          console.log(link);
          writeStream.write(`${link} \n`);
        }
      }
    }
  });
});
