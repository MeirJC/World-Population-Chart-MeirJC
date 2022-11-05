
// JS Variables
const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const worldObj = {};
// Fetch data
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// Fatch Cites data
const fetchCitiesData = async (country) => {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "limit": 20,
        "order": "dsc",
        "orderBy": "populationCounts",
        "country": `${country}`
      }),
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }

  console.log(data);
};
// Build World object
const getWorldData = async () => {
  for (let i = 0; i < continents.length; i++) {
    const continentName = continents[i];
    let continenetArrTmp = [];
    const currentRegion = await fetchData(
      `https://restcountries.com/v3.1/region/${continents[i]}`
    );
    worldObj[continentName] = [];
    // console.log(currentRegion);
    for (let j = 0; j < currentRegion.length; j++) {
      countryObj = {}
      worldObj[continentName].push({
        name: currentRegion[j].name.common,
        population: currentRegion[j].population,
        area: currentRegion[j].area,
        capital: currentRegion[j].capital && currentRegion[j].capital[0],
        borders: currentRegion[j].borders,
        bordersCount: currentRegion[j].borders !== undefined ? currentRegion[j].borders.length : 0,
        flag: currentRegion[j].flags.png
      })
    };
    worldObj[continentName].sort((a, b) => {
      return b.population - a.population
    })
  }
  // console.log("worldObj inside getWorldData", worldObj);
};
getWorldData();
// ---== RETURN  ARR OF OBJECTS CONTAINING TOP 10 CITIES OF SELECTED COUNTRY ==---
const getCountryCitiesData = async (cntry = "GerMAny") => {
  await getWorldData();
  // console.log("worldObj inside getCountryCitiesData", worldObj);
  let country = `${cntry}`;
  let citiesArr = [];
  const cities = await fetchCitiesData(country);
  // console.log("cities.data", cities.data);
  for (let i = 0; i < cities.data.length; i++) {
    let cityObj = {}
    cityObj.city = cities.data[i].city;
    cityObj.country = cities.data[i].country;
    cityObj.population = Math.round(cities.data[i].populationCounts[0].value);
    // console.log(cities.data[i]);
    citiesArr.push(cityObj)
  }
  // console.log("citiesArr", citiesArr);
  return citiesArr;
}
getCountryCitiesData()
// ----------========== DRAW PAGE ==========----------
// ===================================================
// HTML elements
const nav = document.querySelector("#nav-btn");
const countryBtn = document.querySelector("#btn-container");
// -----===== create continents buttons =====-----
const drawContinentsBtn = () => {
  const ul = document.createElement("ul")
  ul.classList.add("countryBtnContainer")
  for (let i = 0; i < continents.length; i++) {
    const li = document.createElement("li")
    li.textContent = (`${continents[i]}`)
    li.id = `btn${continents[i]}`
    li.classList.add("btn")
    li.classList.add("continent-btn")
    ul.appendChild(li)
  }
  ul.classList.add("continentBtnContainer")
  nav.appendChild(ul);
}
drawContinentsBtn();
// -----===== Create Continents table =====-----
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    myChart.data.labels = worldObj[e.target.textContent].map((e) => {
      return e.name
    })
    myChart.data.datasets[0].data = worldObj[e.target.textContent].map((e) => {
      return e.population
    })
    myChart.update()
  }
  drawContriesBtn(e.target.textContent);
})
// -----===== create country buttons =====-----
const drawContriesBtn = (continent) => {
  countryBtn.innerHTML = ""
  const countriesBtnList = worldObj[continent]
  // console.log("countriesBtnList", countriesBtnList);
  const ul = document.createElement("ul")
  for (let i = 0; i < countriesBtnList.length; i++) {
    // console.log(countriesBtnList[i]);
    const li = document.createElement("li");
    li.textContent = (`${countriesBtnList[i].name}`);
    const flagImg = document.createElement("img");
    flagImg.src = `${countriesBtnList[i].flag}`
    flagImg.style.width = "1.5rem"
    flagImg.style.height = "1rem"
    li.appendChild(flagImg)
    li.classList.add("country-btn")
    li.id = `btn${countriesBtnList[i].name}`
    li.classList.add("btn")
    ul.appendChild(li)
  }
  ul.classList.add("countryBtnContainer")
  countryBtn.appendChild(ul);
}
// -----===== create Top Country cities Table =====-----
countryBtn.addEventListener("click", async (e) => {
  if (e.target.tagName === "LI") {
    const citiesList = await getCountryCitiesData(e.target.textContent)
    myChart.data.labels = citiesList.map((e) => {
      return e.city
    })
    myChart.data.datasets[0].data = citiesList.map((e) => {
      return e.population
    })
    myChart.update()
  }
})
// -----===== DRAW CHART =====-----
const ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.font.size = 14;
Chart.defaults.font.weight = 600;
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Population Count',
      data: [],
      backgroundColor: [
        'rgba(1, 79, 132, 0.75)',
        'rgba(1, 73, 124, 0.75)',
        'rgba(1, 58, 99, 0.75)',
        'rgba(1, 73, 124, 0.75)',
        'rgba(1, 79, 132, 0.75)'
      ],
      borderColor: [
        'rgba(1, 79, 132, 0.75)',
        'rgba(1, 73, 124, 0.75)',
        'rgba(1, 58, 99, 0.75)',
        'rgba(1, 73, 124, 0.75)',
        'rgba(1, 79, 132, 0.75)'
      ],
      borderWidth: 1
    },
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }

  }
});
