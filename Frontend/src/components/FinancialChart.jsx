import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function FinancialChart({ data = [] }) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <h3 className="text-lg font-semibold text-white">Financial Growth</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.map((value, index) => ({ name: `Y${index + 1}`, revenue: value }))}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#5eead4" fill="url(#revenueGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
