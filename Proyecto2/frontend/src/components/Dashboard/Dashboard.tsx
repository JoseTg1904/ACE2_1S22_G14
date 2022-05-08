import React, {useEffect, useState} from "react";

// @ts-ignore
export const Dashboard = ({autoRefresh}) => {

    const [realData, setRealData] = useState({
        Data: [
            {
                Metano: 0,
                Temperatura: 0
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
                <label>Metano: {realData['Data'][0]['Metano']}cm3</label>
            </div>
            <div className="col">
                <label>Temperatura: {realData['Data'][0]['Temperatura']}Celsius</label>
            </div>
        </div>
    )
}