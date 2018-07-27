const contentSearch = (url, callback) => ({value}) => {
  // An import statment would break server-side rendering.
  require('whatwg-fetch'); // eslint-disable-line global-require

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then(callback);
};


export default contentSearch;
