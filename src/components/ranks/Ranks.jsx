import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Импорт изображений
import machine1 from "../../assets/icons8-gun-48.png";
import machine2 from "../../assets/icons8-ак-47-48 (2).png";
import machine3 from "../../assets/icons8-ак-47-48.png";
import machine4 from "../../assets/icons8-атомная-бомба-32.png";
import machine5 from "../../assets/icons8-атомная-бомба-48 (2).png";
import machine6 from "../../assets/icons8-атомная-бомба-48.png";
import machine7 from "../../assets/icons8-звезда-армии-96.png";
import machine8 from "../../assets/icons8-пулемет-mg-08-48.png";
import machine9 from "../../assets/icons8-пулемет-mg-08-48.png";
import machine10 from "../../assets/icons8-army-67.png";

// Обновленные ранги с ценой и описанием на английском
const ranksData = [
  { name: 'Meme Sniper', price: 50, description: 'A sharpshooter of memes, dominating the digital battlefield.' },
  { name: 'Bag Holder', price: 75, description: 'Holds the line, even when the market crashes.' },
  { name: 'Shill Sergeant', price: 100, description: 'Leads the charge in promoting the cause.' },
  { name: 'Token Scout', price: 150, description: 'Scouts the blockchain for hidden gems.' },
  { name: 'Airdrop Operator', price: 200, description: 'Masters the art of claiming free tokens.' },
  { name: 'Rug Survivor', price: 250, description: 'Survives scams and emerges stronger.' },
  { name: 'Bullrun Believer', price: 300, description: 'Keeps faith in the market’s rise.' },
  { name: 'Market Medic', price: 400, description: 'Heals portfolios in times of crisis.' },
  { name: 'Cap Captain', price: 500, description: 'Commands the market cap with authority.' },
  { name: 'Liquidity Leaker', price: 600, description: 'Controls the flow of liquid assets.' },
  { name: 'Chart Whisperer', price: 700, description: 'Reads the charts like an oracle.' },
  { name: 'Volume Viking', price: 800, description: 'Conquers the market with sheer volume.' },
  { name: 'Trench General', price: 900, description: 'Leads troops from the frontlines.' },
  { name: 'Degen Trooper', price: 1000, description: 'Fearless gambler of the crypto wars.' },
  { name: 'FUD Resistor', price: 1200, description: 'Stands firm against fear, uncertainty, and doubt.' },
];

// Цветовая палитра
const colors = {
  armyGreen: '#4B5320',
  camouflage: '#78866B',
  khaki: '#BDB76B',
  cardBg: '#1a1a1a', // Новый цвет для карточек и модала
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
  textShadow: `2px 2px 4px ${colors.cardBg}`,
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
  backgroundColor: colors.cardBg,
  border: `2px solid ${colors.armyGreen}`,
  borderRadius: '8px',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 20px ${colors.accent}80, inset 0 0 10px ${colors.accent}50`,
    borderColor: colors.accent,
    '& img': {
      transform: 'rotate(10deg) scale(1.1)', // Вращение и увеличение иконки при ховере
      filter: 'drop-shadow(0 0 8px rgba(139, 0, 0, 0.8))', // Усиленное свечение
    },
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

// Стили для кнопки
const ActionButton = styled(Button)({
  backgroundColor: colors.accent,
  color: colors.white,
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 600,
  padding: '8px 16px',
  marginTop:10,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#A52A2A',
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    backgroundColor: colors.cardBg,
    color: colors.white,
    opacity: 0.6,
  },
});

// Стили для модального окна
const ModalCard = styled(Card)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  backgroundColor: colors.cardBg,
  border: `2px solid ${colors.armyGreen}`,
  borderRadius: '8px',
  padding: '20px',
  color: colors.white,
  fontFamily: "'Rajdhani', sans-serif",
  boxShadow: `0 0 20px ${colors.accent}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: `0 0 30px ${colors.accent}cc`,
    transform: 'translate(-50%, -50%) scale(1.02)',
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
  const [ownedRanks, setOwnedRanks] = useState([]);
  const [selectedRank, setSelectedRank] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const rankIcons = [
    machine1, machine2, machine3, machine4, machine5,
    machine6, machine7, machine8, machine9, machine10,
  ];

  const handleOpenModal = (rank) => {
    setSelectedRank(rank);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRank(null);
  };

  const handleBuyRank = (rankName) => {
    if (!ownedRanks.includes(rankName)) {
      setOwnedRanks([...ownedRanks, rankName]);
      console.log(`Purchased rank: ${rankName}`);
      handleCloseModal();
    }
  };

  return (
    <RanksContainer className="ranks__container">
      <RadarLines />
      <RanksTitle>ARMY RANKS</RanksTitle>
      <RanksList>
        {ranksData.map((rank, index) => (
          <RankCard key={index} onClick={() => handleOpenModal(rank)}>
            <img
              src={rankIcons[index % rankIcons.length]}
              alt={`${rank.name}-icon`}
              style={{
                width: '48px',
                height: '48px',
                filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))',
                transition: 'transform 0.3s ease, filter 0.3s ease', // Плавный переход для иконки
              }}
            />
            <RankName>{rank.name}</RankName>
            <Typography sx={{ color: colors.khaki, fontSize: '14px' }}>
              {rank.price} Tokens
            </Typography>
            <ActionButton disabled={ownedRanks.includes(rank.name)}>
              {ownedRanks.includes(rank.name) ? 'OWNED' : 'DETAILS'}
            </ActionButton>
          </RankCard>
        ))}
      </RanksList>

      {/* Модальное окно */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalCard>
          <CardContent>
            {selectedRank && (
              <>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img
                    src={rankIcons[ranksData.findIndex(r => r.name === selectedRank.name) % rankIcons.length]}
                    alt={`${selectedRank.name}-icon`}
                    style={{
                      width: '64px',
                      height: '64px',
                      filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))',
                    }}
                  />
                  <Typography variant="h5" sx={{ color: colors.khaki, fontWeight: 700, mt: 2 }}>
                    {selectedRank.name}
                  </Typography>
                </Box>
                <Typography sx={{ color: colors.white, fontSize: '16px', mb: 2 }}>
                  {selectedRank.description}
                </Typography>
                <Typography sx={{ color: colors.khaki, fontSize: '18px', mb: 2 }}>
                  Price: {selectedRank.price} Tokens
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ActionButton onClick={handleCloseModal}>
                    CANCEL
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleBuyRank(selectedRank.name)}
                    disabled={ownedRanks.includes(selectedRank.name)}
                  >
                    {ownedRanks.includes(selectedRank.name) ? 'OWNED' : 'BUY NOW'}
                  </ActionButton>
                </Box>
              </>
            )}
          </CardContent>
        </ModalCard>
      </Modal>

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