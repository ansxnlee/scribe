import React, { Component } from 'react';
import PatientsService from './PatientsService';

const patientsService = new PatientsService();

class PatientsList extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    */
    state = {
        patients: [],
        nextPageURL: '',
    }

    componentDidMount() {
        // es6 method instead
        //patientsService.getPatient().then(patients => this.setState({ patients: patients.data, nextPageURL: patients.nextlink }));
        var self = this;
        patientsService.getPatients().then(function(result) {
            self.setState({ patients: result.data, nextPageURL: result.nextlink })
        });
    }

    handleDelete(e, pk) {
        var self = this;
        patientsService.deletePatient({pk : pk}).then(()=>{
            var newArr = self.state.patients.filter(function(obj) {
                return obj.pk !== pk;
            });
            self.setState({patients: newArr})
        });
    }

    nextPage(){
        var  self = this;
        patientsService.getPatientsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ patients: result.data, nextPageURL: result.nextlink})
        });
    }

    render() {
        return (
        <div className="patients--list">
            <table className="table">
                <thead key="thead">
                <tr>
                    <th>id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.patients.map( c =>
                    <tr key={c.pk}>
                        <td>{c.pk}</td>
                        <td>{c.first_name}</td>
                        <td>{c.last_name}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>{c.address}</td>
                        <td>{c.description}</td>
                        <td>
                        <button onClick={(e)=> this.handleDelete(e, c.pk)}>Delete</button>
                        <a href={"/patient/" + c.pk}>Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  { this.nextPage }>Next</button>
        </div>
        );
    }
}

export default PatientsList;
