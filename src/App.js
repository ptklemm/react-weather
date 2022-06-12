import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./App.css";

const WEATHERAPI_URL_BASE = "https://api.weatherapi.com/v1";
const WEATHERAPI_URL_CURRENT = WEATHERAPI_URL_BASE + "/current.json";

function App() {
	const [geolocation, setGeolocation] = useState(null);
	const [currentWeather, setCurrentWeather] = useState(0);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position);
					setGeolocation(position);
				},
				(error) => {
					console.error("Error retrieving geolocation: " + error.code + " - " + error.message);
				}
			);
		} else {
			console.warn("Geolocation API not found.");
		}
	}, []);

	useEffect(() => {
		if (geolocation) {
			fetch(
				`${WEATHERAPI_URL_CURRENT}?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${geolocation.coords.latitude},${geolocation.coords.longitude}&aqi=yes`
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setCurrentWeather(data);
				});
		}
	}, [geolocation]);

	return (
		<div className="vertical-centered-container">
			<Card>
				<Card.Body>
					{currentWeather.location.name} {currentWeather.current.temp_f}
				</Card.Body>
			</Card>
		</div>
	);
}

export default App;
