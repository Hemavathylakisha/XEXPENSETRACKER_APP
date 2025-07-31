import React, {useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ExpenseTrends = ({ expenses }) => {
    const [activeIndex, setActiveIndex] = useState(null);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total
  }));

  const colors = {
    Food: '#a084dc',
    Entertainment: '#a084dc',
    Travel: '#aa3763ff'
  };
  const hoverColor = '#ebdcdc88';

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '8px', width:"30%" }}>
      <h3 style={{ color: '#3b3b3b' }}>Top Expenses</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5,  }}
           onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="category" type="category" tick={{ fill: '#3b3b3b' }} />
          <Tooltip />
          <Bar dataKey="total" radius={[0, 10, 10, 0]}>
           {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  activeIndex === index
                    ? hoverColor
                    : colors[entry.category] || '#8884d8'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrends;
