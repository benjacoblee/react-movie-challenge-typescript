import axios from "axios";
import { MovieType } from "../types/Movie";

export const fetchMovies = async (): Promise<MovieType[]> => {
    const res = await axios.get(
        "https://sometimes-maybe-flaky-api.gdshive.io/"
    );
    return res.data;
};
