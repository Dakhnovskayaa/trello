import React, { Component } from 'react';
import './App.css';
import Boards from './components/boards';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import CurrentBoard from './components/currentBoard';
import Drag from './components/dragENDdrop';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<button>
						<Link className="button-home" to="/">
							Home
						</Link>
					</button>
					<Switch>
						<Route exact path="/" component={Boards} />
						<Route exact path="/board/:id/:name" component={CurrentBoard} />
						<Route exact path="/drag" component={Drag} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
