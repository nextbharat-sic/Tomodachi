const initialState = {
  isSignIn: false,
  pageStatus: "HomePage",
  userID: "",
  postAccountName: "",
  postPhoneNumber: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_STATE":
      return { ...state, isSignIn: action.payload };

    case "CHANGE_PAGE_STATE":
      return { ...state, pageStatus: action.payload };

    case "SET_USER_ID":
      return { ...state, userID: action.payload };

    case "SET_POST_ACCOUNT_NAME":
      return { ...state, postAccountName: action.payload };

    case "SET_POST_PHONE_NUMBER":
      return { ...state, postPhoneNumber: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
