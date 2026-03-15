import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Community', value: 40, color: '#e62b3a' },
  { name: 'Team', value: 20, color: '#1a1f4e' },
  { name: 'Liquidity', value: 15, color: '#f59e0b' },
  { name: 'Marketing', value: 15, color: '#3b82f6' },
  { name: 'Development', value: 10, color: '#10b981' },
];

export default function AllocationChart() {
  return (
    <section className="py-20 bg-[#1a1f4e]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Token <span className="text-red-500">Allocation</span>
          </h2>
          <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
            There are 200 million $MEME available on day one and will grow to a total of 1 billion $MEME over three years.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-80 md:h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1f4e',
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Allocation']}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value: string) => <span className="text-gray-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white font-medium">{item.name}</span>
                </div>
                <span className="text-2xl font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
