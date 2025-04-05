
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './cabinet.css';

const CabinetContainer = styled(Box)({
  width: '100%',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const DogTagContainer = styled(Box)({
  position: 'relative',
  width: 200,
  margin: '20px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: 'swing 3s infinite ease-in-out',
  '@keyframes swing': {
    '0%': { transform: 'rotate(2deg)' },
    '50%': { transform: 'rotate(-2deg)' },
    '100%': { transform: 'rotate(2deg)' },
  },
});

const DogTag = styled(Box)({
  width: 150,
  height: 100,
  background: 'linear-gradient(145deg, #d3d3d3, #a9a9a9)',
  borderRadius: 8,
  border: '2px solid #808080',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '10px',
  position: 'relative',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 5,
    left: -10,
    width: 10,
    height: 10,
    background: '#808080',
    borderRadius: '50%',
  },
});

const Chain = styled(Box)({
  position: 'absolute',
  top: -30,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 100,
  height: 30,
  background: 'transparent',
  border: '2px solid #c0c0c0',
  borderRadius: '50px',
  borderBottom: 'none',
  zIndex: -1,
});

const DogTagText = styled(Typography)({
  color: '#333',
  fontSize: 12,
  fontFamily: "'Courier New', monospace",
  fontWeight: 600,
  lineHeight: 1.2,
  textTransform: 'uppercase',
});

const Cabinet = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  if (!userData) {
    return (
      <CabinetContainer>
        <Typography variant="h6" color="textSecondary">
          Сначала зарегистрируйтесь!
        </Typography>
      </CabinetContainer>
    );
  }

  const formatDateToDogTag = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${ day } -${ month } -${ year } `;
  };

  const formattedDate = formatDateToDogTag(userData.birthDate);

  return (
    <CabinetContainer>
      <Typography variant="h4" gutterBottom>
        Ваш профиль
      </Typography>
      <DogTagContainer>
        <DogTag>
          <DogTagText>ID: {userData.id}</DogTagText>
          <DogTagText>{userData.username}</DogTagText>
          <DogTagText>{formattedDate}</DogTagText>
          <DogTagText>{userData.rank}</DogTagText>
          <DogTagText>PLAYER</DogTagText>
        </DogTag>
        <Chain />
      </DogTagContainer>
    </CabinetContainer>
  );
};

export default Cabinet;
