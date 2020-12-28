import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { MovieType } from "../types/Movie";
import { fetchMovies } from "../utils";
import Movie from "./Movie";
import { useLocation } from "react-router-dom";
import Alert from "./Alert";

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
        setErrors("");
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
        body = (
            <Alert
                iconBackgroundColor="bg-green-600"
                backgroundColor="bg-green-200"
                color="text-green-600"
                text="Loading, please wait.."
            />
        );
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
        body = (
            <Alert
                iconBackgroundColor="bg-red-600"
                backgroundColor="bg-red-200"
                color="text-red-600"
                text={errors}
            />
        );
    }

    return (
        <div className={movies.length > 0 ? "container mx-auto mt-4" : ""}>
            {body}
        </div>
    );
};

export default Movies;
