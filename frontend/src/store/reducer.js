// Copyright © 2025 Suzuki Motor Corporation All Rights Reserved
const initialState = {
  isSignIn: false,
  pageStatus: "HomePage",
  nextAction: "",
  userID: "",
  accountName: "",
  phoneNumber: "",
  privacyPolicyCheck: false,
  clientPage: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_STATE":
      return { ...state, isSignIn: action.payload };

    case "CHANGE_PAGE_STATE":
      return { ...state, pageStatus: action.payload };

    case "SET_NEXT_ACTION":
      return { ...state, nextAction: action.payload };

    case "SET_USER_ID":
      return { ...state, userID: action.payload };

    case "SET_ACCOUNT_NAME":
      return { ...state, accountName: action.payload };

    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };

    case "SET_PRIVACY_POLICY_CHECK":
      return { ...state, privacyPolicyCheck: action.payload };

    case "SET_CLIENT_PAGE":
      return { ...state, clientPage: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
