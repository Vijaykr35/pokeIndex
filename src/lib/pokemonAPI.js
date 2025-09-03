import axios from "axios"
const PokemonAPI = process.env.PokemonAPI;
const PokemonNums = 251;
export async function getPokemonList() {
    const res = await axios.get(`${PokemonAPI}pokemon?limit=${PokemonNums}&offset=0`);
    const pokemonList = res.data.results;

    const detailedList = await Promise.all(
        pokemonList.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
                name: pokemon.name,
                image: details.data.sprites.other["official-artwork"].front_default
            };
        })
    );

    return detailedList;
}

export async function getPokemonDetails(pokemonName) {
    const res = await axios.get(`${PokemonAPI}pokemon/${pokemonName}`);
    return res.data;
}

export async function getPokemonInfo(name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    const descriptionEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
    );

    return {
        ...data,
        description: descriptionEntry?.flavor_text.replace(/\f/g, ' ') || 'No description available.',
    };
}

export async function getPokemonSpecies(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching species:', error);
        return null;
    }
}
export async function getEvolutionChain(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return null;
    }
}
export async function getPokemonBasicData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) return null;
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            types: data.types
        };
    } catch (error) {
        console.error('Error fetching pokemon data:', error);
        return null;
    }
}



export async function getPokemonText(pokemon) {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
        const flavorEntry = res.data.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );
        return flavorEntry ? flavorEntry.flavor_text : 'No English flavor text found.';
    } catch (err) {
        console.log(`Error: ${err}`);
        return 'Failed to fetch Pokémon flavor text.';
    }
}
