export default fetchCountries
const BASE_URL = 'https://restcountries.eu/rest/v2/name'

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/${searchQuery}`).then(response => {
    if (response.status === 200) {
    
      return response.json();
    } else {
      throw Error(response.status);
    }
  })

}