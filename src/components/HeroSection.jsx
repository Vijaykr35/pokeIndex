import React from 'react'

export default function HeroSection() {
    return (
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-8 m-2">
            <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-black text-slate-70  bg-clip-text  leading-tight">
                    Discover the World of Pokémon
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Your ultimate digital companion for exploring, discovering, and learning about every Pokémon in existence. From classic favorites to legendary creatures, find detailed information about abilities, stats, and evolutions.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h3 className="text-2xl font-bold text-yellow-400">250+</h3>
                    <p className="text-gray-300 text-sm">Pokémon Species</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h3 className="text-2xl font-bold text-green-400">18</h3>
                    <p className="text-gray-300 text-sm">Types</p>
                </div>

            </div>
        </section>
    )
}
