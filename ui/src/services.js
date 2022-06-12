import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3001/api/",
	timeout: 6000
});

async function getWeather(reqType, latitude, longitude) {
	try {
		const response = await api.get(reqType, {
			params: {
				q: `${latitude},${longitude}`
			}
		});
		return response.data;
	} catch (error) {
		console.error(`Error fetching ${reqType} weather.`, error);
	}
}

export async function getCurrentWeather(latitude, longitude) {
	return await getWeather("current", latitude, longitude);
}

export async function getForecastWeather(latitude, longitude) {
	return await getWeather("forecast", latitude, longitude);
}

export async function getBackgroundImage(query) {
	try {
		const response = await api.get("background", {
			params: {
				query
			}
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching background.", error);
	}
}
