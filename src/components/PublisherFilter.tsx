import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
} from "@mui/material";
import PulicherIcon from "../assets/images/publisher.png";

const PublisherFilterMenu = ({
  publishers,
  selectedPublishers,
  setSelectedPublishers,
}: {
  publishers: string[];
  selectedPublishers: string[];
  setSelectedPublishers: (value : string[]) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tempSelected, setTempSelected] = useState(selectedPublishers);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTempSelected([...selectedPublishers]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (publisher:string) => {
    setTempSelected((prev) =>
      prev.includes(publisher)
        ? prev.filter((p) => p !== publisher)
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
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #000",
          color: "#000",
          display: "flex",
          gap: 0.4,
          borderRadius: "15px",
        }}
      >
        {selectedPublishers?.length === 0
          ? "انتخاب ناشران "
          : selectedPublishers?.join("، ").substring(0, 20) +
            (selectedPublishers?.length > 1 &&
            selectedPublishers?.join("، ")?.length > 20
              ? "..."
              : "")}
        <img src={PulicherIcon} alt="" style={{ width: "20px" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "350px",
            direction: "rtl",
          },
        }}
      >
        <Paper sx={{ maxHeight: "400px", overflow: "auto" }}>
          {publishers.map((publisher) => (
            <MenuItem key={publisher} sx={{ padding: "0 16px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tempSelected.includes(publisher)}
                    onChange={() => handleCheckboxChange(publisher)}
                  />
                }
                label={publisher}
                sx={{
                  width: "100%",
                  "& .MuiFormControlLabel-label": {
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  },
                }}
              />
            </MenuItem>
          ))}
        </Paper>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
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
