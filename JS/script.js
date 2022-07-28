const pokemon_name = document.querySelector('.pokemon_name');
const pokemon_number = document.querySelector('.pokemon_number');
const pokemon_img = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search')

const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemon_name.innerHTML = "Carregando...";
    pokemon_number.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (!data){
        pokemon_img.style.diplay = 'none';
        pokemon_name.innerHTML = "Não encontrado :(";
        pokemon_number.innerHTML = '';
    } else {
        pokemon_img.style.diplay = 'block';
        pokemon_name.innerHTML = data.name;
        pokemon_number.innerHTML = data.id;
        pokemon_img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', (event) => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

btnNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);