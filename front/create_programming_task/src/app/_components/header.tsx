import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { PRIMARY_COLOR } from "@/constants/color";
import { FONT } from "@/constants/font";

import HeaderLink from "./headerLink";

import '../globals.css';

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
        <Typography
          variant="h3"
          sx={{
            color: "black",
            // fontFamily: FONT,
            fontWeight: "bold",
          }}
          >
          ハックドリル
        </Typography>
        <HeaderLink />
      </Box>
    </AppBar>
  );
};

export default Header;
