import {Line} from 'react-chartjs-2';
import React, {useEffect, useState} from "react";

// @ts-ignore
export const Graph = ({data, autoRefresh}) => {
    const [result, setResult] = useState({'Data': [], 'Date': []})

    useEffect(() => {
        let interval: NodeJS.Timer
        const fetchData = async () => {
            try {

                let url = ""
                switch (data.datasets[0].id) {
                    case 1:
                        url = process.env.REACT_APP_GET_DATA + "/Antes"
                        break;
                    case 2:
                        url = process.env.REACT_APP_GET_DATA + "/Humedad"
                        break;
                    case 3:
                        url = process.env.REACT_APP_GET_DATA + "/Despues"
                        break;
                    case 4:
                        url = process.env.REACT_APP_GET_DATA + "/Agua"
                        break;
                }
                const response = await fetch(url)
                console.log(url)
                setResult(await response.json())
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchData()

        if(autoRefresh){
            interval = setInterval(() => {
                fetchData()
            }, 1 * 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [autoRefresh, data])

    data.labels = result['Date'];
    data.datasets[0].data = result['Data'];
    console.log(data.datasets[0].id)

    return (
        <div className={"p-4"}>
            <Line
                data={data}
                width={600}
                height={400}
                options={
                    {
                        title: {
                            display: true,
                            position: 'bottom',
                            text: 'Fuente: Medicion propia'
                        },
                        scales: {
                            yAxes: [
                                {
                                    gridLines: {color: "rgb(255,255,255,0.5)"},
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: 'white',
                                        callback: function (value: string, index: any, ticks: any) {
                                            return value + '%';
                                        }
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {color: 'rgb(255,255,255,0.5)'},
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: 'white',
                                        callback: function (value: string, index: any, ticks: any) {
                                            return value + ' H';
                                        }
                                    }
                                }
                            ]
                        },
                        maintainAspectRatio: false,
                        elements: {line: {tension: 0}}
                    }}
            />
        </div>
    )
}