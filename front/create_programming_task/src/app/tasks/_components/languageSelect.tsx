import React from "react";

import { Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material";

import type { Language } from "@/types/language";

type Props = {
  languages: Language[];
  selectedLanguage: Language | "All";
  setSelectedLanguage: React.Dispatch<React.SetStateAction<Language | "All">>;
};

const LanguageSelect: React.FC<Props> = ({
  languages,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    <Box sx={{ padding: "0 5%", marginTop: "30px" }}>
      <FormControl sx={{ width: "60%" }}>
        <InputLabel id="language-select-label">プログラミング言語</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={selectedLanguage}
          label="language"
          onChange={(e) => setSelectedLanguage(e.target.value as Language)}
        >
          <MenuItem value={"All"}>All</MenuItem>
          {languages.map((language: Language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelect;
