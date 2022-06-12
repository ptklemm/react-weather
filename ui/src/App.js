import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./App.css";

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position);
				},
				(error) => {
					console.error("Error retrieving geolocation: " + error.code + " - " + error.message);
				}
			);
		} else {
			console.warn("Geolocation API not found.");
		}
	}, []);

	return (
		<div className="vertical-centered-container">
			<Card>
				<Card.Body>
					{currentWeather && (
						<span>
							{currentWeather.location.name} {currentWeather.current.temp_f}
						</span>
					)}
				</Card.Body>
			</Card>
		</div>
	);
}

export default App;
