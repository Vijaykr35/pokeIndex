"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import PokemonCard from "./pokemon-card";
import Image from 'next/image';
import Link from "next/link";

const ITEMS_PER_PAGE = 30;

export default function PokemonGrid({ pokemonList }) {
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

    // Filter and paginate
    const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <>
            <section className="w-full max-w-2xl mx-auto ">
                <h2 className="text-3xl font-bold text-white text-center mb-8 pt-6">Search For Your Pokémon</h2>
                <div className="space-y-2">
                    <label className="text-white font-medium">Pokemon Name</label>
                    <input
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={searchText}
                        type="text"
                        placeholder="Pikachu, Charizard etc..."
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setPage(1); // reset to first page
                        }}
                    />
                </div>
            </section>

            {/* Grid of cards */}
            <div className="my-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6 px-4">
                {paginated.map((pokemon) => (
                    <div key={pokemon.name}>
                        {pokemon.image ? (
                            <Image
                                src={pokemon.image}
                                alt={pokemon.name}
                                width={200}
                                height={200}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                        <Link href={`/${pokemon.name}`}>
                            <PokemonCard name={pokemon.name} />
                        </Link>
                    </div>
                ))}

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 pb-10 cursor-pointer">
                <Button

                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <Button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
