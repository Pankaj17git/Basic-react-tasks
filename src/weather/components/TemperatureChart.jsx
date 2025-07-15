// components/TemperatureChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
} from "recharts";

const TemperatureChart = ({ hourlyData }) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={hourlyData}>
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdd835" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#fdd835" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="time"
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
        <Tooltip formatter={(value) => `${value}°C`} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#fbc02d"
          fill="url(#colorTemp)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
