import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";

const App: React.FC<{}> = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Movies} />
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
