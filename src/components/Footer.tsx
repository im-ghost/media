
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import { RiHome2Fill, RiSearchLine, RiMessage2Line, RiAccountCircleFill } from 'react-icons/ri';
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
    


const Footer:React.FC = ():JSX.Element => {
  const navigate = useNavigate();
   const location = useLocation();
   location.pathname.includes
  const routes = [
    {
    name:"home",
    icon:JSX.createElement(RiHome2Fill)
  },
    {
    name:"notifications",
    icon:JSX.createElement(RiNotification)
  },
    {
    name:"search",
    icon:JSX.createElement(RiSearchLine)
  },
    {
    name:"messages",
    icon:JSX.createElement(RiMessage2Line)
  },
    {
    name:"profile",
    icon:JSX.createElement(RiAccountCircleFill)
  },
  ]
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
        { routes.map(route => (
          <BottomNavigationAction label={route.name} className={location.pathname.includes(route.name) ? "bg-green-900" :""} onClick={()=> navigate(`/${route.name}`)} icon={<IconButton>
          {route.icon}
          </IconButton>} />))
        }
         </BottomNavigation>
      </Paper>
    </Box>
    )
}
export default Footer