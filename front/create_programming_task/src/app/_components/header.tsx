import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { PRIMARY_COLOR } from "@/constants/color";
import { FONT } from "@/constants/font";

import Image from 'next/image';
import HeaderLink from "./headerLink";
import LogoImage from "../public/Logo.png";
import Link from "next/link";

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
        <Image src={LogoImage} alt='Logo' width={50} height={50} />
        <HeaderLink />
      </Box>
    </AppBar>
  );
};

export default Header;
