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
                    <th className="log-table-head">Metano</th>
                    <th className="log-table-head">Temperatura</th>
                    <th className="log-table-head">Hora</th>
                </tr>
                </thead>
                <tbody>
                {
                    logData['Data'].map((log: {
                        Metano: number;
                        Temperatura: number
                        Hora: string; }) => (
                        <LogItem key={log.Hora}
                                 Metano={log.Metano}
                                 Temperatura={log.Temperatura}
                                 Hora={log.Hora}
                        />
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}