const Max_pokemon = 640;
const listWrapper = document.querySelector(".list-wrapper")
const searchBar = document.querySelector(".filter-search")
const number = document.querySelector("#number")
const nameFil = document.querySelector("#name")
const notFound = document.querySelector("#not-found")

// console.log(searchBar);

let allPokemon = [];
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${Max_pokemon}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    
    allPokemon = data.results;
    display(allPokemon);
  });




function display(pokemon) {
  listWrapper.innerHTML = "";
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div")
    listItem.className = "list-item"
    listItem.innerHTML = `
    <div class="number-wrap">
    <p class="caption-fonts">#${pokemonID}</p>
    </div>
    <div class="img-wrap">
    <img class="pokemonImg" src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}">
    </div>
    <div class="name-wrap">
    <p class="body-fonts">${pokemon.name}</p>
    <p>${pokemon.type}</p>
    </div>`
    listWrapper.appendChild(listItem);
  });
}

searchBar.addEventListener('keyup', handleSearch);
 
function handleSearch() {
  const searchTerm = searchBar.value.toLowerCase();
  let filterPokemon;
  if (number.checked) {
    console.log("yy");
    
    filterPokemon = allPokemon.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm)
    })
  } else if (nameFil.checked) {
    console.log("done");
    filterPokemon=allPokemon.filter((pokemon)=>{
      return pokemon.name.toLowerCase().startsWith(searchTerm)
       
    })
  } else {
    filterPokemon = allPokemon;
  }
  display(filterPokemon);
  console.log(notFound);
  

  if (filterPokemon.length === 0) {
    notFound.style.display = "block";
  }
  else {
    notFound.style.display = "none";
  }
  
}







