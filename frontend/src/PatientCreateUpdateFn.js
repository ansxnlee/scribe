import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PatientsService from './PatientsService';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const patientsService = new PatientsService();

function PatientCreateUpdate() {
    const params = useParams();
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        firstNameRef.current.focus();
        lastNameRef.current.focus();
        phoneRef.current.focus();
        emailRef.current.focus();
        addressRef.current.focus();
        descriptionRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        // doesnt cross ref backend DB but only URL
        // messing with the url might lead to errors on backend
        if(params.pk) {
            handleUpdate();
        } else {
            handleCreate();
        }
    }

    const handleUpdate = () => {
        patientsService.updatePatient( {
            "pk": params.pk,
            "first_name": firstNameRef.current.value,
            "last_name": lastNameRef.current.value,
            "email": emailRef.current.value,
            "phone": phoneRef.current.value,
            "address": addressRef.current.value,
            "description": descriptionRef.current.value
        }).then(()=> {
            alert("Patient updated!");
        }).catch(()=> {
            alert('There was an error! Please re-check your form.');
        });
    }

    const handleCreate = () => {
        patientsService.createPatient( {
            "first_name": firstNameRef.current.value,
            "last_name": lastNameRef.current.value,
            "email": emailRef.current.value,
            "phone": phoneRef.current.value,
            "address": addressRef.current.value,
            "description": descriptionRef.current.value
        }).then(() => {
            alert("Patient created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    return (
        <>
        <Stack 
            spacing={4} 
            sx={{ m:2 }}
            direction="row" 
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
        >
            <TextField
                required
                id="outlined-firstName-text"
                label="First Name"
                inputRef={firstNameRef}
            />
            <TextField
                required
                id="outlined-lastName-text"
                label="Last Name"
                inputRef={lastNameRef}
            />
            <TextField
                required
                id="outlined-phone-text"
                label="Phone Number"
                helperText="xxx xxx xxxx"
                inputRef={phoneRef}
            />
            <TextField
                required
                id="outlined-email-text"
                label="Email"
                helperText="example@email.com"
                inputRef={emailRef}
            />
            <TextField
                id="outlined-address-text"
                label="Address"
                inputRef={addressRef}
            />
        </Stack>
        <Stack spacing={2} sx={{ m:2 }}>
            <TextField
                multiline
                rows={4}
                id="outlined-description-text"
                label="Description"
                inputRef={descriptionRef}
            />
        </Stack>
        <Stack spacing={2} direction="row" justifyContent="center" sx={{ m:2 }}>
            <Button variant="contained" size="large" onClick={handleSubmit}>Submit</Button>
        </Stack>
        </>
    );
};

export default PatientCreateUpdate;