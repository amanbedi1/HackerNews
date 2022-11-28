import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SearchContext } from '../../searchContext';

const styles={
  box:{
    flexGrow:"1",
    marginTop:"20px",
  },
  toolbar:{
    flexGrow:"1", 
    backgroundColor:"rgb(255, 102, 0)",
    color:"black", 
  },
  search:{
    width:"60%",
    color:"white",
    backgroundColor:"white",
    border:"1px solid",
    borderColor:"rgb(255, 102, 0) !important",
    borderRadius:"5px",
    flexGrow:"1",
    marginLeft:"20px",
    "& .MuiInputBase-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset":{
        borderColor:"white",
      },
      "&.Mui-focused fieldset": {
        border:"0px"
      },
    }
  },
  button:{
    color:"black",
    underline:"true",
    "&:disabled":{
      color:"white",
    },
  },
}; 

const Navbar= ()=>{
  const[searchState,setSearchState] = useContext(SearchContext); 

  const handleChange=(e)=>{
    console.log(e.target.name,e.target.value);
    setSearchState((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
      page:0
    }))
  }

  return (
    <Box sx={styles.box} className="Box">
      <AppBar position="static">
        <Toolbar sx={styles.toolbar}>
            <Typography variant="h6" component="div" sx={{flexGrow:"0"}}>
              Hacker News
            </Typography>
            <TextField sx={styles.search} placeholder="Search Stories by title, url or other" variant="outlined" type="search" name="query" onChange={handleChange} value={searchState.query}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
} 

export default Navbar;