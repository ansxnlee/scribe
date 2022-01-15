import React, { Component } from 'react';
import PatientsService from './PatientsService';

const patientsService = new PatientsService();

class PatientCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        // input element refs
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.phoneRef = React.createRef();
        this.emailRef = React.createRef();
        this.addressRef = React.createRef();
        this.descriptionRef = React.createRef();
    }

    componentDidMount(){
        //console.log("test object");
        //console.log(this.props.match.params.id);
        
        //console.log("match object");
        //console.log(params);
        console.log("props object");
        console.log(this.props);
        console.log("assignment object")
        this.match = this.props;
        console.log(this.match)

        //const { match: { params } } = this.props;
        // if(params && params.pk) {
        //     patientsService.getPatient(params.pk).then((c)=> {
        //         this.firstNameRef.current = c.first_name;
        //         this.lastNameRef.current = c.last_name;
        //         this.emailRef.current = c.email;
        //         this.phoneRef.current = c.phone;
        //         this.addressRef.current = c.address;
        //         this.descriptionRef.current = c.description;
        //     })
        // }
    }

    handleSubmit(event) {
        const { match: { params } } = this.props;
        if(params && params.pk) {
            this.handleUpdate(params.pk);
        } else {
            this.handleCreate();
        }
        event.preventDefault();
    }

    handleUpdate(pk){
        patientsService.updatePatient( {
            "pk": pk,
            "first_name": this.firstNameRef,
            "last_name": this.lastNameRef,
            "email": this.inputRef.emailRef,
            "phone": this.inputRef.phoneRef,
            "address": this.inputRef.addressRef,
            "description": this.inputRef.descriptionRef
            }).then((result)=> {
                alert("Patient updated!");
            }).catch(()=> {
                alert('There was an error! Please re-check your form.');
            });
        }

    handleCreate(){
        patientsService.createPatient( {
            "first_name": this.firstNameRef,
            "last_name": this.lastNameRef,
            "email": this.emailRef,
            "phone": this.phoneRef,
            "address": this.addressRef,
            "description": this.descriptionRef
            }).then((result)=> {
                    alert("Patient created!");
            }).catch(()=> {
                    alert('There was an error! Please re-check your form.');
            });
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label>First Name:</label>
            <input className="form-control" type="text" ref={this.firstNameRef} />

            <label>Last Name:</label>
            <input className="form-control" type="text" ref={this.lastNameRef}/>

            <label>Phone:</label>
            <input className="form-control" type="text" ref={this.phoneRef} />

            <label>Email:</label>
            <input className="form-control" type="text" ref={this.emailRef} />

            <label>Address:</label>
            <input className="form-control" type="text" ref={this.addressRef} />

            <label>Description:</label>
            <textarea className="form-control" ref={this.descriptionRef} ></textarea>

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
        </form>
        );
    }

}

export default PatientCreateUpdate;
