import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="mb-2 text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="border rounded-md p-8 flex justify-between max-w-3xl items-center">
        <div className="w-16 h-16 bg-red-200"></div>
        <div className="p-8">VS</div>
        <div className="w-16 h-16 bg-red-200"></div>
      </div>
    </div>
  );
};

export default Home;
