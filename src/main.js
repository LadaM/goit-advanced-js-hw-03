'use strict';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import 'slim-select/dist/slimselect.css'; // this line is failing though the path is correct and can be found in node_modules
const selector = document.querySelector('#cat-breed-selector');
const loading = document.querySelector('.loader');

document.addEventListener('DOMContentLoaded', () => {
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

      removeLoader();
      selector.removeAttribute('hidden');
      selector.addEventListener('change', event => loadCatBreed(event));
    })
    .catch(error => {
      showError();
      console.log(error);
    });
});

const loadCatBreed = event => {
  const selectedBreedId = event.target.value;
  const catContainer = document.querySelector('.cat');
  if (!selectedBreedId) {
    iziToast.error({
      title: 'Oops!',
      message: 'Please select a cat breed.',
      position: 'topRight',
    });
    catContainer.innerHTML = '';
    return;
  }
  console.log(selectedBreedId);
  selector.setAttribute('disabled', '');
  loading.style.display = 'block';
  fetchCatByBreed(selectedBreedId)
    .then(cats => {
      const cat = cats[0];

      catContainer.innerHTML = `
          <div class="cat-img">
            <img src="${cat.url}" alt="${cat.id}" />
          </div>
          <div class="cat-info">
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <p><span class="temperament">Temprement: </span>${cat.breeds[0].temperament}</p>
        </div>`;

      catContainer.removeAttribute('hidden');
    })
    .catch(error => {
      showError();
      console.log(error);
    })
    .finally(() => {
      selector.removeAttribute('disabled'); // enabling the cat selection once the HTTP request is done
      removeLoader();
    });
};

const removeLoader = () => {
  loading.style.display = 'none';
};
function showError() {
  iziToast.error({
    title: 'Oops!',
    message: 'Something went wrong. Please try reloading the page.',
    position: 'topRight',
  });
}
