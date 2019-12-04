const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    member: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    pendingMember: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    todo: [
      {
        type: ObjectId,
        ref: "Todo"
      }
    ],
    admin: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;
