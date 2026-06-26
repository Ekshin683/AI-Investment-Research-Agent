export default function ScoreCard({ title, score, subtitle, accent = 'teal' }) {
  const accentStyles = {
    teal: 'from-teal-400/25 to-cyan-500/10 text-teal-200',
    amber: 'from-amber-400/25 to-orange-500/10 text-amber-200',
    rose: 'from-rose-400/25 to-red-500/10 text-rose-200',
    blue: 'from-sky-400/25 to-blue-500/10 text-sky-200'
  };

  return (
    <div className={`glass-panel rounded-3xl bg-gradient-to-br ${accentStyles[accent]} p-5 shadow-glow`}>
      <p className="text-sm uppercase tracking-[0.28em] text-slate-300">{title}</p>
      <div className="mt-3 text-4xl font-black text-white">{score}</div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
    </div>
  );
}
