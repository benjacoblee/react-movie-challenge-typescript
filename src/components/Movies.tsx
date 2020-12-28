import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { MovieType } from "../types/Movie";
import { fetchMovies } from "../utils";
import Movie from "./Movie";
import { useLocation } from "react-router-dom";

interface MoviesProps {
    setFetchedMovies: React.Dispatch<React.SetStateAction<boolean>>;
}

const Movies: React.FC<MoviesProps> = ({ setFetchedMovies }) => {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [errors, setErrors] = useState<string>("");

    const location = useLocation();

    const query: {
        genre?: string;
        productionYear?: string;
    } = queryString.parse(location.search);

    useEffect(() => {
        setMovies([]);
        if (Object.keys(query).length > 0) {
            fetchMovies()
                .then((moviesData) => {
                    if (query.genre) {
                        setMovies(
                            moviesData.filter(
                                (movie) => movie.genre === query.genre
                            )
                        );
                        setFetchedMovies(true);
                    } else {
                        setMovies(
                            moviesData.filter(
                                (movie) =>
                                    movie.productionYear ===
                                    parseInt(query.productionYear!)
                            )
                        );
                        setFetchedMovies(true);
                    }
                })
                .catch((err) => {
                    setErrors(err.toString());
                    setFetchedMovies(false);
                });
        } else {
            fetchMovies()
                .then((moviesData) => {
                    setMovies(moviesData);
                    setFetchedMovies(true);
                })
                .catch((err) => {
                    setErrors(err.toString());
                    setFetchedMovies(false);
                });
        }
        // eslint-disable-next-line
    }, [location]);

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
