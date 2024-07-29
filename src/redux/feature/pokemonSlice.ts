'use client';

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PokemonLightInfo} from "@/redux/api/pokemonApi";


export type PokemonState = {
    pokemonList: PokemonLightInfo[],
    combatPokemonList: PokemonLightInfo[],
}

const initialState: PokemonState = {
    pokemonList: [],
    combatPokemonList: []
}

export const pokemonSlice  = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemonList: (state, action: PayloadAction<any[]>) => {
            state.pokemonList = action.payload;
        },
        addCombatPokemon: (state, action: PayloadAction<any>) => {
            if (state.combatPokemonList.length >= 6) return;
            state.combatPokemonList.push(action.payload);
        },
        removeCombatPokemon: (state, action: PayloadAction<string>) => {
            state.combatPokemonList = [...state.combatPokemonList.filter(
                (pokemon) => pokemon.name !== action.payload
            )];
        },
    }
});

export const {
    setPokemonList,
    addCombatPokemon,
    removeCombatPokemon
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
