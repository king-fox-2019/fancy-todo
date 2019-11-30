const Shibe = require('../apis/shibe')

class ShibeController {
  static getOne(req, res, next) {
    Shibe({
      url: "/shibes?count=1&urls=true",
      method: 'GET'
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ShibeController


