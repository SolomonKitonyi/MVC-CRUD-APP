import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

import Popup from './Popup';

function App() {
	const [courseName, setCourseName] = useState('');
	const [numberOfHours, setNumberOfHours] = useState(0);
	const [courses, setCourses] = useState([]);
	const [newCourseName, setNewCourseName] = useState('');
	const [refresh, setRefresh] = useState(false);
	const [message, setMessage] = useState('');
	const [background, setBackground] = useState('');
	const [visibility, setVisibility] = useState('');

	const url = 'https://crud-mvc-api.herokuapp.com/api/courses';

	useEffect(() => {
		Axios.get(`${url}`)
			.then((response) => {
				setCourses(response.data);
			})
			.catch((err) => console.log(err.message));
	}, [refresh]);

	const addCourse = () => {
		if (courseName.length < 3 || numberOfHours <= 0) {
			setMessage('Please Add Course with Valid Name and Hours!!');
			setBackground('red');
			setVisibility('visible');
			return;
		}
		Axios.post(`${url}`, {
			name: courseName,
			numberOfHours: numberOfHours,
		})
			.then(() => {
				setMessage('Course Added Successfully!!');
				setBackground('green');
				setVisibility('visible');
				setRefresh(!refresh);
			})
			.catch(() => {
				setMessage('Course Add Fail!!');
				setBackground('red');
				setVisibility('visible');
			});
		setCourseName('');
		setNumberOfHours(0);
	};
	const updateCourse = (id) => {
		if (newCourseName.length < 1) {
			setMessage('Please Add Course with Valid Name!!');
			setBackground('red');
			setVisibility('visible');
			return;
		}
		Axios.put(`${url}`, {
			newCourseName: newCourseName,
			id: id,
		})
			.then(() => {
				setMessage('Course Update Success!!');
				setBackground('green');
				setVisibility('visible');
				setRefresh(!refresh);
			})
			.catch(() => {
				setMessage('Course Update Fail!!');
				setBackground('red');
				setVisibility('visible');
			});
		setNewCourseName('');
	};
	const deleteCourse = (id) => {
		Axios.delete(`${url}/${id}`)
			.then(() => {
				setMessage('Course Delete Success!!');
				setBackground('green');
				setVisibility('visible');
				setRefresh(!refresh);
			})
			.catch(() => {
				setMessage('Course Delete Fail!!');
				setBackground('red');
				setVisibility('visible');
			});
	};
	return (
		<div className="App">
			<h1>CRUD APPLICATION</h1>
			<Popup
				background={background}
				message={message}
				setVisibility={setVisibility}
				visibility={visibility}
			/>
			<div className="addcourse-div">
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
			</div>
			<h1>Course List</h1>
			{courses.length < 1 ? <h2>No Courses Found ADD ONE</h2> : null}
			{courses.map((course) => (
				<div key={course._id} className="course">
					<h1>{course.name}</h1>
					<h2>{course.numberOfHours}</h2>
					<input
						type="text"
						placeholder="New Course Name"
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
