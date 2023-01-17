const { supabase } = require("../config/supabase");

//    9fb70313-9464-44e8-a001-6610f4ca2113

//Get user info
const getUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const { data: User, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", id);
      if (User) {
        return res.status(200).json(User);
      } else {
        return res.status(404).json({ User_not_found: error });
      }
    }
  } catch (error) {
    return res.status(500).json({ Error_fetching_user_data: error });
  }
};

//Update user info
const updateUser = async (req, res) => {
  try {
    return res.status(200).json({ testing });
  } catch (error) {
    return res.status(500).json({ Error_updating_user_data: error });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    return res.status(200).json({ testing });
  } catch (error) {
    return res.status(500).json({ Error_deleting_user_data: error });
  }
};

module.exports = { getUser, updateUser, deleteUser };
