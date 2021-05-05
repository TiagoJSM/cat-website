import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import UploadImage from './components/UploadImage/UploadImage';
import Home from './components/Home/Home';
import { Navbar, Nav } from 'react-bootstrap';

import Logo from './Logo.png'

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="#home">
        <img src={Logo} className="navbar-logo" alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navigation />
        </header>
        <main className="App-content">
          <Switch>
            <Route path="/upload">
              <UploadImage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
