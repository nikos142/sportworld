import React  from 'react'
import { BarChart,Bar, YAxis, XAxis, Tooltip,Legend, Cell, ResponsiveContainer } from 'recharts';


export default function LeagueCharts ({data}){

return(<>
        <ResponsiveContainer width="90%" height="30%" >
              <BarChart
                width={500}
                height={300}
                data={data}
                barSize={10}
              >
              <XAxis dataKey={"name"}/>
              <YAxis dataKey="goals" />
              <Tooltip />
              <Legend  />
              <Bar dataKey="goals" >
                {data.map((entry, index) => (<>
                    <Cell key={`cell-${index}`}  fill={entry.color}/>
                </> ))}
              </Bar>
            </BarChart>
      </ResponsiveContainer>
</>)
}