import React from "react";
import { movie as MovieProps } from "../types/movie";
import { Link } from "react-router-dom";

const Movie: React.FC<MovieProps> = ({
    genre,
    name,
    productionYear,
    synopsisShort
}) => {
    return (
        <Link to={`/movies/${name}`}>
            <div className="bg-gray-50 shadow p-6 cursor-pointer">
                <div className="font-semibold text-lg mb-2">
                    {name}{" "}
                    <span className="font-normal text-sm">
                        {productionYear}
                    </span>
                </div>
                <button className="bg-green-400 rounded-full text-white px-2 py-1 mb-2 hover:bg-green-500">
                    {genre}
                </button>
                <div>{synopsisShort}</div>
            </div>
        </Link>
    );
};

export default Movie;
