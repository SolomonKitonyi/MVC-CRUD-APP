const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Course } = require('../../Models/course');

//Save course in db
router.post('/', async (req, res) => {
	if (!req.body.name || !req.body.numberOfHours)
		return res.status(400).send('Name and Number of Hours are required');
	let course = new Course({
		name: req.body.name,
		numberOfHours: req.body.numberOfHours,
	});
	course = await course.save(course);
	res.send(course);
});
router.get('/', async (req, res) => {
	const courses = await Course.find();
	res.send(courses);
});

module.exports = router;
