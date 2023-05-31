
import {
  useNavigate
} from "react-router-dom";
import type {
  USER
} from "../app/types"
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
    


const Navbar:React.FC<{user:USER | null}> = ({user}):JSX.Element => {
  const navigate = useNavigate();
  const [value,setValue] = React.useState(0)

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    
  }, [value]);
  
  return (
         <Box sx={{ pb: 7 }} ref={ref} >
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" onClick={()=> navigate("/notifications")} icon={<h1>not</h1>} />
          <BottomNavigationAction label="Favorites" onClick={()=> navigate("/messages")} icon={<h1>mssg</h1>} />
        
        </BottomNavigation>
      </Paper>
    </Box>
    )
}
export default Navbar