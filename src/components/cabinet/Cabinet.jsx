import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Добавляем Button из MUI
import { useNavigate } from 'react-router-dom'; // Добавляем useNavigate для редиректа
import './cabinet.css';

const CabinetContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffd700',
  padding: '0px', // Обычное состояние (без padding)

  [theme.breakpoints.down('sm')]: {
    padding: '10px', // Добавляем padding на мобильных
  },
}));

const ProfileBox = styled(Box)({
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
});

const InfoSection = styled(Box)({
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: 'rgba(42, 42, 42, 0.7)',
  borderLeft: '4px solid #ffd700',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(5px)',
    backgroundColor: 'rgba(42, 42, 42, 0.9)',
  },
});

const LogoutButton = styled(Button)({
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#ffd700',
  color: '#000',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#ffa500',
    transform: 'scale(1.05)',
  },
});

const Cabinet = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Для перенаправления

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData'); // Удаляем данные из localStorage
    setIsAuthenticated(false); // Обновляем состояние аутентификации
    navigate('/register'); // Перенаправляем на страницу регистрации
  };

  if (!userData) {
    return (
      <CabinetContainer>
        <Typography
          variant="h4"
          sx={{
            color: '#ffd700',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
            letterSpacing: '3px',
          }}
        >
          ⚠ ДОСТУП ЗАПРЕЩЕН ⚠
        </Typography>
      </CabinetContainer>
    );
  }

  const formatDateToDogTag = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}◆${month}◆${year}`;
  };

  const formattedDate = formatDateToDogTag(userData.birthDate);

  return (
    <CabinetContainer>
      <Typography
        variant="h3"
        sx={{
          color: '#ffd700',
          marginBottom: '40px',
          textTransform: 'uppercase',
          letterSpacing: '5px',
          textShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
          fontWeight: 'bold',
        }}
      >
        Секретно
      </Typography>

      <ProfileBox className="profile-container">
        <InfoSection>
          <Typography className="service-number">
            ЛИЧНЫЙ НОМЕР: {userData.id}
          </Typography>
        </InfoSection>

        <InfoSection>
          <Typography className="rank-badge">
            {userData.rank || 'РЯДОВОЙ'}
          </Typography>
        </InfoSection>

        <InfoSection>
          <Typography sx={{ fontSize: '1.2rem', letterSpacing: '2px' }}>
            {userData.username}
          </Typography>
        </InfoSection>

        <InfoSection>
          <Typography className="military-date">{formattedDate}</Typography>
        </InfoSection>

        <InfoSection>
          <Typography
            sx={{
              color: '#ffd700',
              opacity: 0.8,
              fontStyle: 'italic',
              letterSpacing: '1px',
            }}
          >
            СТАТУС: АКТИВНЫЙ
          </Typography>
        </InfoSection>

        <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
      </ProfileBox>
    </CabinetContainer>
  );
};

export default Cabinet;