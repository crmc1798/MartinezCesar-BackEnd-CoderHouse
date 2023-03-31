const Route = require("../../router/Class.Router");

class ChatRouter extends Route {
  init() {
    this.get('/', ['PUBLIC'], (req, res) => {
      res.render('chat.handlebars', {})
    })
  }
}

module.exports = ChatRouter;