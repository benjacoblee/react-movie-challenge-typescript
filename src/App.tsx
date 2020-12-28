import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movies from "./components/Movies";

const App: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Movies />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
