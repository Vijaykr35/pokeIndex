import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="bg-[#0B0D1F] text-white border-t border-yellow-400 py-6 mt-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-yellow-400">PokéIndex</h3>
                    <p className="text-sm text-gray-400">© 2025 All rights reserved.</p>
                </div>

                <div className="flex space-x-4">
                    <p className="text-sm text-gray-400">
                        @Vijay_Kumar
                    </p>
                </div>

            </div>
        </footer>
    );
}
