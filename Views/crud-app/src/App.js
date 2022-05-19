import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
	const [courseName, setCourseName] = useState('');
	const [numberOfHours, setNumberOfHours] = useState(0);

	const addCourse = () => {
		Axios.post('http://localhost:3001/api/courses', {
			name: courseName,
			numberOfHours: numberOfHours,
		});
	};
	return (
		<div className="App">
			<h1>CRUD APPLICATION</h1>
			<label>Course Name: </label>
			<input type="text" onChange={(e) => setCourseName(e.target.value)} />
			<label>Number of Hours: </label>
			<input type="number" onChange={(e) => setNumberOfHours(e.target.value)} />
			<button onClick={addCourse}>ADD COURSE</button>
		</div>
	);
}

export default App;
