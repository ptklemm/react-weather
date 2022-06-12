// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useWeather } from "./hooks";

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
