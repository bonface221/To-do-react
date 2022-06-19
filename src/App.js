import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
	const [showAddTask, setShowAddTask] = useState(false);

	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTask = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};
		getTask();
	}, []);

	// fetch data from server
	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5000/tasks");
		const data = await res.json();

		return data;
	};

	// fetch task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();

		return data;
	};

	// Add Task
	const addTask = async (task) => {
		const res = await fetch("http://localhost:5000/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(task),
		});
		const data = await res.json();

		setTasks([...tasks, data]);
	};

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

		setTasks(tasks.filter((task) => task.id != id));
	};

	// Toggle Reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "Put",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(updTask),
		});
		const data = await res.json();
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		);
	};
	return (
		<Router>
			<div className="container">
				<Header
					showForm={() => setShowAddTask(!showAddTask)}
					showAddTask={showAddTask}
				/>

				<Routes>
					<Route
						path="/"
						exact
						element={
							<>
								{showAddTask && <AddTask onAdd={addTask} />}
								{tasks.length ? (
									<Tasks
										tasks={tasks}
										onDelete={deleteTask}
										onToggle={toggleReminder}
									/>
								) : (
									"No Tasks to show"
								)}
							</>
						}
					/>
					<Route path="/about" element={<About />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
