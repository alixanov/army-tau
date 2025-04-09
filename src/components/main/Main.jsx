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
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeIcon from '@mui/icons-material/Badge';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import TagIcon from '@mui/icons-material/Tag';
import EventIcon from '@mui/icons-material/Event';

// Army color scheme
const colors = {
  armyGreen: '#3D4A26',
  rowBackground: 'transparent',
  black: '#1C2526',
  khaki: '#D4A017',
  white: '#EDEDED',
  accent: '#A32929',
  hoverBackground: 'rgba(58, 70, 71, 0.3)',
};

// Styled components
const MainContainer = styled('div')(({ theme }) => ({
  width: '100%',
  margin: '70px auto',
  padding: '12px',
  [theme.breakpoints.down('sm')]: {
    margin: '20px auto',
    padding: '8px',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: 'transparent',
  border: `1px solid ${colors.armyGreen}`,
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 6,
  },
}));

const StyledTable = styled(Table)({
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${colors.armyGreen}50`,
    padding: '8px',
    fontFamily: "'Montserrat', sans-serif",
  },
});

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: colors.armyGreen,
  color: colors.white,
  fontWeight: 600,
  fontSize: 14,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  padding: '10px',
  borderRight: `1px solid ${colors.armyGreen}80`,
  '&:last-child': {
    borderRight: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
    padding: '8px',
  },
}));

const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  color: colors.white,
  fontSize: 14,
  backgroundColor: colors.rowBackground,
  borderRight: `1px solid ${colors.armyGreen}50`,
  '&:last-child': {
    borderRight: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
    padding: '6px',
  },
}));

const UserCard = styled(Card)(({ theme }) => ({
  backgroundColor: colors.rowBackground,
  color: colors.white,
  marginBottom: '16px',
  border: `1px solid ${colors.armyGreen}`,
  borderRadius: 6,
  transition: 'transform 0.2s ease, background-color 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: colors.hoverBackground,
    boxShadow: `0 6px 12px rgba(0, 0, 0, 0.5)`,
  },
}));

const CardHeader = styled(Box)({
  backgroundColor: colors.armyGreen,
  padding: '10px 16px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '6px 6px 0 0',
});

const CardRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
});

const IconWrapper = styled(Box)({
  color: colors.khaki,
  marginRight: '12px',
  display: 'flex',
  alignItems: 'center',
});

const LabelText = styled(Typography)({
  color: colors.khaki,
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

const ValueText = styled(Typography)({
  color: colors.white,
  fontSize: 14,
  fontWeight: 400,
});

const JoinButton = styled(Button)({
  backgroundColor: colors.accent,
  color: colors.white,
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '16px',
  padding: '10px 20px',
  borderRadius: '6px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'transform 0.2s ease, background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#B73232',
    transform: 'scale(1.05)',
  },
});

// Date formatting function
const formatDateToDogTag = (date) => {
  if (!date) return 'N/A';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error';
  }
};

// Static temporary data with fixed creation dates
const staticTempData = [
  { id: 'SOLDIER-0001', username: 'Trooper1', birthDate: '1990-05-15', creationDate: '2025-01-01T00:00:00Z', rank: 'Meme Sniper' },
  { id: 'SOLDIER-0002', username: 'Trooper2', birthDate: '1987-12-22', creationDate: '2025-01-02T00:00:00Z', rank: 'Bag Holder' },
  { id: 'SOLDIER-0003', username: 'Trooper3', birthDate: '1995-08-09', creationDate: '2025-01-03T00:00:00Z', rank: 'Shill Sergeant' },
  { id: 'SOLDIER-0004', username: 'Trooper4', birthDate: '1992-03-30', creationDate: '2025-01-04T00:00:00Z', rank: 'Token Scout' },
  { id: 'SOLDIER-0005', username: 'Trooper5', birthDate: '1985-11-11', creationDate: '2025-01-05T00:00:00Z', rank: 'Airdrop Operator' },
  { id: 'SOLDIER-0006', username: 'Trooper6', birthDate: '1998-07-07', creationDate: '2025-01-06T00:00:00Z', rank: 'Rug Survivor' },
  { id: 'SOLDIER-0007', username: 'Trooper7', birthDate: '1993-09-14', creationDate: '2025-01-07T00:00:00Z', rank: 'Bullrun Believer' },
  { id: 'SOLDIER-0008', username: 'Trooper8', birthDate: '1989-04-25', creationDate: '2025-01-08T00:00:00Z', rank: 'Market Medic' },
  { id: 'SOLDIER-0009', username: 'Trooper9', birthDate: '1996-01-18', creationDate: '2025-01-09T00:00:00Z', rank: 'Cap Captain' },
  { id: 'SOLDIER-0010', username: 'Trooper10', birthDate: '1991-06-03', creationDate: '2025-01-10T00:00:00Z', rank: 'Liquidity Leaker' },
];

const Main = () => {
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Проверка авторизации
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && parsedData.id) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Загрузка пользователей
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    console.log('Stored users from localStorage:', storedUsers);

    if (storedUsers && storedUsers.length > 0) {
      // Используем данные из localStorage без перезаписи creationDate
      setUsers(storedUsers);
    } else {
      // Если данных в localStorage нет, используем staticTempData и сохраняем их
      console.log('Using staticTempData:', staticTempData);
      localStorage.setItem('users', JSON.stringify(staticTempData));
      setUsers(staticTempData);
    }
  }, []);

  // Обработчик нажатия на кнопку
  const handleJoinClick = () => {
    if (isAuthenticated) {
      navigate('/cabinet');
    } else {
      navigate('/register');
    }
  };

  const MobileUserList = () => (
    <Box sx={{ mt: 2 }}>
      {users.length === 0 ? (
        <Typography sx={{ color: colors.white, textAlign: 'center' }}>No users available</Typography>
      ) : (
        users.map((user, index) => (
          <UserCard key={index}>
            <CardHeader>
              <FingerprintIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="subtitle1" fontWeight={600}>
                ID: {user.id}
              </Typography>
            </CardHeader>
            <CardContent>
              <CardRow>
                <IconWrapper>
                  <TagIcon fontSize="small" />
                </IconWrapper>
                <Box>
                  <LabelText>Serial Number</LabelText>
                  <ValueText>#{index + 1}</ValueText>
                </Box>
              </CardRow>
              <Divider sx={{ my: 1, borderColor: `${colors.armyGreen}50` }} />
              <CardRow>
                <IconWrapper>
                  <PersonIcon fontSize="small" />
                </IconWrapper>
                <Box>
                  <LabelText>Username</LabelText>
                  <ValueText>{user.username}</ValueText>
                </Box>
              </CardRow>
              <Divider sx={{ my: 1, borderColor: `${colors.armyGreen}50` }} />
              <CardRow>
                <IconWrapper>
                  <CalendarTodayIcon fontSize="small" />
                </IconWrapper>
                <Box>
                  <LabelText>Date of Birth</LabelText>
                  <ValueText>{formatDateToDogTag(user.birthDate)}</ValueText>
                </Box>
              </CardRow>
              <Divider sx={{ my: 1, borderColor: `${colors.armyGreen}50` }} />
              <CardRow>
                <IconWrapper>
                  <EventIcon fontSize="small" />
                </IconWrapper>
                <Box>
                  <LabelText>Creation Date</LabelText>
                  <ValueText>{formatDateToDogTag(user.creationDate)}</ValueText>
                </Box>
              </CardRow>
              <Divider sx={{ my: 1, borderColor: `${colors.armyGreen}50` }} />
              <CardRow>
                <IconWrapper>
                  <BadgeIcon fontSize="small" />
                </IconWrapper>
                <Box>
                  <LabelText>Rank</LabelText>
                  <ValueText>{user.rank || 'PRIVATE'}</ValueText>
                </Box>
              </CardRow>
            </CardContent>
          </UserCard>
        ))
      )}
    </Box>
  );

  const DesktopUserList = () => (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableHeadCell sx={{ width: '10%', textAlign: 'center' }}>
              Serial Number
            </StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: '20%' }}>ID</StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: '20%' }}>Username</StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: '20%' }}>Date of Birth</StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: '20%' }}>Creation Date</StyledTableHeadCell>
            <StyledTableHeadCell sx={{ width: '20%' }}>Rank</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <StyledTableBodyCell colSpan={6} sx={{ textAlign: 'center' }}>
                No users available
              </StyledTableBodyCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: colors.hoverBackground,
                    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.3)`,
                  },
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <StyledTableBodyCell sx={{ textAlign: 'center' }}>
                  #{index + 1}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{user.id}</StyledTableBodyCell>
                <StyledTableBodyCell>{user.username}</StyledTableBodyCell>
                <StyledTableBodyCell>{formatDateToDogTag(user.birthDate)}</StyledTableBodyCell>
                <StyledTableBodyCell>{formatDateToDogTag(user.creationDate)}</StyledTableBodyCell>
                <StyledTableBodyCell>{user.rank || 'PRIVATE'}</StyledTableBodyCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );

  return (
    <MainContainer>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: colors.white,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.khaki})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: isMobile ? '1.75rem' : '2.125rem',
        }}
      >
        Trenches Registry
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <JoinButton onClick={handleJoinClick}>
          Join the Trenches
        </JoinButton>
      </Box>

      {isMobile ? <MobileUserList /> : <DesktopUserList />}
    </MainContainer>
  );
};

export default Main;