// import Image from "next/image";
"use client";
import { useAppDispatch, useAppSelector } from "@/libs/redux/config/hook";
import {
  decrement,
  increment,
  incrementByAmount,
} from "@/libs/redux/modules/slices/counter";
import { useGetPokemonByNameQuery } from "@/services/pokemon";
import Image from "next/image";

export default function Home() {
  const counter = useAppSelector((state) => state.counter.value); // Return Root State Slices
  const dispatch = useAppDispatch(); // Action Dispatcher

  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");

  return (
    <div>
      <img
        src={`${process.env.NEXT_PUBLIC_URL}/images/beach.jpg`}
        alt="Vercel Logo"
        width={72}
        height={16}
      />
      <div className="App">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img
              src={data.sprites.front_shiny}
              alt={data.species.name}
              width={100}
              height={100}
            />
          </>
        ) : null}
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center mb-12">Count is {counter}</div>

        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(increment());
            }}
          >
            Increment
          </button>
          <button
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(decrement());
            }}
          >
            Decrement
          </button>

          <button
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(incrementByAmount(10));
            }}
          >
            Incement By 10
          </button>
        </div>
      </main>
    </div>
  );
}
