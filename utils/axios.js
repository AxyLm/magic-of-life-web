const axios = require('axios')

axios.interceptors.request.use(
  function (config) {
    config.timeout = 1000 * 30;
    return config;
  },
  function (error) {
    console.log(error)
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return Promise.resolve(response.data)
  },
  function (error) {
    console.log(error)
    // Do something with response error
    return Promise.reject(error);
  }
);

module.exports = axios
