// Retrieve and parse the dataExchangeURL from localStorage
const dataExchangeURL = JSON.parse(localStorage.getItem("selectedCompany"))?.dataExchangeURL;

// Export configuration
module.exports = {
  google: {
    API_KEY: "",
    CLIENT_ID: "",
    SECRET: "",
  },
  facebook: {
    APP_ID: "",
  },
  api: {
    API_URL: "http://192.168.0.99:9890",
  }
};
