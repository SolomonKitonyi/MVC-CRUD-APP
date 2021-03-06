const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const courses = require('./Controllers/Routes/courses');

app.use(express.json());
app.use(cors());
app.use('/api/courses', courses);

const PORT = 3001;

//connect to mongoDB
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(
		'mongodb+srv://Solomon:S0l0m0n1234@cluster0.tcc5n.mongodb.net/?retryWrites=true&w=majority',
		() => {
			console.log('Connected to Database');
		}
	);
}

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
