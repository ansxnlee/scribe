import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import PatientsList from './PatientsListFn';
import PatientCreateUpdate from './PatientCreateUpdateFn'
import './App.css';

const BaseLayout = () => (
  <div  className="container-fluid">
    <nav  className="navbar navbar-expand-lg navbar-light bg-light">
      <a  className="navbar-brand"  href="/">Scribe Demo</a>
      <button className="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarNavAltMarkup" 
              aria-controls="navbarNavAltMarkup" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
        <span  className="navbar-toggler-icon"></span>
      </button>
      <div  className="collapse navbar-collapse"  id="navbarNavAltMarkup">
        <div  className="navbar-nav">
          <a className="nav-item nav-link" href="/">Patients</a>
          <a className="nav-item nav-link" href="/patient">Create Patient</a>
        </div>
      </div>
    </nav>
    <div  className="content">
      <Routes>
        <Route path="/" exact element={<PatientsList />}></Route>
        <Route path={"/patient/:pk"} element={<PatientCreateUpdate />}></Route>
        <Route path={"/patient/"} exact element={<PatientCreateUpdate />}></Route>
      </Routes>
    </div>
  </div>
)

class App extends Component {
  render() {
      return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
      );
  }
}

export default App;
