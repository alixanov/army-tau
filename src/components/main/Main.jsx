import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const MainContainer = styled('div')(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {},
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: 8,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 6,
  },
}));

const StyledTable = styled(Table)({
  '& .MuiTableCell-root': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '12px',
    fontFamily: "'Roboto', sans-serif",
  },
});

const StyledTableHeadCell = styled(TableCell)({
  backgroundColor: '#000000',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: 14,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  color: '#000000',
  fontSize: 14,
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
    padding: '8px',
  },
}));

// Функция форматирования даты (такая же, как в Cabinet)
const formatDateToDogTag = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}◆${month}◆${year}`;
};

const Main = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <MainContainer>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: '#000000',
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Список пользователей
      </Typography>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Имя</StyledTableHeadCell>
              <StyledTableHeadCell>Дата рождения</StyledTableHeadCell>
              <StyledTableHeadCell>Звание</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' } }}>
                <StyledTableBodyCell>{user.id}</StyledTableBodyCell>
                <StyledTableBodyCell>{user.username}</StyledTableBodyCell>
                <StyledTableBodyCell>{formatDateToDogTag(user.birthDate)}</StyledTableBodyCell>
                <StyledTableBodyCell>{user.rank}</StyledTableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </MainContainer>
  );
};

export default Main;