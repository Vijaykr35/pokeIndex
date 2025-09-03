import React from 'react'
import { getPokemonDetails } from '@/lib/pokemonAPI';
import Image from 'next/image';
import PokemonImage from '@/components/pokemon-image';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getPokemonSpecies, getEvolutionChain, getPokemonBasicData, getPokemonText } from '@/lib/pokemonAPI';
import { getTypeColor } from '@/app/PokemonTypes';
import Link from 'next/link';

function parseEvolutionChain(chain) {
    const evolutions = [];

    function traverse(node) {
        evolutions.push({
            name: node.species.name,
            id: node.species.url.split('/').slice(-2, -1)[0]
        });

        if (node.evolves_to && node.evolves_to.length > 0) {
            node.evolves_to.forEach(evolution => {
                traverse(evolution);
            });
        }
    }

    traverse(chain);
    return evolutions;
}



export default async function PokemonPage({ params }) {
    const { pokemonName } = await params;
    const pokemonObject = await getPokemonDetails(pokemonName);
    const pokemonText = await getPokemonText(pokemonName);

    // Get evolution data
    const speciesData = await getPokemonSpecies(pokemonName);
    let evolutionChain = [];

    if (speciesData && speciesData.evolution_chain) {
        const evolutionData = await getEvolutionChain(speciesData.evolution_chain.url);
        if (evolutionData) {
            const parsedEvolutions = parseEvolutionChain(evolutionData.chain);
            // Get detailed data for each evolution
            evolutionChain = await Promise.all(
                parsedEvolutions.map(async (evo) => {
                    const data = await getPokemonBasicData(evo.name);
                    return data || { name: evo.name, id: evo.id };
                })
            );
        }
    }

    // Type colors for badges


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
            <div className="w-full px-6 py-8">
                {/* Header */}
                <div className="mb-8 px-2">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        #{pokemonObject.id.toString().padStart(3, '0')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    {/* Left Column - Pokemon Image */}
                    <div className="lg:col-span-1">
                        {/* Pokemon Image */}
                        {/* Basic Info */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="relative w-full aspect-square max-w-sm mx-auto">
                                    <PokemonImage
                                        image={pokemonObject.sprites.other["official-artwork"].front_default}
                                        name={pokemonName}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle Column - Basic Info and Evolution */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Types</h4>
                                    <div className="flex gap-2">
                                        {pokemonObject.types.map((type) => (
                                            <Badge
                                                key={type.type.name}
                                                className={`${getTypeColor(type.type.name)} text-white`}
                                            >
                                                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold">Height</h4>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {(pokemonObject.height / 10).toFixed(1)} m
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Weight</h4>
                                        <p className="text-2xl font-bold text-green-600">
                                            {(pokemonObject.weight / 10).toFixed(1)} kg
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Evolution Chain */}
                        {evolutionChain.length > 1 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Evolution Chain</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4">
                                        {evolutionChain.map((evolution, index) => (
                                            <div key={evolution.name} className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                                                        {evolution.image && (
                                                            <Image
                                                                src={evolution.image}
                                                                alt={evolution.name}
                                                                width={64}
                                                                height={64}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold capitalize">
                                                        <Link href={`/${evolution.name}`}>
                                                            {evolution.name}
                                                        </Link>
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        #{evolution.id?.toString().padStart(3, '0')}
                                                    </p>
                                                    {evolution.types && (
                                                        <div className="flex gap-1 mt-1">
                                                            {evolution.types.map((type) => (
                                                                <span
                                                                    key={type.type.name}
                                                                    className={`px-2 py-1 rounded-full text-xs text-white ${getTypeColor(type.type.name)}`}
                                                                >
                                                                    {type.type.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Stats */}
                    <div className="xl:col-span-2 lg:col-span-1">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle>Base Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid xl:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        {pokemonObject.stats.slice(0, 3).map((stat) => {
                                            const statName = stat.stat.name;
                                            const statValue = stat.base_stat;
                                            const percentage = Math.min((statValue / 255) * 100, 100);

                                            return (
                                                <div key={statName} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium capitalize">
                                                            {statName.replace('-', ' ')}
                                                        </span>
                                                        <span className="font-bold">
                                                            {statValue}
                                                        </span>
                                                    </div>
                                                    <Progress value={percentage} className="h-2" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="space-y-4">
                                        {pokemonObject.stats.slice(3).map((stat) => {
                                            const statName = stat.stat.name;
                                            const statValue = stat.base_stat;
                                            const percentage = Math.min((statValue / 255) * 100, 100);

                                            return (
                                                <div key={statName} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium capitalize">
                                                            {statName.replace('-', ' ')}
                                                        </span>
                                                        <span className="font-bold">
                                                            {statValue}
                                                        </span>
                                                    </div>
                                                    <Progress value={percentage} className="h-2" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Total Stats */}
                                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded">
                                    <span className="font-bold">Total</span>
                                    <span className="text-xl font-bold">
                                        {pokemonObject.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                                    </span>
                                </div>
                            </CardContent>
                            <CardContent className="space-y-4">
                                <h3 className='bold text-2xl text-yellow-400'>
                                    INFO
                                </h3>
                                <p className="mt-4  text-white -600 text-md max-w-xl">
                                    {pokemonText}
                                </p>


                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}