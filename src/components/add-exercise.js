import React, { useState, useEffect } from "react";
import FinalNavbar from "./navbar";
import axios from "axios";

function AddExercise() {
  let [responseData, setResponseData] = useState([]);
  let [username, setUsername] = useState("");
  let [description, setDescription] = useState("");
  let [duration, setDuration] = useState("");
  const initalDate = new Date().toISOString().substr(0, 10);
  let [date, setDate] = useState(initalDate);

  // Get all users to state.
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setResponseData(res.data);
        setUsername(res.data[0].name);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle form changes
  const userChange = (e) => {
    setUsername(e.target.value);
  };
  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const durationChange = (e) => {
    setDuration(e.target.value);
  };
  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = { username, description, duration, date };
    axios({
      method: "post",
      url: "http://localhost:5000/add-exercise",
      data: exercise,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    // Reset description & duration after submit
    setDescription("");
    setDuration("");
  };

  return (
    <section className="users">
      <FinalNavbar />
      <div className="container">
        <h2>Add exercise:</h2>
        <form onSubmit={handleSubmit}>
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
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Add description..."
              className="form-control"
              id="description"
              onChange={descriptionChange}
              value={description}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              onChange={durationChange}
              value={duration}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              onChange={dateChange}
              value={date}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddExercise;
