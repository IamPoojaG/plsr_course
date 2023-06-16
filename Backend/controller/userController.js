import Course from '../models/userModel.js';
export const createUser = (req, res) => {
  const { id, title, class_level, pricing } = req.body;
  const users = Course.find().then((users) => users);
  const newCourse = new Course({
    id,
    title,
    class_level,
    pricing,
  });
  console.log(newCourse);
  newCourse
    .save()
    .then(() =>
      res.status(201).json({ success: true, msg: 'User created successfully' })
    )
    .catch((err) => res.status(500).json(`Error:${err}`));
};

export const getAllUsers = (req, res) => {
  Course.find()
    .then((users) => res.status(200).json({ users }))
    .catch((err) => res.status(401).json(`Error: ${err}`));
};

export const getUser = (req, res) => {
  const { id: userID } = req.params;
  Course.findById(userID)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const updateUser = (req, res) => {
  const { id: postID } = req.params;
  Course.findById(postID)
    .then((user) => {
      user.title = req.body.title;
      user.class_level = req.body.class_level;
      user.pricing = req.body.pricing;

      user
        .save()
        .then(() =>
          res
            .status(201)
            .json({ success: true, msg: 'User updated successfully' })
        )
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

export const deleteUser = (req, res) => {
  const { id: userID } = req.params;
  Course.findByIdAndDelete(userID)
    .then(() =>
      res.status(200).json({ success: true, msg: 'User deleted successfully' })
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
