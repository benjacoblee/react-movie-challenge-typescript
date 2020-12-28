import axios from "axios";
import { movie } from "../types/movie";

export const fetchMovies = async (): Promise<movie[]> => {
    const res = await axios.get(
        "https://sometimes-maybe-flaky-api.gdshive.io/"
    );
    return res.data;
};
