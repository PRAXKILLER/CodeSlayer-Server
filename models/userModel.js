import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    solved_problems: [{ type: mongoose.Types.ObjectId, ref: "problems" }],
    role: {
      type: String,
      enum: ["User", "Admin", "Owner"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "CodeSlayer");
};

userSchema.statics.findByEmailAndUsername = async ({ email, userName }) => {
  const userByEmail = await UserModel.findOne({ email });
  const userByUsername = await UserModel.findOne({ userName });
  if (userByEmail) throw new Error("User with this email already exists!!");

  if (userByUsername)
    throw new Error("User with this username already exists!!");

  return false;
};

userSchema.statics.findByEmailOrUsernameAndPassword = async ({
  email,
  userName,
  password,
}) => {
  if (email) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does not exists");

    // Compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error("Invalid Password !!!");

    return user;
  } else {
    const user = await UserModel.findOne({ userName });
    if (!user) throw new Error("User does not exists");

    // Compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error("Invalid Password !!!");

    return user;
  }
};

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  // Generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // Hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // Assign hashed password
      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", userSchema);
