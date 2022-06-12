import { useState, useEffect } from "react";
import { getForecastWeather } from "../services";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function useWeather() {
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

function App() {
	const weather = useWeather();

	return (
		<div
			className="vertical-centered-container"
			style={{
				// backgroundImage: `url(${bgImageUrl})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			}}>
			<Card>
				<Card.Body>
					{weather && (
						<span>
							{weather.location.name} {weather.current.temp_f}
						</span>
					)}
				</Card.Body>
			</Card>
		</div>
	);
}

export default App;
