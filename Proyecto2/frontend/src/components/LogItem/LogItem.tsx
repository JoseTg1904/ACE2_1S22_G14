import React from "react";
import {Log} from "../../entities/Log";
import "./LogItem.scss"

export const LogItem: React.FC<Log> = ({Temperatura, Metano, Hora}) => {
    return (
        <tr className="log-table-row">
            <td className="log-table-cell">{Temperatura}</td>
            <td className="log-table-cell">{Metano}</td>
            <td className="log-table-cell">{Hora}</td>
        </tr>
    )
}