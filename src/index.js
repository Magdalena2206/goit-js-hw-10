import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './css/styles.css';
import  Notiflix  from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, catInfo, loader, error } = ref;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrIdBreeds = [];
fetchBreeds()
    .then(data => {
        data.forEach(element => {
            arrIdBreeds.push({ text: element.name, value: element.id });
        
        });
        new SlimSelect({
            select: selector,
            data: arrIdBreeds,
        });
    })
    .catch(onErrorFetch);
selector.addEventListener('change', onBreedSelect);

function onErrorFetch(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');
    Notiflix.Notify.failure('Upss! Coś poszło nie tak! Spróbuj odświezyć stronę!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};

function onBreedSelect(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const idBreed = event.currentTarget.value;
    fetchCatByBreed(idBreed)
        .then(data => {
            loader.classList.replace('loader', 'is-hidden');
            selector.classList.remove('is-hidden');
            const { url, breeds } = data[0];
            catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
            catInfo.classList.remove('is-hidden');
        })
        .catch(onErrorFetch);

};
