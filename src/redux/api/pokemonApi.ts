import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const POKEMON_BASE_URL = process.env.POKEMON_BASE_URL;

export interface PokemonGetResponse {
    count: number
    next: string
    previous: any
    results: PokemonLightInfo[]
}

export interface PokemonLightInfo {
    name: string
    url: string
}


export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: `${POKEMON_BASE_URL}`,
        baseUrl: `https://pokeapi.co/api/v2`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
            headers.set('Pragma', 'no-cache');
            headers.set('Expires', '0');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPokemons: builder.query<PokemonGetResponse, void>({
            query: () => `pokemon?limit=151`,
        }),
        // getPokemonByName: builder.query<Pokemon, string>({
        //     query: (name) => `pokemon/${name}`,
        // }),
    }),
});

export const {useGetPokemonsQuery} = pokemonApi;
