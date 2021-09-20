import countriesTpl from "../templates/countries.hbs";
import listCountriesTpl from '../templates/listCountries.hbs';
import fetchCountries from './fetchCountries';
import debounce from "lodash.debounce";
import getRefs from './refs';
import { alert, error, defaultModules } from "@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { Loading } from 'notiflix';
defaultModules.set(PNotifyMobile, {});

const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(onSearch, 500));
 
function onSearch(e) {
  refs.articlesContainer.innerHTML = '';
  fetchCountries(e.target.value.trim()).then(appendCountriesMarkup).catch(searchError);
  // value ();
  // value.trim();
}

function appendCountriesMarkup(countries) {
  if (countries.length === 1) {
    return refs.articlesContainer.insertAdjacentHTML('beforeend', countriesTpl(countries));
  }
  if (countries.length > 10) {
    return error({ text: 'Too many matches found.Please enter a more specific query!'});
  }
  if (countries.length > 1 && countries.length <= 10) {
    return refs.articlesContainer.insertAdjacentHTML('beforeend', listCountriesTpl(countries));
  }
}

function searchError(err) {
  if (err.message === '404') {
    error({ text: 'Error! Please enter a more query!' });
  }

}