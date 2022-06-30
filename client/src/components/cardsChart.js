import React from 'react';
import { BarChart, Bar,  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function CardsCharts({data}) {
console.log(data)
    return (
        <ResponsiveContainer width="90%" height="30%">
        <BarChart
          width={100}
          height={300}
          data={data} 
        >
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false}  />
          <Tooltip  />
          <Legend />
          <Bar dataKey="rcards" fill="red" barSize={9}/>
          <Bar dataKey="ycards" fill="#D9D602" barSize={9}/>
        </BarChart>
      </ResponsiveContainer>
    );
}
