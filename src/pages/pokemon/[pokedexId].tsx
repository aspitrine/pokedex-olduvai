import PokemonStats from '@/components/PokemonStats';
import type { Pokemon } from '@/types/pokemon';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'react-feather';

export default function PokemonDetail() {
  // useRouter me permettra de récupérer le paramètre de mon url
  const router = useRouter();
  const { pokedexId } = router.query;

  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    if (!pokedexId) return;

    fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${pokedexId}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, [pokedexId]);

  if (!pokemon) {
    return (
      <div>
        Chargement...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {`Pokémon ${pokemon.name.fr}`}
        </title>
      </Head>
      <main className="bg-blue-500 min-h-screen">
        <header className="flex items-center justify-center p-4">
          <Link href="/" className="text-white absolute left-2">
            <span className="md:hidden">
              <ChevronLeft />
            </span>
            <span className="hidden md:flex gap-2">
              <ChevronLeft />
              Revenir au pokedex
            </span>
          </Link>
          <h1 className="text-white font-bold text-2xl md:text-6xl text-center">
            {pokemon.name.fr}
          </h1>
        </header>
        <section className="bg-white rounded-xl grid grid-cols-3 p-4 m-4">
          <div className="col-span-3 md:col-span-2 flex items-center justify-center">
            <img
              src={pokemon.sprites.shiny || pokemon.sprites.regular}
              alt={pokemon.name.fr}
            />
          </div>
          <div className="col-span-3 md:col-span-1">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Informations</h2>
              <ul>
                <li>
                  <span className="font-bold">Type : </span>
                  <span>{pokemon.types?.map((t) => t.name).join(', ')}</span>
                </li>
                <li>
                  <span className="font-bold">Numéro : </span>
                  <span>{pokemon.pokedexId}</span>
                </li>
                <li>
                  <span className="font-bold">Nom : </span>
                  <span>{pokemon.name.fr}</span>
                </li>
                <li>
                  <span className="font-bold">Taille : </span>
                  <span>{pokemon.height}</span>
                </li>
                <li>
                  <span className="font-bold">Poids : </span>
                  <span>{pokemon.weight}</span>
                </li>
              </ul>

            </div>
            <div className="mt-2">
              <h2 className="md:text-2xl text-xl font-bold">Statistique</h2>
              <PokemonStats stats={pokemon.stats} />
            </div>
          </div>

          <div className="col-span-3 text-center pt-4 mt-4 border-t-2 border-blue-500">
            <h2 className="text-xl md:text-2xl font-bold text-center">
              Évolutions
            </h2>

            {pokemon.evolution?.pre && (
              <>
                <h3 className="font-bold">Évolution précédente : </h3>
                <div className="flex gap-2 justify-center">
                  {pokemon.evolution?.pre?.map((p) => (
                    <Link
                      href={`/pokemon/${p.pokedexId}`}
                      key={p.pokedexId}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {pokemon.evolution?.next && (
              <>
                <h3 className="font-bold">Évolution suivante : </h3>
                <div className="flex gap-2 justify-center">
                  {pokemon.evolution?.next?.map((p) => (
                    <Link
                      href={`/pokemon/${p.pokedexId}`}
                      key={p.pokedexId}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {pokemon.evolution?.mega && (
              <>
                <h3 className="font-bold">Évolution suivante : </h3>
                <div className="flex gap-2 justify-center">
                  {pokemon.evolution?.mega?.map((p) => (
                    <div key={p.orbe}>
                      <img src={p.sprites.shiny || p.sprites.regular} alt={p.orbe} />
                      {p.orbe}
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </section>
      </main>
    </>
  );
}
