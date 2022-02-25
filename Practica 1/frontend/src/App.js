import React, {useState,useEffect} from "react";
import ReactApexChart from "react-apexcharts";



function App() {
  let datco2_=[];

  
  let humedad=[];
  
  let dtempinter=[];
  let dtempExter=[];
  
  let dHumeda_=[];
  let dHtem_=[];
  
  let tmpclima_=[]
  let clima_=[];
  
  const dataCO2 = {
    series: [
      {
        name: "CO2",
        data: datco2_
      },
      {
        name: "Humedad",
        data: humedad
  
      }
    ],
    options: {
  
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
       title: {
       text: "Calidad del Aire",
       align: "center"
       },
      grid: {
        row: {
          colors: ["transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [23,24,25,26,27,28,1,2,3,4,5,6,7,8,9],
        min: 0,
        max: 15
      }
    }
  };
  
  const dataTemp = {
    series: [
      {
        name: "Interior",
        data: dtempinter
      },
      {
        name: "Exterior",
        data: dtempExter
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
       title: {
       text: "Temperatura Ambiente",
       align: "center"
       },
      grid: {
        row: {
          colors: ["transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [23,24,25,26,27,28,1,2,3,4,5,6,7,8,9],
        min: 0,
        max: 15
      }
    }
  };
   
  const dataHumedad = {
    series: [
      {
        name: "Temperatura Interior",
        data: dHtem_
      },
      {
        name: "Humedad",
        data: dHumeda_
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
       title: {
       text: "Temperatura - Humedad del Suelo",
       align: "center"
       },
      grid: {
        row: {
          colors: ["transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [23,24,25,26,27,28,1,2,3,4,5,6,7,8,9],
        min: 0,
        max: 15
      }
    }
  };
  
  const dataLuz = {
    series: [
      {
        name: "Temperatura Interior",
        data: tmpclima_
      },
      {
        name: "Lumenes",
        data: clima_
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
       title: {
       text: "Temperatura - Luz solar",
       align: "center"
       },
      grid: {
        row: {
          colors: ["transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [23,24,25,26,27,28,1,2,3,4,5,6,7,8,9],
        min: 0,
        max: 15
      }
    }
  };


const[currentTemp,setTemperatura] = useState([]);
const[currentHum,setHumedad] = useState([]);
const[curentClima,setClima]= useState([]);
const[currentAir,setAir] = useState([]);

useEffect(()=>{
 
   getTemper()
   getHumedad()
   getClima()
   getAire()
    }
 ,[]);

  const getTemper = async()=>{
  const data = await fetch('http://34.125.201.170:3010/grafica1')
  const tem = await data.json();
  setTemperatura(tem)
  }

  const getHumedad = async()=>{
    const data = await fetch('http://34.125.201.170:3010/grafica2')
    const tem = await data.json();
    setHumedad(tem)
  }

  const getClima = async()=>{
    const data = await fetch('http://34.125.201.170:3010/grafica3')
    const tem = await data.json();
    setClima(tem)
  }


  const getAire = async()=>{
   const data = await fetch('http://34.125.201.170:3010/grafica4')
   const tem = await data.json();
   setAir(tem)
 }

  
  

  return (
    <div className="App" style={{ position: "center" }}>
    <div
      style={{
        border: "2px solid #E4E4E4",
        width: 0,
        height: "294px",
        position: "absolute",
        left: "50px"
      }}
    ></div>
    <div className="row">
      <div className="mixed-chart">
        <ReactApexChart
          options={dataTemp.options}
          series={dataTemp.series}
          type="line"
          height={350}
        />
      </div>
      {
        currentTemp.map((dat)=>{
        dtempinter.push(dat.adentro.toFixed(2))
        console.log(dtempinter)
        dtempExter.push(dat.afuera.toFixed(2)) 
      }) 
      }
      {
         currentHum.map((dat)=>{
          dHtem_.push(dat.adentro.toFixed(2))
          dHumeda_.push(dat.humedad.toFixed(2))
       })
      }
      {
        curentClima.map((dat)=>{
          tmpclima_.push(dat.adentro.toFixed(2))
          clima_.push(dat.clima.toFixed(2))
       })
      }
      {
        currentAir.map((dat)=>{
          datco2_.push(dat.aire.toFixed(3))
          humedad.push(dat.humedad.toFixed(2))
       })
      }
      <div className="mixed-chart">
        <ReactApexChart
          options={dataHumedad.options}
          series={dataHumedad.series}
          type="line"
          height={350}
        />
      </div>
      <div className="mixed-chart">
        <ReactApexChart
          options={dataLuz.options}
          series={dataLuz.series}
          type="line"
          height={350}
        />
      </div>
      <div className="mixed-chart">
        <ReactApexChart
          options={dataCO2.options}
          series={dataCO2.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  </div>
);
}

export default App;
