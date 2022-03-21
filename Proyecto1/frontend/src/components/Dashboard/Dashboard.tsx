import React, {useEffect, useState} from "react";

// @ts-ignore
export const Dashboard = ({autoRefresh}) => {

    const [realData, setRealData] = useState({
        Data: [
            {
                Agua: 0,
                Antes: 0,
                Despues: 0,
                Humedad: 0,
                Recolectada: 0
            }
        ]
    })

    useEffect(() => {
        let interval: NodeJS.Timer
        const fetchData = async () => {
            try {

                let url = process.env.REACT_APP_GET_LAST
                // @ts-ignore
                const response = await fetch(url)
                setRealData(await response.json())
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchData()

        if(autoRefresh){
            interval = setInterval(() => {
                fetchData()
            }, 2 * 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [autoRefresh, realData])

    // @ts-ignore
    return (
        <div className="row date-selector">
            <div className="col">
                <label>Agua: {realData['Data'][0]['Agua']}cm3</label>
            </div>
            <div className="col">
                <label>Suciedad Antes: {realData['Data'][0]['Antes']}%</label>
            </div>
            <div className="col">
                <label>Suciedad Despues: {realData['Data'][0]['Despues']}%</label>
            </div>
            <div className="col">
                <label>Humedad: {realData['Data'][0]['Humedad']}%</label>
            </div>
            <div className="col">
                <label>Recolectada: {realData['Data'][0]['Recolectada']}cm3</label>
            </div>
        </div>
    )
}