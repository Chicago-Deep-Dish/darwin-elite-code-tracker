import React from "react";
import "../../../styles/pageLayout.css"
import Button from "@mui/material/Button";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";

export default function About({ aboutToggle, setAboutToggle }) {
  return (
    <Box className="about">
      <h1 style={{marginTop: 0, paddingTop: "5%", justifyContent: "center"}}>About</h1>
      <div style={{marginRight: "10%", marginLeft: "10%", marginTop: "5%"}}>
        <p><em>ELEET-TRACKER</em> is a service that has your future in mind. We know you are well on your way to become the best Software Engineer you can be, and we're here for you. We bring to you a service that allows you to track, record, and analyze your performance on the leetcode problems you attempt, so you can see how you stack up against the fiercest competition out there - yourself.</p>
      </div>
      <div style={{ position: "absolute", bottom: 0, width: "100%", justifyContent: "center"}}>
      <Button
        sx={{backgroundColor: "#272727"}}
          variant="contained"
          type="button"
          size="large"
          onClick={() => setAboutToggle(!aboutToggle)}
        >
          { aboutToggle ? (<ArrowDropUp/>) : (<ArrowDropDown/>) }
      </Button>
      </div>
    </Box>
  );
}
