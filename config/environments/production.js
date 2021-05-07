module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 4000,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  notifications: {
    email: {
      sendgrid: {
        SG_ACCOUNT_ONE: process.env.SENDGRID_KEY_1,
        SG_ACCOUNT_TWO: process.env.SENDGRID_KEY_2,
        SG_ACCOUNT_THREE: process.env.SENDGRID_KEY_3
      }
    }
  }
}
