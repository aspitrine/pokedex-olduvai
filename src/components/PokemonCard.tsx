import { Pokemon } from '@/types/pokemon';
import { useState } from 'react';

interface PokemonCardProps {
  pokemon: Pokemon;
}
export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isImgLoading, setIsImgLoading] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2 w-full hover:rotate-12 duration-300 hover:scale-110 hover:bg-[#F0F]">
      <div className={`flex items-center justify-center ${isImgLoading ? 'loading' : ''}`}>
        <img
          src={pokemon.sprites.shiny || pokemon.sprites.regular}
          alt={pokemon.name.fr}
          onLoadStart={() => setIsImgLoading(true)}
          onLoad={() => setIsImgLoading(false)}
          className="h-32 md:h-48 mx-auto block"
        />
      </div>

      <h2 className="font-bold md:text-xl">
        {`#${pokemon.pokedexId} - ${pokemon.name.fr}`}
      </h2>
      <p className="flex gap-2">
        {pokemon.types?.map((type) => (
          <span key={type.name} className="flex flex-col text-sm gap-2 items-center">
            {type.name}
            <img src={type.image} alt={type.name} className="w-8" />
          </span>
        ))}
      </p>
    </div>
  );
}
