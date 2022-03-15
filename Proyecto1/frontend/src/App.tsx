import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from './components/Navbar/Navbar';
import React, {useState} from "react";
import {Graph} from "./components/Graph/Graph";

function App() {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                id: 1,
                label: "Suciedad antes vs Tiempo",
                data: [],
                backgroundColor: "rgba(44, 239, 71, 0.2)",
                borderColor: "rgb(44, 239, 71)",
                borderWidth: 1
            }
        ]
    })
    const [autoRefresh, setAutoRefresh] = useState(true)

    return (
        <div className="container">
            <Navbar setData={setData} autoRefresh={autoRefresh} setAutoRefresh={setAutoRefresh}/>
            <Graph data={data} autoRefresh={autoRefresh}/>
        </div>
    );
}

export default App;