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
                                        label: "Temperatura(Celsius) vs Tiempo",
                                        data: [],
                                        backgroundColor: "rgba(44, 239, 71, 0.2)",
                                        borderColor: "rgb(44, 239, 71, 1)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Temperatura</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={
                            () => setData({
                                labels: [],
                                datasets: [
                                    {
                                        id: 2,
                                        label: "Metano(ppm) vs Tiempo",
                                        data: [],
                                        backgroundColor: "rgba(44, 239, 210,0.2)",
                                        borderColor: "rgb(44, 239, 210, 1)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Metano</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick={
                            () => setData({
                                labels: [],
                                datasets: [
                                    {
                                        id: 3,
                                        label: "Tiempo encendido (s)",
                                        data: [],
                                        backgroundColor: "rgba(239, 44, 44, 0.2)",
                                        borderColor: "rgb(239, 44, 44)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Tiempo encendido</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick={
                            () => setData({
                                labels: [],
                                datasets: [
                                    {
                                        id: 4,
                                        label: "Metano recolectado(ppm)",
                                        data: [],
                                        backgroundColor: "rgba(239, 44, 44, 0.2)",
                                        borderColor: "rgb(239, 44, 44)",
                                        borderWidth: 1
                                    }
                                ]
                            })
                        }>Recoleccion de Metano</a>
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