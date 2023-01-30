import ap from "./ap";
import TokenService from "./token.service";
const Signup = async (email, password) => {
  const response = await ap.post("/signup", {
    email,
    password,
  });
  if (response.data.accessToken) {
    TokenService.setUser(response.data);
  }
  return response;
};
const Signin = async (email, password) => {
  const response = await ap.post("/signin", {
    email,
    password,
  });
  if (response.data.accessToken) {
    TokenService.setUser(response.data);
  }
  return response;
};
const logout = () => {
  TokenService.removeUser();
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  Signup,
  Signin,
  logout,
  getCurrentUser,
};

export default AuthService;
