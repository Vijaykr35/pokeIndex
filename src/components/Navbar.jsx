'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <>
            <nav className="w-full bg-slate-900 backdrop-blur-sm border-b border-yellow-200 px-6 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <h2 className="text-3xl font-extrabold text-yellow-400 tracking-wide hover:text-yellow-600 transition-colors duration-200">
                            PokéIndex⚡
                        </h2>
                    </Link>
                    <Button variant="outline" className=" rounded-xl text-sm border-yellow-300 hover:bg-yellow-50 transition-colors duration-200">
                        <span className="text-yellow-400">Catch 'Em All</span>
                    </Button>
                </div>
            </nav>

        </>
    )
}