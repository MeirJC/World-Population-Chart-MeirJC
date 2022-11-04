const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const worldObj = {};
const countryListObj = {};
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
const getCountryCitiesData = async (cty = "GerMAny") => {
  await getWorldData();
  // console.log("countryListObj", countryListObj);
  console.log("worldObj inside getCountryCitiesData", worldObj);
  let country = `${cty}`;
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
  console.log("citiesArr", citiesArr);
  return citiesArr;
}
getCountryCitiesData()
