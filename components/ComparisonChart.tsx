
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_USER_STATS } from '../constants';

const ComparisonChart: React.FC = () => {
  const data = [
    { name: 'Avg Income (TK)', event: MOCK_USER_STATS.averageEventIncome, normal: MOCK_USER_STATS.averageNormalIncome },
    { name: 'Avg Viewers (P)', event: MOCK_USER_STATS.averageEventViewers, normal: MOCK_USER_STATS.averageNormalViewers },
  ];

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 90, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
            width={85}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
          />
          <Bar dataKey="event" radius={[0, 4, 4, 0]} barSize={12} name="During Event">
            {data.map((entry, index) => (
              <Cell key={`cell-event-${index}`} fill="#ec4899" />
            ))}
          </Bar>
          <Bar dataKey="normal" radius={[0, 4, 4, 0]} barSize={12} name="Normal Streaming">
            {data.map((entry, index) => (
              <Cell key={`cell-normal-${index}`} fill="#94a3b8" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-6 mt-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-pink-500"></div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">In Event</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Normal</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;