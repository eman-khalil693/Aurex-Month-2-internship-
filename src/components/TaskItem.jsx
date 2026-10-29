
function TaskItem({ task, onToggle }) {
  return (
    <article className="task-card">
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Toggle ${task.title}`}
        />
        <span className={`task-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </span>
      </label>

      <span className={`task-status ${task.completed ? "status-complete" : "status-pending"}`}>
        {task.completed ? "Completed" : "Pending"}
      </span>
    </article>
  );
}

export default TaskItem;
