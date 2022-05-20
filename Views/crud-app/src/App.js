import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
	const [courseName, setCourseName] = useState('');
	const [numberOfHours, setNumberOfHours] = useState(0);
	const [courses, setCourses] = useState([]);
	const [newCourseName, setNewCourseName] = useState('');
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		Axios.get('http://localhost:3001/api/courses')
			.then((response) => {
				setCourses(response.data);
			})
			.catch((err) => console.log(err.message));
	}, [refresh]);

	const addCourse = () => {
		if (courseName.length < 3 || numberOfHours <= 0) return;
		Axios.post('http://localhost:3001/api/courses', {
			name: courseName,
			numberOfHours: numberOfHours,
		});
		setCourseName('');
		setNumberOfHours(0);
		setRefresh(!refresh);
	};
	const updateCourse = (id) => {
		if (newCourseName.length < 1) return;
		Axios.put('http://localhost:3001/api/courses', {
			newCourseName: newCourseName,
			id: id,
		});
		setNewCourseName('');
		setRefresh(!refresh);
	};
	const deleteCourse = (id) => {
		Axios.delete(`http://localhost:3001/api/courses/${id}`);
		setRefresh(!refresh);
	};
	return (
		<div className="App">
			<h1>CRUD APPLICATION</h1>
			<label>Course Name: </label>
			<input
				type="text"
				value={courseName}
				onChange={(e) => setCourseName(e.target.value)}
			/>
			<label>Number of Hours: </label>
			<input
				type="number"
				value={numberOfHours}
				onChange={(e) => setNumberOfHours(e.target.value)}
			/>
			<button onClick={addCourse}>ADD COURSE</button>
			<h1>Course List</h1>
			{courses.length < 1 ? <h2>No Courses Found ADD ONE</h2> : null}
			{courses.map((course) => (
				<div key={course._id} className="course">
					<h1>{course.name}</h1>
					<h2>{course.numberOfHours}</h2>
					<input
						type="text"
						placeholder="New Course Name"
						value={newCourseName}
						onChange={(e) => setNewCourseName(e.target.value)}
					/>
					<button onClick={() => updateCourse(course._id)}>Update</button>
					<button onClick={() => deleteCourse(course._id)}>delete</button>
				</div>
			))}
		</div>
	);
}

export default App;
