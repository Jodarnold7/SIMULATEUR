import api from "./api";
const getUserBoard = () => {
  return api.get("/test/user");
};
const UserService = {
  getUserBoard,
};

export default UserService;
