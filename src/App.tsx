import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";

const App: React.FC<{}> = () => {
    const [fetchedMovies, setFetchedMovies] = useState<boolean>(false);
    return (
        <Router>
            <Navbar fetchedMovies={fetchedMovies} />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <Movies setFetchedMovies={setFetchedMovies} />
                    )}
                />
                <Route
                    exact
                    path="/movies/:movieName"
                    component={MovieDetail}
                />
            </Switch>
        </Router>
    );
};

export default App;
