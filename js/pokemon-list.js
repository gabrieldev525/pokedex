let pokemonList = {}
let pokemonListEndpoint = 'https://pokeapi.co/api/v2/pokemon'

window.onload = () => {
  fetchPokemonList()

  document.querySelector('#pagination-previous').onclick = () => {
    pokemonListEndpoint = pokemonList.previous
    fetchPokemonList()
  }
  document.querySelector('#pagination-next').onclick = () => {
    pokemonListEndpoint = pokemonList.next
    fetchPokemonList()
  }
}

const pad = (num, size) => {
  var s = '000' + num;
  return s.substr(s.length-size);
}

const fetchPokemonList = async () => {
  pokemonList = {}
  await fetch(pokemonListEndpoint)
    .then(res => res.json())
    .then(jsonData => {
      pokemonList = jsonData
      renderPokemonList()
    })
    .catch(() => {
      alert('Aconteceu um erro ao tentar carregar a lista de pokemons')
    })

    document.querySelector('#pagination-previous').disabled = !pokemonList.previous
    document.querySelector('#pagination-next').disabled = !pokemonList.next
}

const fetchPokemonDetail = async (url) => {
  let data = {}
  await fetch(url)
    .then(res => res.json())
    .then(json => data = json)
    .catch(() => alert('Aconteceu um erro ao tentar carregar o detalhe de um pokemon'))

  return data
}

const renderPokemonList = () => {
  const pokemonListElement = document.querySelector('#pokemon-list')
  pokemonListElement.innerHTML = ''

  pokemonList.results.sort((a, b) => a.order > b.order)
    .forEach(async pokemon => {
    let pokemonDetail = await fetchPokemonDetail(pokemon.url)

    pokemonListElement.insertAdjacentHTML('beforeend', `
      <div class='pokemon-item ${pokemonDetail.types[0].type.name}' onclick='openPokemonDetail(${pokemonDetail.id})'>
        <div class='pokemon-header'>
          <h4>${pokemon.name}</h4>
          <span>#${pad(pokemonDetail.id, 3)}</span>
        </div>

        <div class='pokemon-info'>
          <div class='pokemon-types'>
            <div class='pokemon-type-item'>
              <span>Grass</span>
            </div>
          </div>
          <img src='${pokemonDetail.sprites.front_default}' class='pokemon-image' />
        </div>
      </div>
    `)
  })
}

const openPokemonDetail = id => window.location.href = `pokemon-detail.html?pokemon=${id}`