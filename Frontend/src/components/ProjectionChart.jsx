import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function ProjectionChart({ data = [] }) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <h3 className="text-lg font-semibold text-white">Investment Projection</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="bear" stroke="#fb7185" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="base" stroke="#22c55e" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="bull" stroke="#f59e0b" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
