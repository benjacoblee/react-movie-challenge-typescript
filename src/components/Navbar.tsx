import React, { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { fetchMovies } from "../utils";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const location = useLocation();

    const [expanded, toggleExpansion] = useState<{
        year: boolean;
        genre: boolean;
    }>({
        year: false,
        genre: false
    });
    const [productionYears, setProductionYears] = useState<number[]>([]);
    const [genres, setGenres] = useState<string[]>([]);

    const handleClick = (type: string) => {
        type === "year"
            ? toggleExpansion({ ...expanded, year: !expanded.year })
            : toggleExpansion({ ...expanded, genre: !expanded.genre });
    };

    useEffect(() => {
        toggleExpansion({ year: false, genre: false });
    }, [location.search]);

    useEffect(() => {
        const genreArr: string[] = [];
        const productionYearArr: number[] = [];
        fetchMovies()
            .then((res) => {
                for (let movie of res) {
                    const { genre, productionYear } = movie;

                    if (!genreArr.includes(genre)) {
                        genreArr.push(genre);
                    }

                    if (!productionYearArr.includes(productionYear)) {
                        productionYearArr.push(productionYear);
                    }
                }

                setGenres(genreArr.sort());
                setProductionYears(productionYearArr.sort());
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="bg-green-400 p-5 mb-4">
            <nav className="flex justify-between items-center">
                <div>
                    <Link to="/" className="text-white font-semibold text-xl">
                        Movies
                    </Link>
                </div>

                <div className="self-end">
                    <div className="relative inline-block text-left mr-2">
                        <div>
                            <button
                                onClick={() => handleClick("year")}
                                type="button"
                                className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                id="options-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                            >
                                Filter by year
                                <span className="ml-2">
                                    <BiDownArrow />
                                </span>
                            </button>
                        </div>
                        <div
                            className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                                expanded.year ? "" : "hidden"
                            }`}
                        >
                            <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                {productionYears.map((productionYear) => {
                                    return (
                                        <Link
                                            key={productionYear}
                                            to={`/?productionYear=${productionYear}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            {productionYear}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                onClick={() => handleClick("genre")}
                                type="button"
                                className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                id="options-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                            >
                                Filter by genre
                                <span className="ml-2">
                                    <BiDownArrow />
                                </span>
                            </button>
                        </div>
                        <div
                            className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                                expanded.genre ? "" : "hidden"
                            }`}
                        >
                            <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                {genres.map((genre) => {
                                    return (
                                        <Link
                                            key={genre}
                                            to={`/?genre=${genre}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            {genre}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
