'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// ///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText)[1];
//     const html = ` <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//     const neighbour = data.borders?.[0];
//     const request1 = new XMLHttpRequest();
//     request1.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request1.send();
//     request1.addEventListener('load', function () {
//       const data1 = JSON.parse(this.responseText);
//       console.log(data1);
//       const htmll = ` <article class="country">
//           <img class="country__img" src="${data1.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data1.name}</h3>
//             <h4 class="country__region">${data1.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data1.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${
//               data1.languages[0].name
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               data1.currencies[0].name
//             }</p>
//           </div>
//         </article>`;
//       countriesContainer.insertAdjacentHTML('beforeend', htmll);
//       countriesContainer.style.opacity = 1;
//     });
//   });
// };
// getCountryData('africa');
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();
function renderCountry(data1, className = '') {
  const htmll = ` 
    <article class="country ${className}">
      <img class="country__img" src="${data1.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data1.name}</h3>
        <h4 class="country__region">${data1.region}</h4>
        <p class="country__row"><span>👫</span>${(
          data1.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data1.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data1.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', htmll);
  countriesContainer.style.opacity = 1;
}

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      response => response.json(),
      err => alert(err)
    )
    .then(data => {
      const countryData = data[1];
      renderCountry(countryData);

      const neighbour = countryData.borders?.[0];
      if (!neighbour) return;

      // return the fetch!
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response) return; // in case no neighbour
      return response.json();
    })
    .then(data => {
      if (!data) return;
      renderCountry(data, 'neighbour');
    })
    .catch(err => console.error(err));
};
btn.addEventListener('click', function () {
  getCountryData('india');
});
