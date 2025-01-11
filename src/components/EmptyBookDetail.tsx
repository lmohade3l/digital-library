import { Box, Skeleton, useMediaQuery } from "@mui/material";

export default function EmptyBookDetail() {
    const isUnder700px = useMediaQuery('(max-width:700px)');

    return (
        <Box sx={{ p: { xxs: 2, ssm: 4 }, width: "100%" }}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: isUnder700px ? "column" : "row", 
          gap: 4 
        }}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: isUnder700px ? "100%" : "256px",
              height: { xxs: "300px", ssm: "400px" },
              borderRadius: "4px"
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
            <Skeleton width="80%" height={30} />
            <Skeleton width="60%" height={24} />
            <Skeleton width="40%" height={24} />
            <Skeleton width="50%" height={24} />
            <Skeleton width="55%" height={24} />
            <Skeleton width="65%" height={24} />
            <Skeleton width="70%" height={24} />
            <Skeleton width="100%" height={100} />
          </Box>
        </Box>
      </Box>
    )
}