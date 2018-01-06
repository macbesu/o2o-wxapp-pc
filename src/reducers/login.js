import { USER_LOGIN } from './../actions/index';

const initState = {
  login: false,
};

export default function( state = initState, action ) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        login: true
      };
      break;
    default: 
      return state;
  }
};