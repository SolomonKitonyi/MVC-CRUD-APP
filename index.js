const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const PORT = 3001;

//connect to mongoDB
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect('mongodb://localhost:27017/crud', () => {
		console.log('Connected to Database');
	});
}

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});
