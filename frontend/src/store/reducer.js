const initialState = {
  isSignIn: false,
  pageStatus: "SignUp",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ISSIGNIN_STATE':
      return { ...state, isSignIn: action.payload };

    case 'CHANGE_PAGE_STATE':
      return { ...state, pageStatus: action.payload };
      
    default:
      return state;
  }
};

export default rootReducer;