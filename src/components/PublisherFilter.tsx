import { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Divider,
  Paper
} from '@mui/material';

const PublisherFilterMenu = ({ publishers, selectedPublishers, setSelectedPublishers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempSelected, setTempSelected] = useState(selectedPublishers);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTempSelected([...selectedPublishers]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (publisher) => {
    setTempSelected(prev => 
      prev.includes(publisher)
        ? prev.filter(p => p !== publisher)
        : [...prev, publisher]
    );
  };

  const handleApplyFilter = () => {
    setSelectedPublishers(tempSelected);
    handleClose();
  };

  const handleRemoveFilter = () => {
    setSelectedPublishers([]);
    setTempSelected([]);
    handleClose();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ backgroundColor: '#FFFFFF', border:"1px solid #000", color:'#000' }}
      >
        انتخاب ناشران
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '350px',
            direction: 'rtl'
          }
        }}
      >
        <Paper sx={{ maxHeight: '400px', overflow: 'auto' }}>
          {publishers.map((publisher) => (
            <MenuItem key={publisher} sx={{ padding: '0 16px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tempSelected.includes(publisher)}
                    onChange={() => handleCheckboxChange(publisher)}
                  />
                }
                label={publisher}
                sx={{
                  width: '100%',
                  '& .MuiFormControlLabel-label': {
                    whiteSpace: 'normal',
                    wordBreak: 'break-word'
                  }
                }}
              />
            </MenuItem>
          ))}
        </Paper>
        <Box 
          sx={{ 
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              size="small"
            >
              اعمال فیلتر
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemoveFilter}
              size="small"
            >
              حذف فیلتر
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default PublisherFilterMenu;