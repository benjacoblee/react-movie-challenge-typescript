import React, { useEffect, useState } from "react";
import { movie as MovieType } from "../types/movie";
import { fetchMovies } from "../utils";
import Movie from "./Movie";

const Movies: React.FC<{}> = () => {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [errors, setErrors] = useState<string>("");

    useEffect(() => {
        fetchMovies()
            .then((moviesData) => setMovies(moviesData))
            .catch((err) => setErrors(err.toString()));
    }, []);

    let body;

    if (!movies.length) {
        body = <h1>Loading...</h1>;
    } else {
        body = (
            <div className="grid grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <Movie key={movie.name} {...movie} />
                ))}
            </div>
        );
    }

    if (errors) {
        body = <h1>{errors}</h1>;
    }

    return <div className="container mx-auto">{body}</div>;
};

export default Movies;
