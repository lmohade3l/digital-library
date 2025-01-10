import React from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icon÷s-material';
import { Box, styled } from '@mui/system';

// Custom styled components
const StyledCard = styled(Card)({
  maxWidth: 400,
  marginTop: '2rem',
  marginBottom: '2rem',
  padding: '1rem',
//   direction: 'rtl',
borderRadius:"10px"
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #e0e0e0',
  paddingBottom: '1rem',
  paddingRight: '4rem',
  paddingLeft: '4rem',
//   marginBottom: '1rem'
});

const Title = styled('h3')({
  margin: 0,
  fontWeight: 'normal',
});

const InfoGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
//   gap: '1rem',
//   margin: '1.5rem 0',
  textAlign: 'center'
});

const InfoItem = styled('div')({
  '& h3': {
    margin: 0,
    color: '#666',
    fontWeight: 'normal',
    fontSize: '0.9rem'
  },
  '& p': {
    margin: '0.5rem 0',
    direction: 'ltr'
  }
});

const Price = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '1.5rem 0',
  '& span': {
    fontWeight: 'bold',
    fontSize: '1.2rem'
  }
});

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '1rem'
});

const PrimaryButton = styled('button')({
  flex: 2,
  padding: '0.8rem',
  backgroundColor: '#26a69a',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#2bbbad'
  }
});

const SecondaryButton = styled('button')({
  flex: 1,
  padding: '0.8rem',
  backgroundColor: '#f5f5f5',
  color: '#333',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#e0e0e0'
  }
});

const EpubIcon = () => (
    <Box sx={{display:'flex', justifyContent:'center'}}>
  <div style={{ 
    width: 40, 
    height: 40, 
    backgroundColor: '#8bc34a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    color: 'white',
    fontSize: '0.8rem'
  }}>
    ePUB
  </div>

    </Box>
);

const PersianEbookCard = () => {
  return (
    <StyledCard>
      <Header>
        <Title>الکترونیکی</Title>
        <Title>بی‌نهایت</Title>
      </Header>

      <CardContent>
        <IconButton size="small" style={{ marginBottom: '1rem' }}>
          {/* <ArrowBack /> */}
        </IconButton>

        <InfoGrid>
          <InfoItem>
            <h3>نوع</h3>
            <EpubIcon />
          </InfoItem>
          <InfoItem>
            <h3>حجم</h3>
            <p>۲۸۴.۲ کیلوبایت</p>
          </InfoItem>
          <InfoItem>
            <h3>سال انتشار</h3>
            <p>۱۳۹۹</p>
          </InfoItem>
        </InfoGrid>

        <Price>
          <span>:قیمت</span>
          <div>
            <div style={{ textDecoration: 'line-through', color: '#999' }}>۶۰,۰۰۰ تومان</div>
            <div style={{ color: '#e57373', fontSize: '0.8rem' }}>۳۰%</div>
            <div>۴۲,۰۰۰ تومان</div>
          </div>
        </Price>

        <ButtonContainer>
          <PrimaryButton>خرید و مطالعۀ کتاب</PrimaryButton>
          <SecondaryButton>هدیه به دیگری</SecondaryButton>
        </ButtonContainer>
      </CardContent>
    </StyledCard>
  );
};

export default PersianEbookCard;