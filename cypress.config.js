const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://automationexercise.com/',
    experimentalRunAllSpecs: true,
  },
});
