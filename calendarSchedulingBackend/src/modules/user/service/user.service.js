const User = require("../model/user.model");

const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  createUser,
  getUserById,
};
