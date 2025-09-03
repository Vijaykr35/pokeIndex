import React from 'react';
import Link from 'next/link';

export default function PokemonCard({ name, url }) {
    function HandleClick(name) {
        return () => {
            <Link href={`/${name}`}></Link>
        }
    }
    return (
        <div
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors "
        >
            <h2 className="text-2xl font-semibold cursor-pointer" onClick={HandleClick(name)}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </h2>
        </div>
    );
}
