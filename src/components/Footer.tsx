
import {
  useNavigate
} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
    


const Footer:React.FC = ():JSX.Element => {
  const navigate = useNavigate();
  const [value,setValue] = React.useState(0)

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  
  }, [value]);
  
  return (
         <Box sx={{ pb: 7 }} ref={ref} >
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} className="flex w-screen ">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className="flex w-full h-8 justify-evenly items-center"
        >
          <BottomNavigationAction label="Notifications" onClick={()=> navigate("/notifications")} icon={<h1>🔔</h1>} />
          <BottomNavigationAction label="Messages" onClick={()=> navigate("/messages")} icon={<h1>🗨️</h1>} />
          <BottomNavigationAction label="Home" onClick={()=> navigate("/")} icon={<h1>🏠</h1>} />
          <BottomNavigationAction label="Search" onClick={()=> navigate("/search")} icon={<h1>🔍</h1>} />
          <BottomNavigationAction label="profile" onClick={()=> navigate("/profile")} icon={<h1>👤</h1>} />
        
        </BottomNavigation>
      </Paper>
    </Box>
    )
}
export default Footer