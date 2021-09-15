import './sass/main.scss';
import './partials/search.html';
import './partials/nav.html';
import './js/sidenav';
import './js/box';

import countryCardTpl from './templates/templ.handlebars'
import API from './js/fetchCountries'
import getRefs from './js/refs'

var debounce = require('lodash.debounce')

const refs = getRefs()

refs.searchForm.addEventListener('input', onSearch)

function onSearch(e) {
  e.preventDefault()

  const form = e.currentTarget
  const searchQuery = form.elements.query.value

  API.fetchCountry(searchQuery).then(renderCountryCard).catch(onFetchError)
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country)
  refs.cardContainer.innerHTML = markup
}

function onFetchError(error) {
  alert('Check the correctness of the data entered, this country does not exist!')
}
