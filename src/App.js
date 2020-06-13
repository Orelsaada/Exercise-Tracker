import React from "react";
import { Switch, Route } from "react-router-dom";
import FinalNavbar from "./components/navbar";
import AddUserForm from "./components/add-user";
import home from "./components/Home";
import AddExercise from "./components/add-exercise";
import Exercises from "./components/exercises";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={home} exact />
        <Route path="/add-exercise" component={AddExercise} />
        <Route path="/exercises" component={Exercises} />
        <FinalNavbar />
        <AddUserForm />
      </Switch>
    </div>
  );
}

export default App;
