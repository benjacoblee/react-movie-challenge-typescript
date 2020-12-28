import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetail";

const App: React.FC<{}> = () => {
    return (
        <Router>
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
