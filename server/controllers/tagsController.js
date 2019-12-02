"use strict"

// const axios = require('axios').default;

class TagsController {

  static showAll(req, res) {
    axios({
      method: 'get',
      url: `https://api.predicthq.com/v1/events/?within=100km@${req.query.lat},${req.query.lon}`,
      headers: {Authorization: `Bearer p80xYIadCDRhpaOItRRzDuyKpv8EjrVObapVLmCJ`}
    })
    .then(concerts => {
      res.status(200).json(concerts.data.results)
    })
    .catch(err => {
      res.send(err.stack)
    })
  }

  static showOne(req, res) {
    axios({
      method: 'get',
      url: `https://api.predicthq.com/v1/events/?id=${req.params.id}`,
      headers: {Authorization: `Bearer p80xYIadCDRhpaOItRRzDuyKpv8EjrVObapVLmCJ`}
    })
    .then(concerts => {
      res.status(200).json(concerts.data.results)
    })
    .catch(err => {
      res.send(err.stack)
    })
  }

  static filter(req, res) {
    axios({
      method: 'get',
      url: `https://api.predicthq.com/v1/events/?label=${req.params.cat}`,
      headers: {Authorization: `Bearer p80xYIadCDRhpaOItRRzDuyKpv8EjrVObapVLmCJ`}
    })
    .then(concerts => {
      res.status(200).json(concerts.data.results)
    })
    .catch(err => {
      res.send(err.stack)
    })
  }

  static filterTime(req, res) {
    axios({
      method: 'get',
      url: `https://api.predicthq.com/v1/events/?active.gte=${date.start}&active.lte=${date.end}`,
      headers: {Authorization: `Bearer p80xYIadCDRhpaOItRRzDuyKpv8EjrVObapVLmCJ`}
    })
    .then(concerts => {
      res.status(200).json(concerts.data.results)
    })
    .catch(err => {
      res.send(err.stack)
    })
  }

  static search(req, res) {
    let val = req.params.value.replace(/ /g,"+");
    axios({
      method: 'get',
      url: `https://api.predicthq.com/v1/events/?q=${val}`,
      headers: {Authorization: `Bearer p80xYIadCDRhpaOItRRzDuyKpv8EjrVObapVLmCJ`}
    })
    .then(concerts => {
      res.status(200).json(concerts.data.results)
    })
    .catch(err => {
      res.send(err.stack)
    })
  }

}

module.exports = TagsController;