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

// Новые ранги с ценой и описанием
const ranksData = [
  { name: 'Recon Scout', price: 50, description: 'Мастер разведки, первый на поле боя. Открывает скрытые возможности.' },
  { name: 'Grenadier', price: 75, description: 'Специалист по взрывчатке, наносит хаос врагам.' },
  { name: 'Field Medic', price: 100, description: 'Спасает союзников в гуще сражения.' },
  { name: 'Sniper Elite', price: 150, description: 'Меткий стрелок, устраняет цели с расстояния.' },
  { name: 'Armored Titan', price: 200, description: 'Живая крепость, выдерживает любой удар.' },
  { name: 'Saboteur', price: 250, description: 'Мастер диверсий, подрывает планы врагов.' },
  { name: 'War Engineer', price: 300, description: 'Гениальный изобретатель боевых машин.' },
  { name: 'Commando', price: 400, description: 'Элитный боец для спецопераций.' },
  { name: 'Battle Captain', price: 500, description: 'Тактик и лидер, вдохновляет войска.' },
  { name: 'General of Chaos', price: 1000, description: 'Владыка поля боя, непревзойденный стратег.' },
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
  cursor: 'pointer',
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

// Стили для кнопки
const ActionButton = styled(Button)({
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

// Стили для модального окна
const ModalCard = styled(Card)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  background: `linear-gradient(135deg, ${colors.militaryGray} 0%, ${colors.black} 100%)`,
  border: `2px solid ${colors.armyGreen}`,
  borderRadius: '8px',
  padding: '20px',
  color: colors.white,
  fontFamily: "'Rajdhani', sans-serif",
  boxShadow: `0 0 20px ${colors.accent}`,
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
  const [ownedRanks, setOwnedRanks] = useState([]); // Купленные ранги
  const [selectedRank, setSelectedRank] = useState(null); // Выбранный ранг для модального окна
  const [openModal, setOpenModal] = useState(false); // Состояние модального окна

  const rankIcons = [
    machine1, machine2, machine3, machine4, machine5,
    machine6, machine7, machine8, machine9, machine10,
  ];

  // Открытие модального окна
  const handleOpenModal = (rank) => {
    setSelectedRank(rank);
    setOpenModal(true);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRank(null);
  };

  // Покупка ранга
  const handleBuyRank = (rankName) => {
    if (!ownedRanks.includes(rankName)) {
      setOwnedRanks([...ownedRanks, rankName]);
      console.log(`Куплен ранг: ${rankName}`); // Здесь можно добавить реальную логику
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
              style={{ width: '48px', height: '48px', filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))' }}
            />
            <RankName>{rank.name}</RankName>
            <Typography sx={{ color: colors.khaki, fontSize: '14px' }}>
              {rank.price} Tokens
            </Typography>
            <ActionButton
              disabled={ownedRanks.includes(rank.name)}
            >
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
                    style={{ width: '64px', height: '64px', filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))' }}
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