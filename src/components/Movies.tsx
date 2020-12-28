import axios from "axios";
import React, { useState, useEffect } from "react";
import { movie as MovieType } from "../types/movie";
import Movie from "./Movie";

const Movies: React.FC<{}> = () => {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [errors, setErrors] = useState<string>("");

    const fetchMovies = async () => {
        try {
            const res = await axios.get(
                "https://sometimes-maybe-flaky-api.gdshive.io/"
            );
            const moviesData: MovieType[] = res.data;
            setMovies(moviesData);
        } catch (err) {
            console.log(err);
            setErrors(err.toString());
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    let body;

    if (errors) {
        body = <h1>{errors}</h1>;
    }

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

    return <div className="container mx-auto">{body}</div>;
};

export default Movies;
