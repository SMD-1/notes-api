import User from "../Model/User.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        data: {
            users
        }
    })
  } catch (err) {
    res.status(500).json({
        status: 'fail',
        message: err
    })
  }
}

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json({
        status: "success",
        data: {
            user: newUser
        }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
  
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
      // if we dont want to show some property
      const { password, ...other } = user._doc;
      res.status(200).json({
        status: "success",
        data: {
          user: other
        }
      });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        user: null
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}