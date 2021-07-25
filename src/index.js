import './sass/main.scss';
import { Notify } from 'notiflix';

const url = 'https://pixabay.com/api/'
const key = '22597300-51a9bfff07e627635843c3062'



fetch(`${url}?key=${key}`)
    .then(response = response.json())
    .then(console.log);