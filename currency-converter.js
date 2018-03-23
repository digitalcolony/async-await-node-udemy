// 23 USD is worth 28 CAD.
// You can spend these in the following countries:

const axios = require("axios");
//http://api.fixer.io/latest?base=USD

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then(response => {
    return response.data.rates[to];
  });
};

const getCountries = currencyCode => {
  return axios
    .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then(response => {
      return response.data.map(country => country.name);
    });
};

getExchangeRate("USD", "EUR").then(rate => {
  console.log(rate);
});

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to)
    .then(tempCountries => {
      countries = tempCountries;
      return getExchangeRate(from, to);
    })
    .then(rate => {
      const exchangedAmount = amount * rate;

      return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
        ", "
      )}`;
    });
};

convertCurrency("USD", "CAD", 100).then(status => {
  console.log(status);
});

getCountries("CAD").then(countries => {
  console.log(countries);
});

//convertCurrencyAlt 
