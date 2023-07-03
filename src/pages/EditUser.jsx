import { Typography, TextField, Box, Button } from '@mui/material';
import { useState, useReducer, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/store';
import { useUpdateUserMutation } from '../features/user/userApiSlice';
import { setUser as SetUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const EditUser = () => {
  const [user, setUser] = useState(null);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, { isLoading, error, data }] = useUpdateUserMutation();
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    }
  }, [error]);
  useEffect(() => {
    console.log('loading');
    console.log(toast);
  }, [isLoading]);
  useEffect(() => {
    if (data) {
      console.log(data);
      (async () => {
        await dispatch(SetUser(data));
      })();
      navigate('/profile');
    }
  }, [data]);
  const setIt = async (user) => {
    if (user) {
      await dispatch(SetUser(user));
    }
  };
  useEffect(() => {
    console.log(userInfo);
    console.log(user);
    if (user) {
      setUser(user);
      navigate('/profile');
      setIt(user);
    }
  }, [user]);
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    } else {
      navigate('/login');
    }
  }, [userInfo]);
  if (user) {
    if (user !== null) {
      const create = async (e) => {
        e.preventDefault();
        setState({
          type: 'reset',
        });
        const data = {
          name: state.name,
          email: state.email,
          phone: state.phone,
          password: state.password,
          bio: state.bio,
          image: state.image,
        };
        const { _id, token } = user;
        if (_id && token) {
          await edit({ data, userId: _id, token }).unwrap();
        } else {
          toast.error('Error retrieving data, refresh ');
        }
      };
      const initialState = {
        name: user.name,
        email: user.email ? user.email : '',
        phone: user.phone ? user.phone : '',
        password: user.password ? user.password : '',
        bio: user.bio ? user.bio : '',
        password2: user.password ? user.password : '',
        image: null,
      };
      const reducer = (state, action) => {
        switch (action.type) {
          case 'setName':
            return {
              ...state,
              name: action.payload,
            };
            //eslint-disable-next-line
            break;
          case 'setEmail':
            return {
              ...state,
              email: action.payload,
            };
            //eslint-disable-next-line
            break;
          case 'setPassword':
            return {
              ...state,
              password: action.payload,
            };
            //eslint-disable-next-line
            break;
          case 'setPassword2':
            return {
              ...state,
              password2: action.payload,
            };
            //eslint-disable-next-line
            break;
          case 'setTel':
            return {
              ...state,
              phone: action.payload,
            };
            //eslint-disable-next-line
            break;
          case 'setBio':
            return {
              ...state,
              bio: action.payload,
            };
            //eslint-disable-next-line
            break;
          case 'setImage':
            return {
              ...state,
              image: action.payload,
            };
            //eslint-disable-next-line
            break;
          case 'reset':
            return {
              ...initialState,
            };
            //eslint-disable-next-line
            break;
          default:
            return state;
        }
      };
      const [state, setState] = useReducer(reducer, initialState);
      return (
        <div className="text-center shadow rounded-lg">
          <Typography variant="h2">Register page</Typography>
          <Box
            component="form"
            noValidate
            autoComplete="on"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '80vw' },
            }}
          >
            <TextField
              id="name"
              label="Name"
              placeholder="Full name"
              InputProps={{
                value: state.name,
                onChange: (e) => {
                  setState({
                    type: 'setName',
                    payload: e.target.value,
                  });
                },
              }}
            />
            <TextField
              id="tel"
              label="Telephone"
              placeholder="Telephone"
              InputProps={{
                type: 'tel',
                value: state.phone,
                onChange: (e) => {
                  setState({
                    type: 'setTel',
                    payload: e.target.value,
                  });
                },
              }}
            />
            <TextField
              id="email"
              label="Email Address"
              placeholder="medi@medi.com"
              InputProps={{
                type: 'email',
                value: state.email,
                onChange: (e) => {
                  setState({
                    type: 'setEmail',
                    payload: e.target.value,
                  });
                },
              }}
            />
            <TextField
              id="password"
              label="Password"
              placeholder="Your password"
              InputProps={{
                type: 'password',
                value: state.password,
                onChange: (e) => {
                  setState({
                    type: 'setPassword',
                    payload: e.target.value,
                  });
                },
              }}
            />
            <TextField
              id="password"
              label="Password"
              placeholder="Comfirm Your password"
              InputProps={{
                type: 'password',
                value: state.password2,
                onChange: (e) => {
                  setState({
                    type: 'setPassword2',
                    payload: e.target.value,
                  });
                },
              }}
            />
            <TextField
              id="bio"
              label="Bio"
              placeholder="Tell us something about yourself"
              InputProps={{
                value: state.bio,
                onChange: (e) => {
                  setState({
                    type: 'setBio',
                    payload: e.target.value,
                  });
                },
              }}
            />
            {/*  <input
                 accept="image/*"
                 style={{ display: 'none' }}
                 id="raised-button-file"
                 type="file"
               />
                 <Button variant="raised" onClick={()=> }>
                   Upload
                 </Button>*/}
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={create}
          >
            <Typography variant="h6"> Create </Typography>
          </Button>

          <div
            className="p-2 rounded shadow"
            onClick={() => navigate('/profile')}
          >
            <Typography variant="h6">Go back to profile </Typography>
          </div>
        </div>
      );
    }
  }
  return (
    <div
      className="p-2 rounded shadow"
      onClick={() => navigate('/login')}
    >
      <Typography variant="h2">Login </Typography>
    </div>
  );
};
export default EditUser;
