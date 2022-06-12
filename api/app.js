require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const NODE_ENV = process.env.NODE_ENV || "development";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// for testing error handling
// const WEATHER_API_KEY = 1234;

const WeatherAPI = axios.create({
	baseURL: "https://api.weatherapi.com/v1/",
	timeout: 3000
});

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const PexelsAPI = axios.create({
	baseURL: "https://api.pexels.com/v1/",
	timeout: 3000,
	headers: { Authorization: PEXELS_API_KEY }
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan(NODE_ENV === "development" ? "dev" : "tiny"));

app.use("/api", handleError);

app.get("/api/current", (req, res, next) => {
	WeatherAPI.get("current.json", {
		params: {
			key: WEATHER_API_KEY,
			q: req.query.q,
			aqi: true
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
			key: WEATHER_API_KEY,
			q: req.query.q,
			days: 3,
			aqi: true,
			alerts: true
		}
	})
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			next(error);
		});
});

app.get("/api/background", (req, res, next) => {
	PexelsAPI.get("search", {
		params: {
			query: req.query.query,
			orientation: "landscape",
			size: "medium"
		}
	})
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			next(error);
		});
});

function handleError(error, req, res, next) {
	console.warn("Error calling API: ", error);

	if (error.response) {
		res.status(error.response.status).send(`${error.response.status} ${error.response.statusText}`);
	} else {
		res.status(500).res.end();
	}
}

module.exports = app;
