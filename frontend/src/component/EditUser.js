import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './table.css';

function EditUser() {
  const [title, setTitle] = useState('');
  const [class_level, setClass_level] = useState('');
  const [pricing, setPricing] = useState('');
  const [mode, setMode] = useState('');
  const [description, setDescription] = useState('');
  const [submit, setSubmit] = useState('');
  const [flag, setFlag] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    const getUser = async () => {
      const reqData = await fetch(`http://localhost:8081/users/${id}`);
      const resData = await reqData.json();
      const data = resData.user;

      setTitle(data.title);
      setClass_level(data.class_level);
      setPricing(data.pricing);
      setMode(data.mode);
      setDescription(data.description);
    };
    getUser();
  }, []);

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
      .put(`http://localhost:8081/users/${id}`, newUser)
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
        <h1>EDIT PSLE COURSE</h1>

        <div>
          <TextField
            style={{ width: '390px' }}
            required
            id='outlined-error'
            label='Title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            style={{ width: '390px' }}
            required
            id='outlined-required-helper-text'
            label='Mode of Learning'
            value={mode}
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
            value={class_level}
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
              value={pricing}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <Button
          style={{ width: '140px' }}
          variant='contained'
          color='warning'
          type='submit'
        >
          Update
        </Button>
      </Box>
    </>
  );
}

export default EditUser;
