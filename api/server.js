const app = require("./app.js");

const PORT = process.env.PORT ? process.env.PORT : 3001;

app.listen(PORT, () => {
	console.log(`react-weather API listening on port ${PORT}`);
});
