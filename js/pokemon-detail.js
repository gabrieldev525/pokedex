let pokemonID = null
let pokemonData = {}

window.onload = async () => {
  let params = window.location.search
  params = params.substr(1).split('&')

  params.forEach(param => {
    let [key, value] = param.split('=')

    if(key == 'pokemon')
      pokemonID = parseInt(value)
  })

  if(pokemonID)
    await fetchPokemonDetail()
  else {
    alert('ID do pokemon não informado')
  }
}

const fetchPokemonDetail = async () => {
  if(pokemonID) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then(res => res.json())
      .then(res => {
        pokemonData = res

        renderPokemonInfo()
      })
      .catch(() => alert('Aconteceu um erro ao tentar carregar o detalhe do pokemon'))
  }
}

const renderPokemonInfo = () => {
  // image
  document.querySelector('#pokemon-image').src = pokemonData.sprites.front_default

  document.querySelector('#pokemon-name').innerHTML = pokemonData.name

  let pokemonTypeContainer = document.querySelector('.pokemon-type-container')
  pokemonTypeContainer.innerHTML = ''
  pokemonData.types.forEach(type => {
    pokemonTypeContainer.insertAdjacentHTML('beforeend', `
      <div class='pokemon-type-item'>
        <span>${type.type.name}</span>
      </div>
    `)
  })
}