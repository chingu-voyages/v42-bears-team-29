const { supabase } = require("../config/supabase");

//    9fb70313-9464-44e8-a001-6610f4ca2113

//Get user info
const getUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json("User ID Missing");

    if (id) {
      const { data: User, error } = await supabase
        .from("User")
        .select("first_name, last_name, User_data(*)")
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

//TODO!!!
//Update user Account
const updateUserAcc = async (req, res) => {
  try {
    const { id, first_name, last_name, email, password } = req.body;

    //declaring a hashPassword to later hold the value of the hashed and salted password
    let hashPassword;

    if (!id) return res.status(400).json("User ID Missing");

    //TODO!!!
    //if password add password salting and hashing will generate using the  same method as used for auth.
    // if(password){}
    // const

    if (id) {
      await supabase
        .from("User")
        .update({ id, first_name, last_name, email, password: hashPassword })
        .eq("id", id);

      return res.status(200).json("User updated");
    }
  } catch (error) {
    return res.status(500).json({ Error_updating_user_data: error });
  }
};

//Update the user info/data
const updateUserInfo = async (req, res) => {
  try {
    const { id, profilePic, skills, about, mission, tokens, tutors, tutees } =
      req.body;

    if (!id) return res.status(400).json("User ID Missing");

    if (id) {
      await supabase
        .from("User_data")
        .update({ profilePic, skills, about, mission, tokens, tutors, tutees })
        .eq("userId", id);

      return res.status(200).json("User updated");
    }
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

module.exports = { getUser, updateUserAcc, updateUserInfo, deleteUser };
