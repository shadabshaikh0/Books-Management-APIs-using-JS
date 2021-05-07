module.exports = ({
  server,
  database
}) => {
  return {
    start: () =>
      Promise.resolve()
        .then(database.sequelize.authenticate())
        .then(server.start)
  }
}
