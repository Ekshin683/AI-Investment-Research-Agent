import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ScoreCard from '../components/ScoreCard';
import FinancialChart from '../components/FinancialChart';
import ProjectionChart from '../components/ProjectionChart';
import RecommendationCard from '../components/RecommendationCard';
import { analyzeCompany, generateProjection } from '../services/api';

function projectionSeries(projection, years) {
  const series = [];

  for (let year = 1; year <= years; year += 1) {
    series.push({
      name: `Y${year}`,
      bear: Math.round(projection.principal * (1 + projection.bear / 100) ** year),
      base: Math.round(projection.principal * (1 + projection.base / 100) ** year),
      bull: Math.round(projection.principal * (1 + projection.bull / 100) ** year)
    });
  }

  return series;
}

export default function Home() {
  const [company, setCompany] = useState('Tesla');
  const [loading, setLoading] = useState(false);
  const [projectionLoading, setProjectionLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [projection, setProjection] = useState(null);
  const [error, setError] = useState('');

  const scoreCards = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      { title: 'Financial Score', score: `${result.financial.financialScore}/100`, subtitle: result.financial.reasoning, accent: 'teal' },
      { title: 'Technical Score', score: `${result.technical.technicalScore}/100`, subtitle: result.technical.reasoning, accent: 'blue' },
      { title: 'News Sentiment', score: `${result.news.sentimentScore}/100`, subtitle: result.news.summary, accent: 'amber' },
      { title: 'Risk Score', score: `${result.risk.riskScore}/100`, subtitle: result.risk.reasoning, accent: 'rose' }
    ];
  }, [result]);

  async function handleAnalyze(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const analysis = await analyzeCompany(company);
      setResult(analysis);

      const projectionData = await generateProjection(50000, 5);
      setProjection({
        ...projectionData,
        chart: projectionSeries(projectionData, 5)
      });
    } catch (analysisError) {
      setError(analysisError?.response?.data?.message || analysisError.message || 'Unable to analyze company.');
    } finally {
      setLoading(false);
      setProjectionLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        <section className="glass-panel rounded-[2rem] p-6 shadow-2xl shadow-teal-950/30 md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">AI Investment Research Agent</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
              Research companies, score the thesis, and visualize the future outlook.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              A multi-agent analysis workflow for company research, financial health, technical behavior, news sentiment, risk evaluation, and scenario planning.
            </p>
          </div>

          <div className="mt-8">
            <SearchBar value={company} onChange={setCompany} onSubmit={handleAnalyze} loading={loading} />
          </div>

          {error ? <p className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">{error}</p> : null}
        </section>

        {loading ? (
          <section className="glass-panel rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Loading</p>
            <div className="mt-4 grid gap-3 text-2xl font-bold text-white md:grid-cols-2">
              <p>Researching Company...</p>
              <p>Analyzing Financials...</p>
              <p>Checking News...</p>
              <p>Calculating Risks...</p>
            </div>
          </section>
        ) : null}

        {result ? (
          <>
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {scoreCards.map((card) => (
                <ScoreCard key={card.title} {...card} />
              ))}
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="glass-panel rounded-3xl p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Results Dashboard</p>
                    <h2 className="mt-2 text-3xl font-black text-white">{result.company.companyName}</h2>
                    <p className="mt-1 text-slate-300">{result.company.industry} · {result.company.sector}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Investment Score</p>
                    <p className="text-3xl font-black text-white">{result.summary.investmentScore}/100</p>
                    <p className="text-sm text-emerald-300">{result.summary.recommendation}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Reasoning</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      {result.recommendation.reasoning.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Future Outlook</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      <p>Bear Case CAGR: {result.projection.bear}%</p>
                      <p>Base Case CAGR: {result.projection.base}%</p>
                      <p>Bull Case CAGR: {result.projection.bull}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <RecommendationCard recommendation={result.recommendation} />
            </section>

            <section className="grid gap-5 xl:grid-cols-2">
              <FinancialChart data={result.financial.revenueTrend} />
              <ProjectionChart data={projection?.chart || []} />
            </section>
          </>
        ) : null}

        {projectionLoading ? <p className="text-sm text-slate-400">Preparing projection model...</p> : null}
      </div>
    </main>
  );
}
