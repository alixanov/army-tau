import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Импорт изображений
// Импорт всех изображений
import machine1 from "../../assets/icons8-пулемет-mg-08-48.png";
import machine2 from "../../assets/icons8-пистолет-100.png";
import machine3 from "../../assets/icons8-gun-48.png";
import machine4 from "../../assets/icons8-атомная-бомба-48 (1).png";
import machine5 from "../../assets/icons8-атомная-бомба-32.png";
import machine6 from "../../assets/icons8-атомная-бомба-48.png";
import machine7 from "../../assets/icons8-штурмовой-автомат-94.png";
import machine8 from "../../assets/icons8-ак-47-48.png";
import machine9 from "../../assets/icons8-army-64.png";
import machine10 from "../../assets/icons8-звезда-армии-96.png";

// Список рангов
const ranks = [
  'Meme Sniper', 'Bag Holder', 'Shill Sergeant', 'Token Scout', 'Airdrop Operator',
  'Rug Survivor', 'Bullrun Believer', 'Market Medic', 'Cap Captain', 'Liquidity Leaker',
  'Chart Whisperer', 'Volume Viking', 'Trench General', 'Degen Trooper', 'FUD Resistor'
];

// Военная цветовая палитра
const colors = {
  armyGreen: '#4B5320',
  camouflage: '#78866B',
  khaki: '#BDB76B',
  black: '#1A1A1A',
  militaryGray: '#5A5A5A',
  accent: '#8B0000',
  white: '#F5F5F5',
};

// Стили для контейнера
const RanksContainer = styled(Box)({
  padding: '20px',
  backgroundSize: '200px 200px',
  minHeight: '100vh',
  color: colors.white,
  fontFamily: "'Rajdhani', sans-serif",
  position: 'relative',
  overflow: 'hidden',
});

// Стили для заголовка
const RanksTitle = styled(Typography)({
  fontSize: '36px',
  fontFamily: "'Stencil', sans-serif",
  color: colors.khaki,
  textAlign: 'center',
  marginBottom: '30px',
  textShadow: `2px 2px 4px ${colors.black}`,
});

// Стили для списка рангов
const RanksList = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  padding: '0 20px',
});

// Стили для карточки ранга
const RankCard = styled(Box)({
  background: `linear-gradient(135deg, ${colors.militaryGray} 0%, ${colors.black} 100%)`,
  border: `2px solid ${colors.armyGreen}`,
  borderRadius: '8px',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 15px ${colors.accent}`,
  },
});

// Стили для названия ранга
const RankName = styled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  color: colors.khaki,
  textAlign: 'center',
  margin: '10px 0',
});

// Стили для кнопки покупки
const BuyButton = styled(Button)({
  backgroundColor: colors.accent,
  color: colors.white,
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#A52A2A',
  },
  '&:disabled': {
    backgroundColor: colors.militaryGray,
    color: colors.white,
    opacity: 0.6,
  },
});

// Декоративный фон с линиями
const RadarLines = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
  opacity: 0.2,
  zIndex: 0,
  pointerEvents: 'none',
});

const Ranks = () => {
  const [ownedRanks, setOwnedRanks] = useState([]); // Состояние для купленных рангов (заглушка)

  // Функция покупки (заглушка)
  const handleBuyRank = (rank) => {
    if (!ownedRanks.includes(rank)) {
      setOwnedRanks([...ownedRanks, rank]);
      console.log(`Куплен ранг: ${rank}`); // Здесь можно добавить реальную логику покупки
    }
  };

  // Соответствие рангов и иконок
  const rankIcons = [
    machine1, machine2, machine3, machine4, machine5,
    machine6, machine7, machine8, machine9, machine10,
    machine1, machine2, machine3, machine4, machine5 // Повторяем для оставшихся рангов
  ];

  return (
    <RanksContainer className="ranks__container">
      <RadarLines />
      <RanksTitle>ARMY RANKS</RanksTitle>
      <RanksList>
        {ranks.map((rank, index) => (
          <RankCard key={index}>
            <img
              src={rankIcons[index]}
              alt={`${rank}-icon`}
              style={{ width: '48px', height: '48px', filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))' }}
            />
            <RankName>{rank}</RankName>
            <BuyButton
              onClick={() => handleBuyRank(rank)}
              disabled={ownedRanks.includes(rank)}
            >
              {ownedRanks.includes(rank) ? 'OWNED' : 'BUY'}
            </BuyButton>
          </RankCard>
        ))}
      </RanksList>

      {/* Глобальные стили */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Stencil&display=swap');

        .ranks__container {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </RanksContainer>
  );
};

export default Ranks;