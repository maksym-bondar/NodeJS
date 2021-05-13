const responseMiddleware = (req, res, next) => {
  try {
    if (req && (req.method === "GET" || req.method === "DELETE")) {
      next();
    } else if (req && Object.keys(req.body).length) {
      next();
    }
  } catch (e) {
    res.status(400).json({ error: true, message: e.message });
  }
};

exports.responseMiddleware = responseMiddleware;
