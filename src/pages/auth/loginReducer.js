export const initialState = {
  email: '',
  password: '',
};
export const reducer = (state, action) => {
  switch (action.type) {
    case 'setEmail':
      return {
        ...state,
        email: action.payload,
      };
      // eslint-disable-next-line
      break;
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
      // eslint-disable-next-line
      break;
    case 'reset':
      return {
        ...initialState,
      };
      // eslint-disable-next-line
      break;
    default:
      return state;
  }
};
