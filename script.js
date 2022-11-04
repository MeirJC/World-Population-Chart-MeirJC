const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const worldObj = {};
const countryListObj = {};
const continenetArr = [];
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
const fetchCitiesData = async () => {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "limit": 10,
        "order": "dsc",
        "orderBy": "populationCounts",
        "country": "israel"
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
fetchCitiesData()
// Build World object
const getCountriesData = async () => {
  for (let i = 0; i < continents.length; i++) {
    const continentName = continents[i];
    let continenetArrTmp = [];
    const currentRegion = await fetchData(
      `https://restcountries.com/v3.1/region/${continents[i]}`
    );
    worldObj[continentName] = {};
    countryListObj[continentName] = {};
    // Object.assign(worldObj, { [continentName]: {} });
    // Object.assign(countryListObj, { [continentName]: {} });
    for (let j = 0; j < currentRegion.length; j++) {
      // console.log(currentRegion);
      worldObj[continentName][currentRegion[j].name.common] = {
        population: currentRegion[j].population,
        area: currentRegion[j].area,
        capital: currentRegion[j].capital && currentRegion[j].capital[0],
        borders: currentRegion[j].borders && currentRegion[j].borders,
      };




      // Object.assign(worldObj[continentName], {
      //   [currentRegion[j].name.common]: {
      //     population: currentRegion[j].population,
      //     area: currentRegion[j].area,
      //     capital: currentRegion[j].capital && currentRegion[j].capital[0],
      //     borders: currentRegion[j].borders && currentRegion[j].borders,
      //   },
      // }
      // );
      continenetArrTmp.push(currentRegion[j].name.common); // This logs the entire country info
    }
    //
    Object.assign(countryListObj, { [continentName]: continenetArrTmp });
  }
  // console.log("worldObj", worldObj);
  // console.log("countryListObj", countryListObj);
};
getCountriesData();

// 
const getCountryCities = async () => {
  console.log("countryListObj", countryListObj);
  console.log("worldObj", worldObj);
  for (let country in countryListObj.Africa) {
    console.log(country);
  }
}
getCountryCities()