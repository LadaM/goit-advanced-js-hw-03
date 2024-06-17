'use strict';

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_d6fCYBCjgVcrNcLCehO9h7vFE7XVmctgwsbaz8xbHaRGxDCAZX22e9BPeFKyzc7R";

export const fetchBreeds = () => {
    return axios
        .get(`https://api.thecatapi.com/v1/breeds`)
        .then(response => response.data);
}

export const fetchCatByBreed = (breedId) => {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data);
}