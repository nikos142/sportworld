import React  from 'react'
import { BarChart,Bar,XAxis, YAxis, Tooltip,Legend, Cell, ResponsiveContainer } from 'recharts';

export default function ConcededChart ({data}){
   
return(<>
      <ResponsiveContainer width="90%" height="30%">
              <BarChart
                width={500}
                height={300}
                data={data}
                barSize={10}
              >
              <XAxis dataKey="name"/>
              <YAxis dataKey="conceded"/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="conceded">
                {data.map((entry, index) => (<>
                    <Cell key={`cell-${index}`}  fill={entry.color}/>
                </> ))}
              </Bar>
            </BarChart>
      </ResponsiveContainer>
</>)
}