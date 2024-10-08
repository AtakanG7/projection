import React from 'react';
import { useSession } from "next-auth/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ActionComponent from "./ActionComponent";
import { lowerCase } from 'lodash';

const data = [
  { name: 'Showcase Projects', value: 400, color: '#00C49F' },
  { name: 'Engage Community', value: 300, color: '#FFBB28' },
  { name: 'Gain Feedback', value: 300, color: '#FF8042' },
  { name: 'Unlock Opportunities', value: 200, color: '#0088FE' },
];

const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3">
        <p className="text-sm font-medium text-gray-900">{`${payload[0].name}: ${payload[0].value}`}</p>
        <p className="text-xs text-gray-600">{`Percentage: ${(payload[0].value / totalValue * 100).toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

const HeroSection = () => {
  const { data: session } = useSession();
  const isRegistered = !!session;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-16 flex flex-col items-center">
      <div className="w-full max-w-md" style={{ height: '400px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={150}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                const percentage = ((value / totalValue) * 100).toFixed(2);
                const x = cx + (outerRadius + 10) * Math.cos(-midAngle * Math.PI / 180);
                const y = cy + (outerRadius + 10) * Math.sin(-midAngle * Math.PI / 180);
                const textX = cx + (outerRadius / 2) * Math.cos(-midAngle * Math.PI / 180);
                const textY = cy + (outerRadius / 2) * Math.sin(-midAngle * Math.PI / 180);
                return (
                  <>
                    <text x={textX} y={textY} fill="#333" textAnchor="middle" dominantBaseline="middle" fontSize="14">
                      {`${percentage}%`}
                    </text>
                    <text x={x} y={y} fill="#444" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="14">
                      {name}
                    </text>
                  </>
                );
              }}
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={isRegistered
                    ? entry.color
                    : entry.name === 'Showcase Projects' ? '#FF6347' : '#D3D3D3'}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center w-full max-w-4xl mt-8">
        <p className={`text-lg font-medium ${isRegistered ? 'text-emerald-700' : 'text-rose-700'} mb-1`}>
          {!isRegistered ? 'You are not in yet! 😭' : 'Your projects page is alive 🎉'}
        </p>
        <ActionComponent isRegistered={isRegistered} username={lowerCase(session?.user?.username).replace(/\s/g, "")} />
      </div>
    </section>
  );
};

export default HeroSection;