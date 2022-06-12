import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import moment from "moment";
import bgImage from "../images/sunny.jpg";
import { useWeather } from "./hooks";

function App() {
	const weather = useWeather();
	const pexelUrl = null;

	return (
		<div
			id="App"
			className="vertical-centered-container"
			style={{
				backgroundImage: `url(${pexelUrl ? pexelUrl : bgImage})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			}}>
			{weather && (
				<ListGroup className="rwListGroup">
					<ListGroupItem>
						<Row>
							<Col>
								<h3>{weather.location.name}</h3>
							</Col>
							<Col>
								<Image src={weather.current.condition.icon}></Image>
								<h3 style={{ display: "inline" }}>{weather.current.temp_f}</h3>
							</Col>
						</Row>
						<Row>
							<Col>Wind: {weather.current.wind_mph} mph</Col>
							<Col>Humidity: {weather.current.humidity}%</Col>
						</Row>
					</ListGroupItem>
					<ListGroupItem>
						<CardGroup>
							{weather.forecast.forecastday.map((forecast) => {
								const date = moment(forecast.date);

								let day;
								if (moment().isSame(date, "day")) {
									day = "Today";
								} else {
									day = date.format("dddd");
								}

								return (
									<Card key={forecast.date}>
										{/* <Card.Img variant="top" src={forecast.day.condition.icon} /> */}
										<Card.Body>
											<h6>{day}</h6>
											<Row>
												<Col>
													<Image src={forecast.day.condition.icon}></Image>
												</Col>
												<Col>Hi: {forecast.day.maxtemp_f}</Col>
												<Col>Lo: {forecast.day.mintemp_f}</Col>
											</Row>
										</Card.Body>
									</Card>
								);
							})}
						</CardGroup>
					</ListGroupItem>
				</ListGroup>
			)}
		</div>
	);
}

export default App;
