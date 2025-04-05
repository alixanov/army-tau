import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Функция для генерации случайного ID (буквы + цифры)
const generateUserId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 4-значное число
  return `${randomLetter}${randomNumbers}`;
};

// Функция для случайного звания
const generateRandomRank = () => {
  const ranks = ['Новичок', 'Любитель', 'Профи', 'Мастер', 'Легенда'];
  return ranks[Math.floor(Math.random() * ranks.length)];
};

// Стилизованные компоненты
const RegisterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  marginTop: 70,
  padding: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
  },
}));

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

const FormGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 6,
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.2)', // Обычная граница
    },
    '&:hover fieldset': {
      borderColor: '#000000', // Черный при ховере
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000', // Черный при фокусе
    },
  },
  '& .MuiInputBase-input': {
    color: '#000000',
    fontFamily: "'Roboto', sans-serif",
  },
  '& .MuiInputLabel-root': {
    color: '#000000 !important', // Метка всегда черная
    fontFamily: "'Roboto', sans-serif",
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#000000 !important', // Метка при фокусе черная
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: '#000000 !important', // Метка при ошибке черная
  },
});

const SubmitButton = styled(Button)({
  padding: '12px',
  backgroundColor: '#000000',
  color: '#ffffff',
  borderRadius: 6,
  fontSize: 16,
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: 'scale(1.02)',
  },
});

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    birthDate: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: generateUserId(),
      rank: generateRandomRank(),
    };

    localStorage.setItem('userData', JSON.stringify(newUser));
    setIsAuthenticated(true);
    navigate('/cabinet');
  };

  return (
    <RegisterContainer>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 3, fontWeight: 600, color: '#000000', fontFamily: "'Roboto', sans-serif" }}
      >
        Регистрация
      </Typography>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <StyledTextField
            variant="outlined"
            id="username"
            name="username"
            label="Имя пользователя"
            value={formData.username}
            onChange={handleChange}
            placeholder="Введите имя пользователя"
            required
            fullWidth
          />
        </FormGroup>
        <FormGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Дата рождения"
              value={formData.birthDate}
              onChange={handleDateChange}
              renderInput={(params) => <StyledTextField {...params} fullWidth />}
              required
              slotProps={{
                textField: {
                  sx: {
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000000', // Черный при фокусе
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000000 !important', // Метка всегда черная
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#000000 !important', // Метка при фокусе черная
                    },
                  },
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                    },
                    '& .MuiPickersDay-root': {
                      color: '#000000',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Черный ховер
                      },
                    },
                    '& .MuiPickersDay-root.Mui-selected': {
                      backgroundColor: '#000000', // Черный при выборе
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#333333', // Темно-серый при ховере на выбранный
                      },
                    },
                    '& .MuiIconButton-root': {
                      color: '#000000', // Иконки черные
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      },
                    },
                    '& .MuiPickersDay-today': {
                      border: '1px solid #000000', // Сегодняшний день с черной границей
                      backgroundColor: 'transparent',
                      color: '#000000',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      },
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </FormGroup>
        <SubmitButton type="submit">Зарегистрироваться</SubmitButton>
      </Form>
    </RegisterContainer>
  );
};

export default Register;