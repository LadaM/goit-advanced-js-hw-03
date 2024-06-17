'use strict';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import 'slim-select/dist/slimselect.css'; // this line is failing though the path is correct and can be found in node_modules

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.querySelector('#cat-breed-selector');
  const loading = document.querySelector('#loading');
  fetchBreeds()
    .then(breeds => {
      const options = breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      }));

      new SlimSelect({
        select: '#cat-breed-selector',
        data: [
          { text: 'Select a cat breed', value: '', placeholder: true },
          ...options,
        ],
        placeholder: 'Select a cat breed',
      });

      loading.setAttribute('hidden', '');
      selector.removeAttribute('hidden');
      selector.addEventListener('change', event => {
        const selectedBreedId = event.target.value;
        console.log(selectedBreedId);
      });
      iziToast.error({
        title: 'Oops!',
        message: 'Something went wrong. Please try reloading the page.',
        position: 'topRight',
      });
    })
    .catch(error => {
      console.log(error);
    });
});
