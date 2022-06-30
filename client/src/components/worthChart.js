import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';

export default function WorthChart({data}) {
  const cardinal = curveCardinal.tension(0.2);

    return (
          <ResponsiveContainer width="90%" height="40%">
          <AreaChart
            width={500}
            height={400}
            data={data}
          >
            <XAxis dataKey="date" />
            <Tooltip />
            <Area type={cardinal} dataKey="worth" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
    );
}
