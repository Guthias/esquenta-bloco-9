const getCharacteres = async () => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const { results } = await response.json();
  return results;
}