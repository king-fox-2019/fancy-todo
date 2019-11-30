const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  title : {
    type : String,
    required : [true, 'title cannot be empty']
  },
  description : {
    type : String
  },
  userId : {
    type : Schema.Types.ObjectId,
    ref : `User`
  },
  dueDate : {
    type : Date
    // required : [true, `due date cannot be empty`]
  }, 
  status : {
    type : Boolean,
    default : false
  },
  projectId: {
    type : Schema.Types.ObjectId,
    ref: 'Project' 
  }
}, {
  versionKey: false
})

todoSchema.pre('save', function(next) {
   

  var actualDate = new Date(); // 2013-07-30 17:11:00
var endOfDayDate = new Date(actualDate.getFullYear()
                           ,actualDate.getMonth()
                           ,actualDate.getDate()
                           ,23,59,59); // 2013-07-30 23:59:59


                           console.log(actualDate.toLocaleString());
                           console.log(endOfDayDate.toLocaleString());
  this.dueDate = endOfDayDate
  next()
})

const Todo = model('Todo', todoSchema)

module.exports = Todo