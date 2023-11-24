const initialState = {
  isSignIn: false,
  pageStatus: "HomePage",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_STATE":
      return { ...state, isSignIn: action.payload };

    case "CHANGE_PAGE_STATE":
      return { ...state, pageStatus: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
