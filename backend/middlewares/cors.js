const allowedCors = [
  'https://domainigor.students.nomoredomainsmonster.ru',
  'http://domainigor.students.nomoredomainsmonster.ru',
  'http://localhost:3000',
];
const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders, 'Content-Type');
      return res.end();
    }
  }
  return next();
};

module.exports = { corsMiddleware };
