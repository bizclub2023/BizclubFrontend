import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import {Moralis} from "moralis-v1"
import { set } from 'nprogress';
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = false;
    window.sessionStorage.setItem('authenticated', 'false');


    try {
   
   
    
    } catch (err) {
      console.error(err);
    }

    if (false) {
     

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
   
  };
  const signIn = async (email, password) => {
    if (email == '' || password == '') {
      throw new Error('Please check  email and password');
    }

    try {
   
    await Moralis.User.logIn(email, password)
    .then(async function (user) {

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
      
      window.sessionStorage.setItem('authenticated', 'true');
      return true
 
    
    })

  } catch (err) {
    console.error(err);
  }
  };
  const signUp = async (email, name, password) => {
    try {
    let currentUser=email

    const user = new Moralis.User();
    user.set("username", name);
    user.set("email", email);
    user.set("password", password);
     Moralis.Cloud.run(
      "sendVerificationEmail",
      { currentUser }
    );
    
    await user.signUp();

    } catch (error) {
      
      throw new Error(error);
    }
    
  };
  const recoverPassword = async (email, password) => {
    try {
      let currentUser=email;
     await Moralis.Cloud.run(
        "requestPasswordReset",
        { currentUser }
      );
     

    } catch (error) {
      
      throw new Error(error);
    }
  };
  const signOut = async() => {
    
    await Moralis.User.logOut()
    .then(async function (user) {

 
      dispatch({
        type: HANDLERS.SIGN_OUT
      });
      
      window.sessionStorage.setItem('authenticated', 'false');
    })
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        recoverPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
