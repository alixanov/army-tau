import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Определение анимации для появления текста
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Цветовая палитра
const colors = {
  primary: '#1C2526', // Темный фон
  accent: '#A32929', // Акцентный красный
  textLight: '#EDEDED', // Светлый текст
};

// Стилизованный контейнер
const TargetContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  // backgroundColor: colors.primary,
  padding: '20px',
  textAlign: 'center',
  animation: `${fadeIn} 1s ease-out`, // Анимация появления контейнера
});

// Стили для заголовка
const StyledHeading = styled(Typography)({
  color: colors.accent,
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: '16px',
  animation: `${fadeIn} 1.2s ease-out`,
  animationDelay: '0.2s',
  opacity: 0,
  animationFillMode: 'forwards', // Сохраняет конечное состояние анимации
});

// Стили для параграфа
const StyledParagraph = styled(Typography)({
  color: colors.textLight,
  fontSize: '1.2rem',
  maxWidth: '600px',
  lineHeight: 1.6,
  animation: `${fadeIn} 1.4s ease-out`,
  animationDelay: '0.4s',
  opacity: 0,
  animationFillMode: 'forwards',
});

const Target = () => {
  return (
    <TargetContainer className="target__container">
      <StyledHeading variant="h1">Coming Soon</StyledHeading>
      <StyledParagraph variant="body1">
        This page is currently under development and will be available soon.
      </StyledParagraph>
    </TargetContainer>
  );
};

export default Target;