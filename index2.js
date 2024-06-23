'use strict';
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //const recorder = await page.screencast({path: '/tmp/img/recording.webm'});
  await page.goto('https://www.');
  await page.setViewport({width: 1920, height: 1080});
  
    try {
          // validate cookie
          await page.click(".ei_btn_typ_validate");

          // Login
          await page.waitForSelector('input[name=_cm_user]');
          await page.type('#_userid', '');
          await page.type('#_pwduser', '');
          await page.screenshot({path: '/tmp/img/full1.png', fullPage: true});
          await page.keyboard.press('Enter');
         
          // Accueil
          await page.waitForNavigation();
          await page.waitForFunction(
            'document.querySelector("label").innerText.includes(".......")'
          );     
          console.log("OK");
                    
          // Voir cameras
          await page.goto("https://www.");
          await page.screenshot({path: '/tmp/img/full3.png', fullPage: true});                

          // Recuperer l'identifient de la clé
          //const result = await page.evaluate(() => {
            const cart = page.$.querySelector("label").innerText;
            console.log(cart);
            const indexOfFirst = cart.indexOf("case");
            console.log(indexOfFirst);
            const codecarte = cart.substring((indexOfFirst+5)).substring(0,2);
//            return Promise.resolve(codecarte);
          //});
          console.log(codecarte);                 
      

          // Saisir la clé contenue dans la case
          console.log("code carte 2: ",result);

          
          await page.type("input[id='I0:cppbox']", '0000');
          await page.screenshot({path: '/tmp/img/full5.png', fullPage: true});

          

    } catch(e) {
      console.log(e);
      await page.screenshot({path: '/tmp/img/full-error.png', fullPage: true});
      //await recorder.stop();
      browser.close();
    } finally {
      await page.screenshot({path: '/tmp/img/full-final.png', fullPage: true});
      //await recorder.stop();
      await browser.close();
    }

  //await recorder.stop();
  await browser.close();
  console.log('done');
})();