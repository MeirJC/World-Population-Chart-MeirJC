const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const worldObj = {};
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
    const currentRegion = await fetchData(
      `https://restcountries.com/v3.1/region/${continents[i]}`
    );
    Object.assign(worldObj, { [continentName]: {} })
    for (let j = 0; j < currentRegion.length; j++) {
      Object.assign(worldObj[continentName], {
        [currentRegion[j].name.common]: {
          population: currentRegion[j].population,
          area: currentRegion[j].area,
          capital: currentRegion[j].capital && currentRegion[j].capital[0],
          borders: currentRegion[j].borders && currentRegion[j].borders
        }
      })
      // console.log(currentRegion[j]); // This logs the entire country info
    }
  }
  console.log(worldObj);
  //logging only keys for country arr -->> buttons
  // for (const name in worldObj.Africa) {
  //   console.log(name);
  // }
};
getCountriesData();
