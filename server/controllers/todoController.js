'use strict';
const {  Todo  } = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const readline = require('readline');
const {  google  } = require('googleapis');

class TodoControler {
    static createTodo(req, res, next) {
        let { id } = req.decoded
        let todo = {
            name: req.body.name,
            status: false,
            description: req.body.description,
            due_date: new Date(req.body.due_date),
            userId: id
        }
        Todo
            .create(todo)
            .then(result=> {
                res.status(201).json(result);
            })
            .catch(err=> {
                console.log(err)
            })
    }
    static markAskDone(req, res, next) {
        Todo
            .update({ _id: req.body.id }, { $set: {status: true} })
            .then(success=> {
                res.status(200).json({ msg: 'Nice one!' })
            })
            .catch(next)
    }
    static destroy(req, res, next) {
        Todo
            .deleteOne({ _id: req.body.id })
            .then(success=> {
                res.status(200).json('Deleted')
            })
            .catch(next)
    } 
    static todoList(req, res, next) {
        jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded)=> {
            if(err) next
            else {
                console.log(decoded)
                Todo
                    .find({userId: decoded.id})
                    .populate('userId')
                    .then(todos=> {
                        console.log(todos)
                        res.status(200).json(todos)
                    })
                    .catch(next);
            }
        })
    }

 };

module.exports = TodoControler;