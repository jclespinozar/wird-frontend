import {CombatPokemonList} from "@/components/combat-pokemon-list";
import {PokemonList} from "@/components/pokemon-list";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full">
            <PokemonList/>
            <div className="w-1/3">
                <CombatPokemonList/>
            </div>
        </main>
    );
}

