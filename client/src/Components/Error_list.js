import React, { useState, useEffect, useContext } from "react"
import "./Error_list.css"
import ComponentFinder from "../apis/ComponentFinder"
import { ComponentContext } from "../context/ComponentContext"

const Error_list = () => {
  const { siteerrcomponents, setSiteerrComponents } = useContext(ComponentContext)
  //const { siteerrcomponents, setSiteerrComponents } = useState([])
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response_err = await ComponentFinder.get("/errorlist")
        console.log(response_err.data.data.site)
        setSiteerrComponents(response_err.data.data.site)
      } catch (err) {}
    }

    fetchData1()
  }, [])

  return (
    <>
      <div className="all_err">
        <div className="error_components">
          <table className="table">
            <thead>
              <tr className="bg-danger">
                <th scope="col">Project No Code</th>
                <th scope="col">Pump No</th>
                <th scope="col">State</th>
                <th scope="col">Customer ID</th>
                <th scope="col">Developer</th>
                <th scope="col">Error no</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LIV001</td>
                <td>2421</td>
                <td>Gujarat</td>
                <td>ABCDEF</td>
                <td>Livint</td>
                <td>E1</td>
                <td>02-02-2021 10:15</td>
                <td>03-02-2021 9:15</td>
              </tr>
              <tr>
                <td>LIV001</td>
                <td>2422</td>
                <td>Gujarat</td>
                <td>ABCDEF</td>
                <td>Livint</td>
                <td>E3</td>
                <td>02-02-2021 10:15</td>
                <td>03-02-2021 9:15</td>
              </tr>
              <tr>
                <td>TSS012</td>
                <td>2423</td>
                <td>Tamil Nadu</td>
                <td>NDCYSK</td>
                <td>Terrastrom Solutions</td>
                <td>E5</td>
                <td>02-02-2021 10:15</td>
                <td>03-02-2021 9:15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="error_desc">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Error Code</th>
                <th scope="col">Error Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>E1</td>
                <td>Power Failure</td>
              </tr>
              <tr>
                <td>E2</td>
                <td>Low radiation</td>
              </tr>
              <tr>
                <td>E3</td>
                <td>Low Water level</td>
              </tr>
              <tr>
                <td>E4</td>
                <td>Pump Fail</td>
              </tr>
              <tr>
                <td>E5</td>
                <td>Inverter Fail</td>
              </tr>
              <tr>
                <td>E6</td>
                <td>No Connectivity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Error_list
/*
{siteerrcomponents &&
            siteerrcomponents.map(sites => {
              return (
                <tr>
                  <td>{sites.error_sign}</td>
                  <td>{sites.error_desc}</td>
                </tr>
              )
            })}
*/
