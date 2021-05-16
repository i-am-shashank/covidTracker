
import React,{useState,useEffect} from "react";

import { Bar } from "react-chartjs-2";

const Graph = ({ recovered, death,worldCasesData, worldRecoveredData,worldDeathsData,input }) => {
  //  let dataArr = [];
  //     data.map((el,idx)=>(

  // dataArr.push({

  //     country:el.country,
  //     date: Object.keys(el.timeline.cases),
  //     cases:Object.values(el.timeline.cases),
  // })

  //     ))




  

  const barChart = recovered || worldRecoveredData ? (
    <Bar
      data={{
        labels: ["Infected","Recovered", "Death"],
        datasets: [
          {
           
            backgroundColor: ["blue","green","red"],
            label:'People',
            
            data: input ==='Worldwide'? [worldCasesData,worldRecoveredData,worldDeathsData]:[recovered,death]
          },
        ],
      }}
      options={{legend:{display:false}, title:{display:true, text:'current state in country'},}}
    />
  ) : 'Loading';


  return <div className="graph">

      {barChart}
  </div>;
};

export default Graph;
