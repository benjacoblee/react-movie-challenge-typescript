import React, { useEffect, useState } from "react";
import { fetchMovies } from "../utils";
import { movie as MovieType } from "../types/movie";

type MovieDetailProps = {
    match: {
        params: {
            movieName: string;
        };
    };
};

const formatSynopsis = (synopsis: string) => {
    return synopsis.split("<br /><br />").map((string, index) => {
        return (
            <p key={index}>
                {string}
                <br />
                <br />
            </p>
        );
    });
};

const MovieDetail: React.FC<MovieDetailProps> = ({
    match: {
        params: { movieName }
    }
}) => {
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [errors, setErrors] = useState<string>("");

    useEffect(() => {
        fetchMovies()
            .then((res) => {
                const movieData = res.find(
                    (_movie) => _movie.name === movieName
                );
                setMovie(movieData!);
            })
            .catch((err) => setErrors(err.toString()));
    }, [movieName]);

    let body;

    if (!movie) {
        body = <h1>Loading...</h1>;
    } else {
        const { name, productionYear, genre, synopsis } = movie;
        body = (
            <>
                <h1 className="text-4xl mt-4 mb-2">
                    {name} <span className="text-2xl">{productionYear}</span>
                </h1>
                <button className="bg-green-400 rounded-full text-white text-sm px-2 py-1 mb-2 hover:bg-green-500">
                    {genre}
                </button>
                <div>{formatSynopsis(synopsis)}</div>
            </>
        );
    }

    if (errors) {
        body = <h1>{errors}</h1>;
    }

    return <div className="container mx-auto">{body}</div>;
};

export default MovieDetail;
