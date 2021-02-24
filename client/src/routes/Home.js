import React from "react"
import Header from "./../Components/Header"
import Summary_table from "./../Components/Summary_table"
import Mapss from "./../Components/Mapss"
import Error_list from "../Components/Error_list"
import "./Home.css"
const Home = () => {
  return (
    <>
      <div className="navbar_header">
        <Header></Header>
      </div>
      <div className="home_body">
        <div className="home_container">
          <Summary_table />
          <Mapss />
        </div>
        <div>
          <Error_list />
        </div>
      </div>
    </>
  )
}

export default Home
