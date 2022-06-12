import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";

var env = process.env.NODE_ENV || "development";

const API_KEY = process.env.API_KEY;
// const API_KEY = 1234;

const WeatherAPI = axios.create({
	baseURL: "https://api.weatherapi.com/v1/",
	timeout: 3000
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan(env === "development" ? "dev" : "tiny"));

app.use("/api", handleError);

app.get("/api/current", (req, res, next) => {
	WeatherAPI.get("current.json", {
		params: {
			key: API_KEY,
			q: "85718",
			aqi: "yes"
		}
	})
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			next(error);
		});
});

app.get("/api/forecast", (req, res, next) => {
	WeatherAPI.get("forecast.json", {
		params: {
			key: API_KEY,
			q: "85718",
			days: 3,
			aqi: "yes",
			alerts: "yes"
		}
	})
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			next(error);
		});
});

// starting the server
app.listen(3001, () => {
	console.log("listening on port 3001");
});

function handleError(error, req, res, next) {
	console.warn("Error calling WeatherAPI: ", error.message);

	if (error.response) {
		res.status(error.response.status).send(`${error.response.status} ${error.response.statusText}`);
	} else {
		res.status(500).res.end();
	}
}
