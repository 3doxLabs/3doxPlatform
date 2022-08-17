const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const options = { timestamps: true };

const userSchema = new mongoose.Schema(
  {
    username: {
      trim: true,
      type: String,
      unique: true,
    },

    firstName: {
      trim: true,
      type: String,
    },

    lastName: {
      trim: true,
      type: String,
    },

    address: {
      trim: true,
      type: String,
      unique: true,
    },

    avatar: {
      type: String,
    },

    balance: {
      type: Number,
      default: 0.0,
    },

    rating: {
      type: Number,
      required: true,
    },

    reviews: {
      type: Number,
      required: true,
    },

    experience: [
      {
        company: String,
        position: String,
        from: Date,
        to: Date,
      },
    ],

    skills: [
      {
        skill: String,
      },
    ],

    earned: {
      type: Number,
      required: true,
    },

    spent: {
      type: Number,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  options
);

// Hash password
userSchema.pre("save", async function (next) {
  // If password field has been altered hash it using bcrypt
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
