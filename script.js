const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const worldObj = {};
const countryListObj = {};
const continenetArr = [];
// fetch data
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCountriesData = async () => {
  for (let i = 0; i < continents.length; i++) {
    const continentName = continents[i];
    let continenetArrTmp = [];
    const currentRegion = await fetchData(
      `https://restcountries.com/v3.1/region/${continents[i]}`
    );
    Object.assign(worldObj, { [continentName]: {} });
    Object.assign(countryListObj, { [continentName]: {} });
    for (let j = 0; j < currentRegion.length; j++) {
      Object.assign(worldObj[continentName], {
        [currentRegion[j].name.common]: {
          population: currentRegion[j].population,
          area: currentRegion[j].area,
          capital: currentRegion[j].capital && currentRegion[j].capital[0],
          borders: currentRegion[j].borders && currentRegion[j].borders,
        },
      });
      continenetArrTmp.push(currentRegion[j].name.common); // This logs the entire country info
    }
    Object.assign(countryListObj, { [continentName]: continenetArrTmp });
  }
  console.log("worldObj", worldObj);
  console.log("countryListObj", countryListObj);
};
getCountriesData();
