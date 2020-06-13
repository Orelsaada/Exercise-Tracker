import React, { useState, useEffect } from "react";
import FinalNavbar from "./navbar";
import axios from "axios";

function Exercises() {
  let [responseData, setResponseData] = useState([]);
  let [username, setUsername] = useState("ada");
  let [exercises, setExercises] = useState([]);
  let [errors, setErrors] = useState([]);

  // Get all users to state.
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setResponseData(res.data);
        setUsername(res.data[0].name);
      })
      .catch((err) => {
        const error = "Error with backend connection - couldn't get users.";
        setErrors((errors) => [...errors, error]);
      });
  }, []);

  // Get exercises based on username
  useEffect(() => {
    axios
      .get(`http://localhost:5000/${username}/exercises`)
      .then((res) => setExercises(res.data))
      .catch((err) => {
        const error = "Error with backend connection - couldn't get exercises";
        setErrors((errors) => [...errors, error]);
      });
  }, [username]);

  // Handle user change
  const userChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <section className="exercises">
      <FinalNavbar />
      <div className="container">
        <h2>Exercises log:</h2>
        <form>
          <div className="form-group">
            <label htmlFor="selectUser">Select User</label>
            <select
              className="form-control"
              id="selectUser"
              onChange={userChange}
            >
              {responseData.map((user) => (
                <option key={user._id}>{user.name}</option>
              ))}
            </select>
            {exercises.map((exercise) => (
              <ul>
                <li key={exercise._id}>{exercise.description}</li>
                <p>
                  Duration: {exercise.duration}
                  <br></br>
                  Date: {exercise.date.substr(0, 10)}{" "}
                </p>
              </ul>
            ))}
          </div>
        </form>
        <div className="errors">
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Exercises;
