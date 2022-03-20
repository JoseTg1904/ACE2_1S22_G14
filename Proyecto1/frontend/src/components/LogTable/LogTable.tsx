import React from "react";
import {LogItem} from "../LogItem/LogItem";
import "./LogTable.scss"

// @ts-ignore
export const LogTable = ({logData}) => {

    return (
        <div className="log-scrollable">
            <table className="log-table">
                <thead>
                <tr>
                    <th className="log-table-head">Antes</th>
                    <th className="log-table-head">Despues</th>
                    <th className="log-table-head">Agua</th>
                    <th className="log-table-head">Humedad</th>
                    <th className="log-table-head">Hora</th>
                </tr>
                </thead>
                <tbody>
                {
                    logData['Data'].map((log: {
                        Agua: number;
                        Antes: number;
                        Despues: number;
                        Hora: string;
                        Humedad: number; }) => (
                        <LogItem key={log.Hora}
                            Agua={log.Agua}
                            Antes={log.Antes}
                            Despues={log.Despues}
                            Hora={log.Hora}
                            Humedad={log.Humedad}
                        />
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}