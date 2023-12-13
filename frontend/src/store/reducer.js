const initialState = {
  isSignIn: false,
  pageStatus: "HomePage",
  userID: "",
  accountName: "",
  phoneNumber: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_STATE":
      return { ...state, isSignIn: action.payload };

    case "CHANGE_PAGE_STATE":
      return { ...state, pageStatus: action.payload };

    case "SET_USER_ID":
      return { ...state, userID: action.payload };

    case "SET_ACCOUNT_NAME":
      return { ...state, accountName: action.payload };

    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
