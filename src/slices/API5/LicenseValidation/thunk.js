import { API5_POST_LicenseValidation } from '../../../helpers/fakebackend_helper';

import { licenseSuccess, licenseLogoutUserSuccess, apiError, reset_license_flag } from './reducer';

export const POST_LicenseValidation = (user,history) => async (dispatch) => {

  try {
    let response;

    response = API5_POST_LicenseValidation({Username: user.email,password: user.password,});

    var data = await response;

    if (data) {
      localStorage.setItem("authUser", JSON.stringify(data));
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin = JSON.stringify(data);
        finallogin = JSON.parse(finallogin)
        if ((finallogin.subscriberID).length===36) {
          dispatch(licenseSuccess(data));
          history('/CompanySelection')
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(licenseSuccess(data));
        history('/CompanySelection')
      }
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const licenseLogoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");
    let fireBaseBackend = getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(licenseLogoutUserSuccess(response));
    } else {
      dispatch(licenseLogoutUserSuccess(true));
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const licensesocialLogin = (type, history) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
      //   response = postSocialLogin(data);
      // }
      
      const socialdata = await response;
    if (socialdata) {
      sessionStorage.setItem("authUser", JSON.stringify(response));
      dispatch(licenseSuccess(response));
      history('/dashboard')
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLicenseFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_license_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
