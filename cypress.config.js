const { defineConfig } = require("cypress");
const moment = require('moment');
const currentDateTime = moment().format('YYYY-MM-DD_HH:mm:ss');



module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    projectId: "ponkd3",
    'baseUrl': 'https://saucedemo.com/',
    watchForFileChanges: false,
    reporter: 'mochawesome',
    video: true,
    'screenshotsFolder': 'cypress/report/'+`${currentDateTime}`+"/assets",
    videosFolder: 'cypress/report/'+`${currentDateTime}`+"/assets",
    'reporterOptions': {
      "reportFilename": "[status]-[name]-report",
      "html": false, // use this configuration for html if want to use merge json then run the scripts from package json
      "json": true, //create json report,
      "reportDir": 'cypress/report/'+`${currentDateTime}`
    },
    //Uncomment the specPatter to run BDD
    // specPattern: 'cypress/e2e/BDD/*.feature',
    setupNodeEvents(on, config) {

    }
  },
});
