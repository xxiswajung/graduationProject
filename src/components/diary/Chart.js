import React from 'react';
import {PieChart} from "react-minimal-pie-chart";

function Chart({per,nut,nutcolor}){
    return(
        
        <PieChart
            data={[
              {
                value:per.toFixed(2),
                color: nutcolor,
                name:"name1"
              },
            ]}
            reveal={per}
            lineWidth={20}
            radius={50}
           // viewBoxSize={[0,0,10,10]}
            background="#f3f3f3"
            lengthAngle={360}
            rounded
            animate
            label={({dataEntry})=>nut+"\n"+dataEntry.value+"%"}
            labelStyle={{
                fontSize:"10px",
                fill:"#33333",
            }}
            labelPosition={0}
        />
    );
};

export default Chart;