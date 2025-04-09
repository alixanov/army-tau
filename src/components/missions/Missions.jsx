import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Импорт иконок для наград (замените на свои пути)
import qToken from "../../assets/1.png";
import wToken from "../../assets/2.png";
import eToken from "../../assets/3.png";

import rToken from "../../assets/4.png";

import tToken from "../../assets/5.png";

import yToken from "../../assets/6.png";

import uToken from "../../assets/7.png";

import iToken from "../../assets/8.png";

import oToken from "../../assets/9.png";

import pToken from "../../assets/10.png";






// Данные уровней боевого пропуска
const battlePassLevels = [
  { level: 1, reward: '50 Tokens', type: 'token', icon: qToken },
  { level: 2, reward: 'Meme Sniper Rank', type: 'rank', icon: wToken },
  { level: 3, reward: '100 Tokens', type: 'token', icon: eToken },
  { level: 4, reward: 'Camo Skin', type: 'cosmetic', icon: rToken },
  { level: 5, reward: '200 Tokens', type: 'token', icon: tToken },
  { level: 6, reward: 'Shill Sergeant Rank', type: 'rank', icon: yToken },
  { level: 7, reward: 'Elite Badge', type: 'cosmetic', icon: uToken },
  { level: 8, reward: '300 Tokens', type: 'token', icon: iToken },
  { level: 9, reward: 'Trench General Rank', type: 'rank', icon: oToken },
  { level: 10, reward: 'Legendary Helmet', type: 'cosmetic', icon: pToken },
];

// Цветовая палитра
const colors = {
  bg: '#0D0D0D',
  accent: '#FF4500',
  secondary: '#FFD700',
  cardBg: '#1A1A1A',
  white: '#F5F5F5',
};

// Стили для контейнера
const BattlePassContainer = styled(Box)({
  padding: '20px',
  minHeight: '100vh',
  color: colors.white,
  fontFamily: "'Orbitron', sans-serif",
  position: 'relative',
  overflow: 'hidden',
});

// Стили для заголовка
const PassTitle = styled(Typography)({
  fontSize: '40px',
  fontWeight: 700,
  color: colors.accent,
  textAlign: 'center',
  marginBottom: '10px',
  textShadow: `0 0 10px ${colors.accent}80`,
});

// Стили для подзаголовка (сезон и дата)
const SeasonInfo = styled(Typography)({
  fontSize: '18px',
  color: colors.secondary,
  textAlign: 'center',
  marginBottom: '30px',
});

// Стили для прогресс-бара сезона
const SeasonProgress = styled(LinearProgress)({
  width: '82%',
  height: '12px',
  borderRadius: '6px',
  margin: '20px auto',
  backgroundColor: `${colors.cardBg}80`,
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, ${colors.accent}, ${colors.secondary})`,
    boxShadow: `0 0 10px ${colors.accent}`,
  },
});

// Стили для списка уровней
const LevelsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '0 20px',
  maxWidth: '1000px',
  margin: '0 auto',
});

// Стили для карточки уровня
const LevelCard = styled(Card)({
  backgroundColor: colors.cardBg,
  border: `2px solid ${colors.accent}50`,
  borderRadius: '10px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 0 15px ${colors.accent}80`,
    borderColor: colors.accent,
    '& img': {
      transform: 'scale(1.2) rotate(5deg)',
      filter: 'brightness(1.5)',
    },
  },
});

// Стили для кнопки
const ClaimButton = styled(Button)({
  background: `linear-gradient(45deg, ${colors.accent}, ${colors.secondary})`,
  color: colors.white,
  fontFamily: "'Orbitron', sans-serif",
  fontWeight: 600,
  padding: '6px 12px',
  borderRadius: '6px',
  boxShadow: `0 0 8px ${colors.accent}50`,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 0 12px ${colors.accent}80`,
    background: `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})`,
  },
  '&:disabled': {
    background: colors.cardBg,
    color: colors.white,
    opacity: 0.5,
    boxShadow: 'none',
  },
});

// Декоративный фон
const NeonLines = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(45deg, transparent 0%, ${colors.accent}10 50%, transparent 100%)`,
  opacity: 0.3,
  zIndex: 0,
  pointerEvents: 'none',
});

const BattlePass = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [claimedRewards, setClaimedRewards] = useState([]);

  // Логика сезона с датой
  const seasonStart = new Date('2025-04-01');
  const seasonEnd = new Date('2025-06-30');
  const today = new Date();
  const totalDays = (seasonEnd - seasonStart) / (1000 * 60 * 60 * 24);
  const daysPassed = (today - seasonStart) / (1000 * 60 * 60 * 24);
  const seasonProgress = Math.min((daysPassed / totalDays) * 100, 100);

  // Симуляция прогресса игрока
  useEffect(() => {
    const simulateProgress = () => {
      const progress = Math.floor((daysPassed / totalDays) * battlePassLevels.length);
      setCurrentLevel(Math.min(progress, battlePassLevels.length - 1));
    };
    simulateProgress();
  }, []);

  const handleClaimReward = (level) => {
    if (!claimedRewards.includes(level) && currentLevel >= level) {
      setClaimedRewards([...claimedRewards, level]);
      console.log(`Reward claimed for level ${level + 1}: ${battlePassLevels[level].reward}`);
    }
  };

  return (
    <BattlePassContainer className="battlepass__container">
      <NeonLines />
      <PassTitle>SEASON 1: CRYPTO WARS</PassTitle>
      <SeasonInfo>
        Ends on {seasonEnd.toLocaleDateString()} | {Math.ceil(totalDays - daysPassed)} days left
      </SeasonInfo>
      <SeasonProgress variant="determinate" value={seasonProgress} />
      <LevelsList>
        {battlePassLevels.map((levelData, index) => (
          <LevelCard key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img
                src={levelData.icon}
                alt={`${levelData.reward}-icon`}
                style={{
                  width: '40px',
                  height: '40px',
                  transition: 'transform 0.3s ease, filter 0.3s ease',
                }}
              />
              <Box>
                <Typography sx={{ color: colors.secondary, fontSize: '18px', fontWeight: 600 }}>
                  Level {index + 1}
                </Typography>
                <Typography sx={{ color: colors.white, fontSize: '14px' }}>
                  {levelData.reward}
                </Typography>
              </Box>
            </Box>
            <ClaimButton
              disabled={claimedRewards.includes(index) || currentLevel < index}
              onClick={() => handleClaimReward(index)}
            >
              {claimedRewards.includes(index) ? 'CLAIMED' : currentLevel >= index ? 'CLAIM' : 'LOCKED'}
            </ClaimButton>
          </LevelCard>
        ))}
      </LevelsList>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        .battlepass__container {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </BattlePassContainer>
  );
};

export default BattlePass;