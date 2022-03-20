import React from "react";
import {Log} from "../../entities/Log";
import "./LogItem.scss"

export const LogItem: React.FC<Log> = ({Agua, Antes, Despues, Hora, Humedad}) => {

    console.log(Agua)

    return (
        <tr className="log-table-row">
            <td className="log-table-cell">{Antes}</td>
            <td className="log-table-cell">{Despues}</td>
            <td className="log-table-cell">{Agua}</td>
            <td className="log-table-cell">{Humedad}</td>
            <td className="log-table-cell">{Hora}</td>
        </tr>
    )
}