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
//update course
router.put('/', async (req, res) => {
	const course = await Course.findByIdAndUpdate(req.body.id, {
		name: req.body.newCourseName,
	});
	if (!course) return res.status(404).send('Course not found');
	res.send(course);
});
//Delete course
router.delete('/:id', async (req, res) => {
	const course = await Course.findByIdAndRemove(req.params.id);
	if (!course) return res.status(404).send('Course not found');
	res.send(course);
});

module.exports = router;
