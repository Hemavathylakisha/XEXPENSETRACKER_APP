import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#a28fd0', '#00C49F'];

const ExpenseSummary = ({ expenses }) => {
  // Group by category
  const dataMap = {};

  expenses.forEach(exp => {
    if (dataMap[exp.category]) {
      dataMap[exp.category] += exp.amount;
    } else {
      dataMap[exp.category] = exp.amount;
    }
  });

  const data = Object.keys(dataMap).map((category) => ({
    name: category,
    value: dataMap[category]
  }));

  return (
    <Box sx={{ height: 300}}>
      <Typography variant="h6" sx={{lineHeight:"2em"}}>Expense Summary (Pie Chart)</Typography>
      {data.length === 0 ? (
        <Typography>No expenses to display.</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default ExpenseSummary;
