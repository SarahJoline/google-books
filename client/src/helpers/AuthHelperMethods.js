import decode from "jwt-decode";

const AuthHelperMethods = {};

// Initializing important variables
AuthHelperMethods.login = (email, password) => {
  console.log("LOGIN!");

  // Get a token from api server using the fetch api
  return AuthHelperMethods.fetch(`/log-in`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => {
    console.log("THEN!");
    AuthHelperMethods.setToken(res.token); // Setting the token in localStorage

    return Promise.resolve(res);
  });
};

/*
    This method creates a variable called ‘token’ and assign it the value returned by ‘AuthHelperMethods.getToken()’ which does exactly what is sounds like: Gets the token that is stored in localStorage.
  */
AuthHelperMethods.loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = AuthHelperMethods.getToken(); // Getting token from localstorage

  //The double exclamation is a way to cast the variable to a boolean, allowing you to easily check if the token exusts.
  return !!token && !AuthHelperMethods.isTokenExpired(token); // handwaiving here
};

/*
  Will check to see if the token passed to it is expired. Notice that we use the ‘decode’ method.
*/
AuthHelperMethods.isTokenExpired = (token) => {
  try {
    const decoded = decode(token);

    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      return true;
    } else return false;
  } catch (err) {
    console.log("expired check failed! Line 42: AuthService.js");
    return false;
  }
};

/*
  Will allow you to set and get a token when needed.
*/
AuthHelperMethods.setToken = (idToken) => {
  console.log("setting id_token:", idToken);
  // Saves user token to localStorage
  localStorage.setItem("id_token", idToken);
};

AuthHelperMethods.getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem("id_token");
};

/* Log the user out and remove the token from localStorage. */
AuthHelperMethods.logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("id_token");
};

// Get the saved data that has been stored in the webtoken.
AuthHelperMethods.decodeToken = () => {
  // Using jwt-decode npm package to decode the token
  let answer = decode(AuthHelperMethods.getToken());

  console.log("Recieved answer!");
  return answer;
};

// Typical fetch except for being able to set the headers prior to sending it off to the server.
AuthHelperMethods.fetch = (url, options) => {
  // performs api calls sending the required authentication headers
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // Setting Authorization header
  // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
  if (AuthHelperMethods.loggedIn()) {
    headers["Authorization"] = AuthHelperMethods.getToken();
  }

  return fetch(url, {
    headers,
    ...options,
  })
    .then(AuthHelperMethods._checkStatus)
    .then((response) => response.json());
};

AuthHelperMethods._checkStatus = (response) => {
  //raises an error in case response status is not a success
  if (response.status >= 200 && response.status < 300) {
    // Success status lies between 200 to 300
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export default AuthHelperMethods;
