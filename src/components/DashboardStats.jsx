
function DashboardStats({ tasks, loading }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  const stats = [
    { label: "Total Tasks", value: total, symbol: "T", color: "blue" },
    { label: "Completed", value: completed, symbol: "✓", color: "green" },
    { label: "Pending", value: pending, symbol: "…", color: "orange" }
  ];

  return (
    <section className="stats-grid" aria-label="Task statistics">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <div className={`stat-icon ${stat.color}`}>
            {stat.symbol}
          </div>
          <div>
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-value">
              {loading ? "—" : stat.value}
            </h2>
          </div>
        </article>
      ))}
    </section>
  );
}

export default DashboardStats;
