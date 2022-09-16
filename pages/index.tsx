/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);
  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }
    updateIds(getOptionsForVote());
  };
  const isPokemonReady =
    !firstPokemon.isLoading &&
    !secondPokemon.isLoading &&
    firstPokemon.data &&
    secondPokemon.data;
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="mb-2 text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="border rounded-md p-8 flex justify-between max-w-3xl items-center">
        {isPokemonReady && (
          <PokemonListing
            pokemon={firstPokemon.data}
            vote={() => voteForRoundest(first)}
          />
        )}
        <div className="p-8">VS</div>
        {isPokemonReady && (
          <PokemonListing
            pokemon={secondPokemon.data}
            vote={() => voteForRoundest(second)}
          />
        )}
      </div>
    </div>
  );
};

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;
const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = ({ pokemon, vote }) => {
  return (
    <div className="w-64 flex flex-col items-center space-y-2">
      <img
        src={pokemon.sprites.front_default as string}
        alt={`Image of a ${pokemon.name}`}
        className="w-full"
      />
      <div className="text-xl text-center capitalize -mt-4">{pokemon.name}</div>
      <button
        onClick={() => vote()}
        className="border border-gray-200 rounded-md bg-gray-100 hover:bg-gray-300 hover:cursor-pointer text-black p-2"
      >
        Rounder
      </button>
    </div>
  );
};

export function getStaticProps() {
  const ids = getOptionsForVote();
  return {
    props: {
      ids,
    },
  };
}
export default Home;
