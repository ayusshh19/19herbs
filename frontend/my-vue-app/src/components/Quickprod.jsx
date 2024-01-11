import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./quick.css";
import Productcards from "./Productcard";
import Quickview from "./Quickview";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="text-darkuse"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography className="text-4xl ">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Quicktabs() {
  const [value, setValue] = React.useState(0);
  const [open,setopen]=React.useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
   <>
    <Box className="w-[80%] mt-12 m-auto text-darkbutton">
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          className="text-xl font-extrabold"
        >
          <Tab
            className="text-darkbutton bg-darkuse font-extrabold text-xl"
            label="HairCare"
            sx={{fontWeight:"bold"}}
            {...a11yProps(0)}
          />
          <Tab label="Face Beauty" sx={{fontWeight:"bold"}} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={value !== 0}
        id={`simple-tabpanel-${0}`}
        aria-labelledby={`simple-tab-${0}`}
        className="text-darkuse"
      >
        <Box>
          <Productcards category={"Hairoil"}  value={value} setopen={setopen}/>
        </Box>
      </div>
      <div
        role="tabpanel"
        hidden={value !== 1}
        id={`simple-tabpanel-${1}`}
        aria-labelledby={`simple-tab-${1}`}
        className="text-darkbutton"
      >
        <Box >
          <Productcards category={"Face"} value={value} setopen={setopen}/>
        </Box>
      </div>
      <Quickview open={open} setopen={setopen}/>
    </Box>
   
   </>
  );
}
