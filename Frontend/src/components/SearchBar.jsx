export default function SearchBar({ value, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 md:flex-row">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter company name, e.g. Tesla"
        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 text-lg text-white outline-none transition focus:border-teal-400/60"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-gradient-to-r from-teal-500 to-amber-500 px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}
