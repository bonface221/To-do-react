import Task from "./Task";

const Tasks = ({tasks, onDelete ,onToggle}) => {
	return (
		<ol>
			{tasks.map((task)=>(
				<Task
					key={task.id}
					task={task}
					onDelete={onDelete}
					onToggle={onToggle}
				/>
			))
			}
		</ol>
		)
};

export default Tasks;
