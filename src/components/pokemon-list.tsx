'use client';

import React, {useState} from "react";
import {Spinner} from "@/components/spinner";
import {useGetPokemonsQuery} from "@/redux/api/pokemonApi";
import AddIcon from "@/public/icon/add.icon";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {addCombatPokemon} from "@/redux/feature/pokemonSlice";

interface Props {
}

export const PokemonList: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const {data: pokemons, error, isLoading} = useGetPokemonsQuery();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <Spinner/>;
    if (error) return <div>Error loading pokemons</div>;

    const getPokemonIdFromUrl = (url: string) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };

    const filteredPokemons = pokemons?.results.filter(pokemon =>
        getPokemonIdFromUrl(pokemon.url) == searchTerm ||
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddPokemon = (pokemon: any) => {
        dispatch(addCombatPokemon(pokemon));
    };

    return (
        <div className="flex flex-col gap-y-3 p-10 w-full">
            <div>
                <form className="flex items-center max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            id="simple-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2.5 p-2.5"
                            placeholder="Search pokemon..."
                            required
                        />
                    </div>
                    <button type="submit"
                            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 p-12 gap-y-3">
                {filteredPokemons?.map((pokemon, index) => {

                    const pokemonId = getPokemonIdFromUrl(pokemon.url);
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                    return (

                        <div key={pokemon.name} className=" flex flex-col justify-center items-center">

                            <div className="relative w-24 h-24 bg-gray-200 rounded-xl">
                                <Image
                                    src={imageUrl}
                                    alt={pokemon.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                                <button type="button"
                                        className="absolute top-0 bg-gray-600 right-0 text-gray-200 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
                                        data-modal-hide="default-modal"
                                        onClick={() => handleAddPokemon(pokemon)}>
                                    <AddIcon width="14" height="14"/>
                                </button>
                            </div>
                            <div className="text-gray-800 font-bold">{pokemon.name}</div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
