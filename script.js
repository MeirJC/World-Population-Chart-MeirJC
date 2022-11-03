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

const getContinents = async () => {
  for (let i = 0; i < continents.length; i++) {
    const continentName = continents[i];
    const currentRegion = await fetchData(
      `https://restcountries.com/v3.1/region/${continents[i]}`
    );
    Object.assign(worldObj, { [continentName]: {} })
    for (let j = 0; j < currentRegion.length; j++) {
      let capital = currentRegion[j].capital && currentRegion[j].capital[0]
      console.log(capital);
      Object.assign(worldObj[continentName], {
        [currentRegion[j].name.common]: {
          population: currentRegion[j].population,
          area: currentRegion[j].area,
          capital: currentRegion[j].capital && currentRegion[j].capital[0],
          borders: currentRegion[j].borders && currentRegion[j].borders
          // population: currentRegion[j].population
          // population: currentRegion[j].population
        }
      })
      console.log(currentRegion[j]);


      // Object.assign(worldObj, {
      //   [continentName]: {
      //     [currentRegion[j].name.common]: { population: currentRegion[j].population, }

      //   },
      // });
    }
    // Object.assign(worldObj, {[continentName]:currentRegion} ) // all countries all data
    // Object.assign(worldObj, {[continentName]:currentRegion} )
    // console.log(worldObj)
  }
  console.log(worldObj);
};
getContinents();
