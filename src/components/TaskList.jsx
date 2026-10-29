
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⌕</div>
        <h3>No tasks found</h3>
        <p>Try changing your search or filter to find tasks.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TaskList;
