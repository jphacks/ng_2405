import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { PRIMARY_COLOR } from "@/constants/color";

import HeaderLink from "./headerLink";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: PRIMARY_COLOR,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {/* TODO テキストの内容は検討 */}
        <Typography variant="h3" sx={{ color: "black" }}>
          Programming Task Manager
        </Typography>
        <HeaderLink />
      </Box>
    </AppBar>
  );
};

export default Header;
