// import logo from "./logo.svg";
// import "./App.css";
import { useState, useEffect } from "react";

console.log(process.env.REACT_APP_WEATHERAPI_KEY);

function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log(`Button has been incremented ${count} times`);
	});

	return (
		<div className="App">
			<p>Test React Hooks</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
			<p>{count}</p>
		</div>
	);
}

export default App;
