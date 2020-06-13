import React from "react";
import FinalNavbar from "./navbar";
import AddUserForm from "./add-user";

function home() {
  return (
    <section className="home">
      <FinalNavbar />
      <div className="container">
        <AddUserForm />
      </div>
    </section>
  );
}

export default home;
