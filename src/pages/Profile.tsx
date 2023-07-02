import {
  Typography,
  Container,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Box,
  Tabs,
  Tab,
  AppBar
} from "@mui/material"
import React,{
  useEffect,
  useState,
  FC,
  useLayoutEffect
} from "react"
import { useAppSelector } from "../app/store";
import {
  useNavigate
} from "react-router-dom";
import type {
  USER
} from "../app/types"
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Default from "../images/default.png"

import Posts from "../components/posts"
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



const Profile:FC = ():JSX.Element => {
  const navigate = useNavigate();
  
  const userFromStore = useAppSelector(state=>state.user.userInfo)
  const [user,setUser] = useState<USER | null>(userFromStore)
  
  const [value, setValue] = useState(0);

 
  useLayoutEffect(()=>{
    if(userFromStore){
    setUser(userFromStore);
    }else{
      navigate("/login")
    }
  },[userFromStore,navigate])
  useEffect(()=>{
    if(userFromStore){
    setUser(userFromStore)
    }
    if(!user){
      navigate("/login")
    }
 
  console.log(user)
  },[userFromStore,navigate,user])
  
  const theme = useTheme();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
if(!user){
  return (
    <Card onClick={()=>navigate("/login")}>
    <Typography variant="h1"> Login </Typography>
    </Card>
    )
}

   return(
    <Container className="w-screen h-screen py-2 rounded flex items-center justify-center">
  { user && (
    <div className="w-[98vw] h-[98vh] p-2 rounded flex items-center justify-center">
    {user !== null && (
    <Container className="w-[100vw] h-[100vh]">
       <Card className="w-full">
     <CardMedia
     
        image={ user.image ? user.image : Default }
        sx = {{
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop:'30'
    }}
      />
      <CardContent className="w-full text-center">
        <Typography gutterBottom variant="h5" component="div">
          { user.name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { user.bio }
        </Typography>
      </CardContent>
      <CardActions className="w-full flex justify-between flex-row">
        <Button variant="contained" size="small">Edit Profile</Button>
        <Button variant="contained" size="small">Delete Account</Button>
      </CardActions>
    </Card>
    <Paper variant="elevation" className="flex flex-wrap items-center justify-evenly h-[20vh] w-full">
     <Box className="flex flex-col flex-wrap items-center justify-center">
      <Typography variant="h6">Posts</Typography>
     { user.posts && ( <Typography variant="body2">{user.posts.length}</Typography>) }
     </Box>
     <Box className="flex flex-col flex-wrap items-center justify-center">
      <Typography variant="h6">Followers</Typography>
    { user.followers && (  <Typography variant="body2">{user.followers.length}</Typography>) }
     </Box>
     <Box className="flex flex-col flex-wrap items-center justify-center">
      <Typography variant="h6">Following</Typography>
     {user.following && (<Typography variant="body2">{user.following.length}</Typography>) }
     </Box>
    </Paper>
    { !user.posts && (
    <h1>No posts</h1>
    ) }
    {
    user.posts && user.token && (<Box  className="w-full h-auto min-h-64 border">
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Images" {...a11yProps(1)} />
          <Tab label="Vidoes" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        className="h-auto min-h-64 "
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Posts posts={user.posts} token={user.token} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        videos 
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        images
        </TabPanel>
      </SwipeableViews>
    </Box>)}
  
    </Container>
    )}
    </div>
    )
  }
    </Container>
    )
}


export default Profile;