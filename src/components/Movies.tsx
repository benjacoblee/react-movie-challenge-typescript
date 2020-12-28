import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { movie as MovieType } from "../types/movie";
import { fetchMovies } from "../utils";
import Movie from "./Movie";

interface MoviesProps {
    location: {
        search: string;
    };
}

const Movies: React.FC<MoviesProps> = ({ location }) => {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [errors, setErrors] = useState<string>("");

    const query: {
        genre?: string;
        productionYear?: string;
    } = queryString.parse(location.search);

    useEffect(() => {
        setMovies([]);
        if (Object.keys(query).length > 0) {
            fetchMovies().then((moviesData) => {
                query.genre
                    ? setMovies(
                          moviesData.filter(
                              (movie) => movie.genre === query.genre
                          )
                      )
                    : setMovies(
                          moviesData.filter(
                              (movie) =>
                                  movie.productionYear ===
                                  parseInt(query.productionYear!)
                          )
                      );
            });
        } else {
            fetchMovies()
                .then((moviesData) => setMovies(moviesData))
                .catch((err) => setErrors(err.toString()));
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
