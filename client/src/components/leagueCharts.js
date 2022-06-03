import React  from 'react'
import { BarChart,Bar, YAxis, CartesianGrid, Tooltip,Legend, Cell, ResponsiveContainer } from 'recharts';

export default function LeagueCharts ({colors , data}){
   
    const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

    const TriangleBar = (props) => {
      const { fill, x, y, width, height } = props;
    
      return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

return(<>
        <ResponsiveContainer width="50%" height="30%" style={{float: 'left'}}>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 40,
                  left: 40,
                  bottom: 5,
                }}
                barSize={15}
              >
              <YAxis dataKey="goals" />
              <Tooltip />
              <Legend  />
              <CartesianGrid  />
              <Bar dataKey="goals" shape={<TriangleBar />}>
                {data.map((entry, index) => (<>
                    <Cell key={`cell-${index}`}  fill={colors[index].color}/>
                </> ))}
              </Bar>
            </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="50%" height="30%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 40,
                  left: 40,
                  bottom: 5,
                }}
                barSize={15}
              >
              <YAxis dataKey="conceded" />
              <Tooltip />
              <Legend  />
              <CartesianGrid  />
              <Bar dataKey="conceded" shape={<TriangleBar />}>
                {data.map((entry, index) => (<>
                    <Cell key={`cell-${index}`}  fill={colors[index].color}/>
                </> ))}
              </Bar>
            </BarChart>
      </ResponsiveContainer>
</>)
}