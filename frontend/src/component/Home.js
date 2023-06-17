import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import './table.css';

const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className='home_page'>
        <h1>This is home page</h1>
        <h1>Click down for redirect to table of contents</h1>
        <button
          className='btn'
          onClick={() => {
            navigate(`/table`);
          }}
        >
          <BsArrowRight />
        </button>
      </div>
    </>
  );
};

export default Home;
