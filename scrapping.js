const axios = require('axios');
const cheerio = require('cheerio');
const j2cp=require("json2csv").Parser;
const fs= require("fs");


const fetchKeyboards = async () => {
    try {
        const response = await axios.get("https://www.amazon.in/s?k=keyboard&crid=201T21PI1ODNW&sprefix=key%2Caps%2C455&ref=nb_sb_ss_softlines-tsdoa-joint-contextual-iss_2_3");
 
        const html = response.data;
 
        const $ = cheerio.load(html);
 
        const keyboards = [];
 
  $("div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20").each((_idx, el) => {
            const keyboard= $(el)
            const title = keyboard.find("span.a-size-medium.a-color-base.a-text-normal").text()
            const image = keyboard.find("div.a-section.aok-relative.s-image-fixed-height>img.s-image").attr('src')
 
 //const link = shelf.find('a.a-link-normal.a-text-normal').attr('href')
 
 const reviews = keyboard.find('div.a-row.a-spacing-medium.averageStarRatingNumerical').text()
 
 const stars = keyboard.find("div.a-row.a-size-small").text()
 
 const price = keyboard.find("div.a-row.a-size-base.a-color-base").text()
 
 
     let element = {
         title,
         image,
         //link: `https://amazon.com${link}`,
         price,
         reviews,
         stars,
     }  
            keyboards.push(element)
        });
  const parser = new j2cp();
  const csv = parser.parse(keyboards);
  fs.writeFileSync("./data.csv",csv);
 
        return keyboards;
    } catch (error) {
        throw error;
    }
 };
 
 fetchKeyboards().then((keyboards) => console.log(keyboards));
 
 const fetchSpeakers = async () => {
     try {
         const response = await axios.get("https://www.amazon.in/s?k=speaker&crid=1LWB2J3IE9HEY&sprefix=speaker%2Caps%2C375&ref=nb_sb_ss_ts-doa-p_2_7");
  
         const html = response.data;
  
         const $ = cheerio.load(html);
  
         const speakers = [];
  
   $("div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20").each((_idx, el) => {
             const speaker= $(el)
             const title = speaker.find("span.a-size-medium.a-color-base.a-text-normal").text()
             const image = speaker.find("div.a-section.aok-relative.s-image-fixed-height>img.s-image").attr('src')
  
  //const link = speaker.find('a.a-link-normal.a-text-normal').attr('href')
  
  const reviews = speaker.find("span.a-size-base.a-color-secondary").text()
  
  const stars = speaker.find("span.a-icon-alt").text()
  
  const price = speaker.find("div.a-row.a-size-base.a-color-base").text()
  
  
      let element = {
          title,
          image,
          //link: `https://amazon.com${link}`,
          price,
          reviews,
          stars,
      }
  
      //if (reviews) {
        //  element.reviews = reviews
      // }
  
     // if (stars) {
     //     element.stars = stars
     // }
             speakers.push(element)
         });
 
         const parser = new j2cp();
         const csv = parser.parse(speakers);
         fs.writeFileSync("./data1.csv",csv);
 
 
         return speakers;
     } catch (error) {
         throw error;
     }
  };
  
  fetchSpeakers().then((speakers) => console.log(speakers));
 
 