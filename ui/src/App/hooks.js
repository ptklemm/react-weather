import { useState, useEffect } from "react";
import { getForecastWeather } from "./services";

export function useWeather() {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		if (!navigator.geolocation) {
			console.warn("Unable to retrieve geolocation. No geolocation API.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (location) => {
				const { latitude, longitude } = location.coords;
				const forecast = await getForecastWeather(latitude, longitude);
				console.log(forecast);
				setWeather(forecast);
			},
			(error) => {
				console.error("Error retrieving geolocation.", error.code, error.message);
			}
		);
	}, []);

	return weather;
}

// function usePexelsBackground(weather) {
//     const [bgImageUrl, setBgImageUrl] = useState(null);

// 	useEffect(() => {
// 		(async () => {
// 			const bgUrls = await getBackgroundImage(weather.current.condition.text);
// 			console.log(bgUrls.photos[Math.floor(Math.random() * bgUrls.photos.length - 1)]);
// 			setBgImageUrl(bgUrls.photos[Math.floor(Math.random() * bgUrls.photos.length - 1)].src.landscape);
// 		})();
// 	}, []);
// return bgImageUrl;
// }
