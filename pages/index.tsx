/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useState } from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteForRoundest = (selected: number) => {
    updateIds(getOptionsForVote());
  };
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="mb-2 text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="border rounded-md p-8 flex justify-between max-w-3xl items-center">
        <div className="w-64 flex flex-col items-center space-y-2">
          <img
            src={firstPokemon.data?.sprites.front_default as string}
            alt={`Image of a ${firstPokemon.data?.name}`}
            className="w-full"
          />
          <div className="text-xl text-center capitalize -mt-4">
            {firstPokemon.data?.name}
          </div>
          <button
            onClick={() => voteForRoundest(first)}
            className="border border-gray-200 rounded-md bg-gray-100 hover:bg-gray-300 hover:cursor-pointer text-black p-2"
          >
            Rounder
          </button>
        </div>
        <div className="p-8">VS</div>
        <div className="w-64 flex flex-col items-center space-y-2">
          <img
            src={secondPokemon.data?.sprites.front_default as string}
            alt={`Image of a ${firstPokemon.data?.name}`}
            className="w-full"
          />
          <div className="text-xl text-center capitalize -mt-4">
            {secondPokemon.data?.name}
          </div>
          <button
            onClick={() => voteForRoundest(second)}
            className="border border-gray-200 rounded-md bg-gray-100 hover:bg-gray-300 hover:cursor-pointer text-black p-2"
          >
            Rounder
          </button>
        </div>
      </div>
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
