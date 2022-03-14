module.exports = ({
  server,
  database
}) => {
  return {
    start: () =>
      Promise.resolve()
        .then(server.start)
  }
}
