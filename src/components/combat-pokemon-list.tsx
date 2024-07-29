'use client'
import React from "react";
import Image from "next/image";
import AddIcon from "@/public/icon/add.icon";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";
import DeleteIcon from "@/public/icon/delete.icon";
import {addCombatPokemon, removeCombatPokemon} from "@/redux/feature/pokemonSlice";
import {PokemonLightInfo} from "@/redux/api/pokemonApi";

interface Props {
}

export const CombatPokemonList: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const combatPokemonList = useSelector((state: RootState) => state.pokemonReducer.combatPokemonList);

    const getPokemonIdFromUrl = (url: string) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };
    const handleDeleteCombatPokemon = (pokemon: PokemonLightInfo) => {
        dispatch(removeCombatPokemon(pokemon.name));
    }

    return (
        <div className="flex flex-col gap-y-3 w-full py-10 px-3">
            <div className="text-gray-800 font-bold text-center">Listos para el combate</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {combatPokemonList?.map((pokemon) => {
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
                                        className="absolute top-0 bg-gray-600 right-0 text-gray-200 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg w-6 h-6 ms-auto inline-flex justify-center items-center"
                                        onClick={() => handleDeleteCombatPokemon(pokemon)}
                                >
                                        <DeleteIcon width="12" height="12"/>
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
