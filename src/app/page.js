
import PokemonGrid from "@/components/pokemon-grid";
import Image from "next/image";
import PokemonCard from "@/components/pokemon-card";
import { getPokemonList } from '@/lib/pokemonAPI';
import HeroSection from "@/components/HeroSection";
export default async function Home() {
  const pokemonList = await getPokemonList();
  return (

    <div >

      <HeroSection />
      <PokemonGrid pokemonList={pokemonList} />

    </div>



  );
}
