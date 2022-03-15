import React from "react";

// @ts-ignore
export const Navbar = ({setData, autoRefresh, setAutoRefresh}) => {

    let valorRefresh = ''

    if(autoRefresh)
        valorRefresh = 'On'
    else
        valorRefresh = 'Off'

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Arqui2 - Grupo 14</a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick={
                            () => setData({
                                labels: [],
                                datasets: [
                                    {
                                        id: 1,
                                        label: "Suciedad antes vs Tiempo",
                                        data: [],
                                        backgroundColor: "rgba(44, 239, 71, 0.2)",
                                        borderColor: "rgb(44, 239, 71, 1)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Suciedad antes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={
                            () => setData({
                                labels: [],
                                datasets: [
                                    {
                                        id: 2,
                                        label: "Humedad vs Tiempo",
                                        data: [],
                                        backgroundColor: "rgba(44, 239, 210,0.2)",
                                        borderColor: "rgb(44, 239, 210, 1)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Humedad</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={
                            () => setData({
                                labels: [],
                                datasets: [
                                    {
                                        id: 3,
                                        label: "Suciedad despues vs Tiempo",
                                        data: [],
                                        backgroundColor: "rgba(239, 44, 184,0.2)",
                                        borderColor: "rgb(239, 44, 184, 1)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Suciedad despues</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={
                            () => setData({
                                labels: [],
                                datasets: [
                                    {
                                        id: 4,
                                        label: "Agua almacenada vs Tiempo",
                                        data: [],
                                        backgroundColor: "rgba(239, 239, 71,0.2)",
                                        borderColor: "rgb(239, 239, 71, 1)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Agua almacenada</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={
                            () => setAutoRefresh(!autoRefresh)
                        }>Auto refresh: {valorRefresh}</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}