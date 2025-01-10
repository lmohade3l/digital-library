import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Box, Button, Typography, Skeleton } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { bookType } from '../types/book';
import { theme } from '../theme';
import { priceSeparator, toPersianNumbers } from '../utils/numberUtils';
import { getRartingAndCount } from '../utils/getRatingAndCount';

const BookDetail = () => {
  const bookDetailsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const book: bookType | undefined = location.state?.book;
  
  React.useEffect(() => {
    if (!book && id) {
      navigate('/');
    }
  }, [book, id, navigate]);

  const handleShare = async () => {
    try {
      if (!bookDetailsRef.current) return;

      const canvas = await html2canvas(bookDetailsRef.current);
      const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      if (navigator.share) {
        await navigator.share({
          title: `کتاب ${book?.title}`,
          text: `مشاهده جزئیات کتاب ${book?.title}`,
          files: [new File([imageBlob], 'book-details.png', { type: 'image/png' })]
        });
      } else {
        const shareUrl = URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = shareUrl;
        a.download = 'book-details.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(shareUrl);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!book) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'between', p: 4 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Skeleton
            variant="rectangular"
            width={256}
            height={400}
            sx={{ borderRadius: '4px' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton width={200} height={30} />
            <Skeleton width={150} height={24} />
            <Skeleton width={100} height={24} />
            <Skeleton width={120} height={24} />
            <Skeleton width={140} height={24} />
            <Skeleton width={160} height={24} />
            <Skeleton width={180} height={24} />
            <Skeleton width={400} height={100} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'between', p: 4 }}>
      <Box sx={{ display: 'flex', gap: 4 }} ref={bookDetailsRef}>
        <img 
          src={book.coverUri} 
          alt={`${book.title} cover`}
          style={{
            width: '256px',
            height: 'auto',
            objectFit: 'contain',
            boxShadow: `0 2px 4px 0 ${theme.palette.secondary.main}, 0 3px 10px 0 ${theme.palette.secondary.main}`,
            borderRadius: '4px',
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {`کتاب ${book.title}`}
          </Typography>
          
          <Typography>
            {`نویسنده: ${book.authors?.join('، ')}`}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography>امتیاز:</Typography>
            <Box>
              <Typography>{getRartingAndCount(book).rating}</Typography>
            </Box>
            <Typography>{`از ${getRartingAndCount(book).count} رای`}</Typography>
          </Box>
          
          <Typography>
            {`قیمت: ${toPersianNumbers(priceSeparator(book.price))} ت`}
          </Typography>
          
          <Typography>
            {`ناشر: ${book.publisher}`}
          </Typography>
          
          <Typography>
            {`قیمت فیزیکی: ${toPersianNumbers(priceSeparator(book.physicalPrice))} ت`}
          </Typography>
          
          <Typography>
            {`تعداد صفحات: ${toPersianNumbers(book.numberOfPages)}`}
          </Typography>
          
          <Typography sx={{ maxWidth: '600px' }}>
            {`توضیحات: ${book.descriptions}`}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button 
              onClick={() => window.open(`https://taaghche.com/book/${book.id}`, '_blank')}
              variant="contained"
              color="primary"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: '#FFF',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              جزییات بیشتر
            </Button>
            
            <Button
              onClick={handleShare}
              variant="contained"
              color="success"
              sx={{
                bgcolor: theme.palette.success.main,
                color: '#FFF',
                '&:hover': {
                  bgcolor: theme.palette.success.dark,
                },
              }}
            >
              اشتراک‌گذاری
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetail;