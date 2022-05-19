const mongoose = require('mongoose');

const Course = mongoose.model(
	'Course',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		numberOfHours: {
			type: Number,
			required: true,
		},
	})
);

exports.Course = Course;
