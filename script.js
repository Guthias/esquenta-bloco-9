const cardArea = document.getElementById('card-area');
const favoritesArea = document.getElementById('favorites-area');
const generoFeminino = document.getElementById('genero-feminino');
let favoritedCharacters = [];

const createFavoriteButton = (character) => {
  const favoritesButton = document.createElement('button');
  favoritesButton.className = 'add-favorites'
  favoritesButton.addEventListener('click', () => addFavoriteCharacter(character));
  favoritesButton.innerText = 'Adicionar aos Favoritos'
  return favoritesButton
}

const createCharacterCards = (character) => {
  const { image, name, specie, gender, status } = character;

  const characterCard = document.createElement('div');
  characterCard.innerHTML = `<div class="card">
    <div class="card-image-area">
      <img class="card-image" src="${image}" alt="${name}">
    </div>

    <div class="card-details">
      <span class="card-name">${name}</span>
      <span class="card-specie">${specie} - ${gender}</span>
      <span class="card-status">${status}</span>
    </div>
  </div>`;

  const cardDetailsArea = characterCard.querySelector('.card-details');
  cardDetailsArea.appendChild(createFavoriteButton(character));
  return characterCard;
}

const renderCharacterCard = async () => {
  const characters = await getCharacteres();
  
  characters.forEach((character) => {
    const createdCard = createCharacterCards({ ...character, specie: character.species })

    cardArea.appendChild(createdCard);
  });
}

const createFavoriteCard = (character) => {
  const favoriteCard = document.createElement('div');
  const { image, name, specie, gender, status } = character;

  favoriteCard.innerHTML = `<div class="favorite-card">
  <div class="favorite-image-area">
    <img class="favorite-image" src="${image}"> 
  </div> 

  <div class="favorite-details">
    <span class="favorite-card-name">${name}</span>
    <span class="favorite-card-span">${specie} - ${gender}</span>
    <span class="favorite-card-span">${status}</span>
    
    <button class="favorites-remove">Remover dos Favoritos</button>
  </div>`

  const removeButton = favoriteCard.querySelector('.favorites-remove');
  removeButton.addEventListener('click', () => removeFavoriteCharacter(character.id))
  return favoriteCard;
}

const renderFemaleGenderCount = () => {
  const genderCount = favoritedCharacters.reduce((acc, { gender }) => {
    if (gender.toLowerCase() === 'female') return acc += 1;
    return acc;
  }, 0)

  generoFeminino.innerText = genderCount;
}

const renderFavorites = () => {
  favoritesArea.innerHTML = '';

  favoritedCharacters.forEach((favorite) => {
    const favoriteCard = createFavoriteCard(favorite);
    favoritesArea.appendChild(favoriteCard);
  })

  renderFemaleGenderCount();
}

const addFavoriteCharacter = (character) => {
  favoritedCharacters.push(character);
  setLocalStorage('favorites', favoritedCharacters);
  renderFavorites();
}

const removeFavoriteCharacter = (removedId) => {
  const elementIndex = favoritedCharacters.findIndex(({ id }) => id === removedId);
  console.log(elementIndex);
  favoritedCharacters = favoritedCharacters.filter((_, index) => index !== elementIndex);
  setLocalStorage('favorites', favoritedCharacters);
  renderFavorites();
}

window.onload = async () => {
  await renderCharacterCard();
  favoritedCharacters = getLocalStorage('favorites') || [];
  renderFavorites();
}
