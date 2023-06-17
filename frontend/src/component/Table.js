import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './table.css';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [user, setUser] = useState([]);
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getUserdata = async () => {
      const reqData = await fetch('http://localhost:8081/users');
      const resData = await reqData.json();
      setUser(resData.users);
      console.log(resData);
    };
    getUserdata();
  }, []);
  // get the current users
  const indexOfLastPost = currentPage * rowsPerPage;
  // console.log(indexOfLastPost)
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  // console.log(indexOfFirstPost)
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteUser = (id) => {
    setUser(user.filter((user) => user._id !== id));
    axios
      .delete(`http://localhost:8081/users/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleClickCourse() {
    navigate('/course');
  }
  function handleEdit(id) {
    navigate(`/editUser/${id}`);
  }

  return (
    <>
      <Box sx={{ '& button': { m: 1 } }}>
        <div className='box'>
          {' '}
          <p style={{ color: '#f87e0d' }}>PLSE COURSE</p>
          <Button variant='contained' size='medium' onClick={handleClickCourse}>
            Add PSLE Course
          </Button>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Class level</StyledTableCell>
              <StyledTableCell>Pricing</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((row, index) => (
              <StyledTableRow>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>{row.class_level}</StyledTableCell>
                <StyledTableCell>{row.pricing}</StyledTableCell>
                <StyledTableCell onClick={() => handleEdit(row._id)}>
                  <FiEdit cursor='pointer' />
                </StyledTableCell>
                <StyledTableCell
                  key={row.id}
                  deleteUser={deleteUser}
                  user={row}
                  onClick={() => {
                    deleteUser(row._id);
                  }}
                >
                  <RiDeleteBin5Line cursor='pointer' />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        paginate={paginate}
      />
    </>
  );
}
