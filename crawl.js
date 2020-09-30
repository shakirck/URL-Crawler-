const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("urls.csv");
writeStream.write("Url \n");

const links = new Set([process.argv[2]]);
const limit = process.argv[3];
links.forEach((element) => {
  request(element, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(html);

      const linkObj = $("a");

      const total = linkObj.length;

      for (let i = 0; i < total; i++) {
        const link = linkObj[i].attribs.href;
        if (link && link.includes("http")) {
          process.stdout.write("......");
          links.add(link);

          writeStream.write(`${link} \n`);
        }
      }
    }
    console.log("\n");
    console.log("crawling  Finished");
  });
});
