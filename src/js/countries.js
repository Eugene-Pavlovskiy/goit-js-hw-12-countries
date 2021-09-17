import countriesTpl from "../templates/countries.hbs";
import fetchCountries from './fetchCountries'
import debounce from "lodash.debounce";
import getRefs from './refs';
import { alert, error, defaultModules } from "@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(onSearch, 500));
 
function onSearch(e) {
  e.preventDefault();
  refs.articlesContainer.innerHTML = '';
   fetchCountries(e.target.value).then(appendCountriesMarkup).catch(searchError).finally(()=> (e.target.value = ''));
}

function searchError(err) {
  if (err.message === '404') {
    error({ text: 'Too many matches found.Please enter a more specific query!' });
  }

}

function appendCountriesMarkup(countries) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', countriesTpl(countries))
}