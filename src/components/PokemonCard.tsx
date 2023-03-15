import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}
export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2 w-full hover:rotate-12 duration-100 hover:scale-110 hover:bg-[#F0F]">
      <img
        src={pokemon.sprites.shiny || pokemon.sprites.regular}
        alt={pokemon.name.fr}
      />
      <h2 className="font-bold text-xl">
        {`#${pokemon.pokedexId} - ${pokemon.name.fr}`}
      </h2>
      <p className="flex gap-2">
        {pokemon.types?.map((type) => (
          <span key={type.name} className="flex flex-col gap-2 items-center">
            {type.name}
            <img src={type.image} alt={type.name} className="w-8" />
          </span>
        ))}
      </p>
    </div>
  );
}
