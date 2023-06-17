import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './table.css';

function Course() {
  const [title, setTitle] = useState('');
  const [class_level, setClass_level] = useState('');
  const [pricing, setPricing] = useState('');
  const [mode, setMode] = useState('');
  const [description, setDescription] = useState('');
  const [submit, setSubmit] = useState('');
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!title || !class_level || !pricing || !mode || !description) {
      setFlag(true);
    } else {
      setFlag(false);
      setSubmit(!submit);
    }

    const newUser = {
      title,
      class_level,
      pricing,
      mode,
      description,
    };

    axios
      .post('http://localhost:8081/users/add', newUser)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate('/table');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '20ch' },
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleFormSubmit}
      >
        <h1>ADD PSLE COURSE</h1>

        <div>
          <TextField
            style={{ width: '390px' }}
            required
            id='outlined-error'
            label='Title'
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            style={{ width: '390px' }}
            required
            id='outlined-required-helper-text'
            label='Mode of Learning'
            onChange={(event) => setMode(event.target.value)}
          />
          <p style={{ marginLeft: '7rem' }}>Class Time</p>
        </div>
        <div>
          <TextField
            style={{ width: '390px' }}
            required
            id='outlined-error'
            label='Class Level'
            onChange={(event) => setClass_level(event.target.value)}
          />

          <TextField
            style={{ width: '390px' }}
            type='time'
            required
            id='outlined-required'
            label='From-To'
            onChange={(event) => setClass_level(event.target.value)}
          />
        </div>
        <div className='from_group'>
          <div>
            <TextField
              style={{ width: '390px' }}
              required
              id='filled-required'
              label='Pricing'
              onChange={(event) => setPricing(event.target.value)}
            />
            <p>Class Duration</p>
            <div>
              <TextField
                style={{ width: '390px' }}
                type='Month'
                required
                id='outlined-error'
                label='From'
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div>
              <TextField
                style={{ width: '390px' }}
                required
                type='Month'
                id='outlined-required-helper-text'
                label='To'
                onChange={(event) => setClass_level(event.target.value)}
              />
            </div>
          </div>
          <TextField
            style={{ width: '390px' }}
            InputProps={{ sx: { height: 250 } }}
            required
            id='outlined-error'
            label='Brief Description'
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <Button
          style={{ width: '140px' }}
          variant='contained'
          color='warning'
          type='submit'
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

export default Course;
