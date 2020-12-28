import React, { useEffect, useState } from "react";
import { fetchMovies } from "../utils";
import { MovieType } from "../types/Movie";
import Alert from "./Alert";

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
        body = (
            <Alert
                iconBackgroundColor="bg-green-600"
                backgroundColor="bg-green-200"
                color="text-green-600"
                text="Loading, please wait.."
            />
        );
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
        body = (
            <Alert
                iconBackgroundColor="bg-red-600"
                backgroundColor="bg-red-200"
                color="text-red-600"
                text={errors}
            />
        );
    }

    return <div className={movie ? "container mx-auto" : ""}>{body}</div>;
};

export default MovieDetail;
