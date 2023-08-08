/* eslint-disable */
import beConfig from '../../beConfig';

const jwt = require('jsonwebtoken');

export function tokenParser(req, res, next) {
  req.decodedToken = jwt.decode(req.headers[beConfig.jwtConfig.headerName], beConfig.jwtConfig.secretOrKey);
  next();
}
