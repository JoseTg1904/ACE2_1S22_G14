import React, {useState} from "react";
import './DateSelector.scss'

// @ts-ignore
export const DateSelector =  ({setLogData, dates}) => {

    const [dia, setDia] = useState('')
    // @ts-ignore
    return (
        <div className="row date-selector">
            <div className="col">
                <select className="form-select" aria-label="Default select example" value={dia} onChange={
                    e => setDia(e.target.value)
                }>
                    <option value={1}>Selecciona un dia</option>
                    {
                        dates['Dates'].map((date: string) => (
                            <option value={date} key={date}>{date}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col">
                <button type="button" className="btn btn-light" onClick={
                    async () => {
                        let url = process.env.REACT_APP_GET_DATA_BY_DATE  + "/" + dia
                        const response = await fetch(url)
                        setLogData(await response.json())
                    }
                }>Buscar</button>
            </div>
        </div>
    )
}