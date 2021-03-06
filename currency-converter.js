// 23 USD is worth 28 CAD.
// You can spend these in the following countries:

const axios = require("axios");
//http://api.fixer.io/latest?base=USD

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get the exchange rate from ${from} to ${to}.`);
  }
};

const getCountries = async currencyCode => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    return response.data.map(country => country.name);
  } catch (e) {
    throw new Error(
      `Unable to get countries that use the currency code: ${currencyCode}.`
    );
  }
};

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
    ", "
  )}`;
};

convertCurrencyAlt("USD", "CAD", 100)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e.message);
  });

// const convertCurrency = (from, to, amount) => {
//   let countries;
//   return getCountries(to)
//     .then(tempCountries => {
//       countries = tempCountries;
//       return getExchangeRate(from, to);
//     })
//     .then(rate => {
//       const exchangedAmount = amount * rate;

//       return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
//         ", "
//       )}`;
//     });
// };

// getCountries("CAD").then(countries => {
//   console.log(countries);
// });

// getExchangeRate("USD", "EUR").then(rate => {
//   console.log(rate);
// });
