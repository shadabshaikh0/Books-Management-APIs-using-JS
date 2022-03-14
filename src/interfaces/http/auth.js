import passport from 'passport'
import {
  ExtractJwt,
  Strategy
} from 'passport-jwt'

module.exports = ({
  config,
  userService,
  CustomError,
  constants: { UNAUTHORIZED_REQUEST }
}) => {
  const params = {
    secretOrKey: config.authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const JWTStrategy = new Strategy(params, (payload, done) => {
    userService
      .findUser(payload.id)
      .then(user => {
        if (!user) {
          return done(new Error('Token expired'), null)
        }
        done(null, user)
      })
      .catch(error => done(error, null))
  })

  passport.use(JWTStrategy)

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })
  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return (req, res, next) => passport.authenticate('jwt', null, (error, user, info) => {
        if (error || !user) {
          next(new CustomError(
            UNAUTHORIZED_REQUEST.code,
            UNAUTHORIZED_REQUEST.status,
            info
          ))
        }
        req.user = user
        next()
      })(req, res, next)
    }
  }
}
