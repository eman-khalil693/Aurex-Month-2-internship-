
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import DashboardStats from "./components/DashboardStats.jsx";
import TaskList from "./components/TaskList.jsx";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=20";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTasks() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Unable to load tasks from the API.");
        }

        const data = await response.json();

        setTasks(
          data.map((item) => ({
            id: item.id,
            title: item.title,
            completed: item.completed
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Tasks could not be loaded. Please check your internet and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTasks();
    return () => controller.abort();
  }, [retry]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <main className="app-shell">
      <Header />

      <section className="welcome-section">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h2>Your Task Overview</h2>
          <p className="muted">
            Track tasks fetched from an external REST API.
          </p>
        </div>

        <button
          className="refresh-button"
          type="button"
          onClick={() => setRetry((value) => value + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh API"}
        </button>
      </section>

      <DashboardStats tasks={tasks} loading={loading} />

      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <h2>Task List</h2>
            <p className="muted">Search and filter API results.</p>
          </div>
          <span className="result-count">
            {loading ? "Loading" : `${filteredTasks.length} results`}
          </span>
        </div>

        <div className="controls">
          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search tasks"
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter tasks"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {loading && (
          <div className="message-state" role="status">
            <div className="loader"></div>
            <h3>Loading tasks...</h3>
            <p className="muted">Getting data from the REST API.</p>
          </div>
        )}

        {!loading && error && (
          <div className="message-state error-state" role="alert">
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              className="refresh-button"
              type="button"
              onClick={() => setRetry((value) => value + 1)}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="message-state">
            <h3>No data available</h3>
            <p className="muted">The API returned an empty list.</p>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <TaskList tasks={filteredTasks} onToggle={toggleTask} />
        )}
      </section>

      <footer className="footer">
        <span>AUREX Internship · Month 2 · Task 2</span>
        <span>React + REST API</span>
      </footer>
    </main>
  );
}

export default App;
