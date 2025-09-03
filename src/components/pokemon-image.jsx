"use client";
import React from "react";
import Image from "next/image";

export default function PokemonImage({ image, name }) {
    return (
        <div className="mt-6 flex justify-center">
            <Image
                priority
                fill
                style={{ objectFit: "contain" }}
                src={image}
                alt={name}
                className=" transition-opacity opacity-0 duration-[2s]"
                onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
        </div>
    );
}
