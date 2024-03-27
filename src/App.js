import "./App.css";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Login from "./Component/Registation/login.js";
import SignIn from "./Component/Registation/signIn.js"
import Dashboard from "./Component/Dashboard.js";
import Meeting from "./Component/Meeting.js";
import Chat from "./Component/Chat.js";
import Personal from "./Component/Notes/Personal.js";
import Work from "./Component/Notes/Work.js";
import TimeTracking from "./Component/TimeTracking.js";
import Settings from "./Component/Settings.js";


function App() {
  return (

    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/meeting">
          <Meeting />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/personal">
          <Personal />
        </Route>
        <Route path="/work">
          <Work />
        </Route>
        <Route path="/timesheet">
          <TimeTracking />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
