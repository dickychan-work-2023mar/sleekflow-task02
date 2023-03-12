const baseUrl = 'https://rickandmortyapi.com/api/';

const getCharacterDetailById = async (characterId)  => {
  return fetch(`${baseUrl}character/${characterId}`)
    .then(res => res.json())
}

const getEpisodesDetailByIds = async (episodeIds)  => {
  return fetch(`${baseUrl}episode/${episodeIds}`)
    .then(res => res.json())
}


/**
 * Fetch Contact List
 * @param {*} params 
 * @returns 
 */
const fetchContactsWithFilters = async (params) => {
  let query = '';
  if (params) {
    query = `/?${params}`;
  }
  const response = await fetch(`${baseUrl}character${query}`)
  if (!response) {
    return {};
  } else {
    return response.json()
  }
}

/**
 * Fech Character Detail & Related Episodes
 * @param {*} id 
 * @returns 
 */
const fetchCharacterById = async (id) => {
  const response = await getCharacterDetailById(id);
  const episodesIds = response.episode.join(',').replaceAll(`${baseUrl}episode/`, ""); // Put all episodes id
  const episodesData = await getEpisodesDetailByIds(episodesIds);
  if (!response) {
    throw new Error('Data coud not be fetched!')
  } else {
    return {
      character: response,
      episodesDetails: episodesData
    }
  }
}


export async function getContacts(query) {
  let contacts = await fetchContactsWithFilters(query);
  if (!contacts) contacts = [];
  if (contacts.results) {
    return contacts.results;
  } else {
    return {error: 'NOT_FOUND'}; // To static
  }
}

export async function getContactById(id) {
  let contact = await fetchCharacterById(id);
  return contact ?? null;
}

async function getEpisodesDetail(episodesData) {
  for(var i = 0, len = episodesData.length; i < len; i++) {
    episodesData[i] = episodesData[i].replace('${baseUrl}episode/', '');
  }
  let episodeDetail = await fetch(`${baseUrl}episode/${episodesData.join(',')}`);
  return episodeDetail ?? null;
}

