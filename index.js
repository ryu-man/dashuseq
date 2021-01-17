const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Check if running on production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
} else {
	require("dotenv").config();
}

// Setup Database
const {db} = require('./model')
db.sync().then((sequelize)=>{
	console.log("Database connected...")
})


// Setup routers
require("./routes/auth")(app);
require("./routes/agency")(app);


// Error handling middleware
app.use((req, res, next, err) => {
	if (err) {
		console.log(err);
	}
});

// Start listening
app.listen(process.env.PORT || 9999, () => {
	console.log("Dashu server started...");
});
