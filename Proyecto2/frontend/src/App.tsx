import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from './components/Navbar/Navbar';
import React, {useEffect, useState} from "react";
import {Graph} from "./components/Graph/Graph";
import {DateSelector} from "./components/DateSelector/DateSelector";
import {LogTable} from "./components/LogTable/LogTable";
import {Dashboard} from "./components/Dashboard/Dashboard";

function App() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        id: 1,
        label: "Temperatura vs Tiempo",
        data: [],
        backgroundColor: "rgba(44, 239, 71, 0.2)",
        borderColor: "rgb(44, 239, 71)",
        borderWidth: 1
      }
    ]
  })
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [logData, setLogData] = useState({Data: []})

  const [dates, setDates] = useState({Dates: []})

  useEffect(() => {
    const fetchData = async () => {
      try {
        // @ts-ignore
        const response = await fetch(process.env.REACT_APP_GET_DATES)
        setDates(await response.json())
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchData()
  }, [])

  return (
      <div className="container">
        <Navbar setData={setData} autoRefresh={autoRefresh} setAutoRefresh={setAutoRefresh}/>
        <Dashboard autoRefresh={autoRefresh}/>
        <Graph data={data} autoRefresh={autoRefresh}/>
        <DateSelector setLogData={setLogData} dates={dates}/>
        <LogTable logData={logData} />
      </div>
  );
}

export default App;