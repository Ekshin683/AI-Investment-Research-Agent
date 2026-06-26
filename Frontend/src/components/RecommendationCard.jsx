export default function RecommendationCard({ recommendation }) {
  if (!recommendation) {
    return null;
  }

  return (
    <div className="glass-panel rounded-3xl p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recommendation</p>
      <h3 className="mt-2 text-3xl font-black text-white">{recommendation.recommendation}</h3>
      <p className="mt-2 text-slate-300">Investment Score: {recommendation.investmentScore}/100</p>
      <p className="mt-1 text-slate-300">Confidence: {recommendation.confidence}%</p>
      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        {recommendation.reasoning?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
