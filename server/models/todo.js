const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: Boolean
    },
    due: {
      type: Date
    },
    user: {
      type: ObjectId,
      ref: "User"
    },
    project: {
      type: ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

todoSchema.pre("save", function(next) {
  this.status = false;
  next();
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;
