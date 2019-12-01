const User = require('./server/models/user')
const Todo = require('./server/models/todo')

// cari semua user yang punya username
Todo.find({
    members : {$exists : true},
    members : {$in  : [req.body]}
})