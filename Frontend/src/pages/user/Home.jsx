import React from "react";
import Profile from "../../components/user/Profile";
import Header from "../../components/common/Header";

function Home() {
  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <Header />
      <Profile />
    </div>
  );
}

export default Home;
