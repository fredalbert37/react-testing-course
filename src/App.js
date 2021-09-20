import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import User from "./pages/User";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={SignUp}></Route>
        <Route exact path="/user" component={User}></Route>
      </Switch>
    </Router>
  );
}

export default App;
