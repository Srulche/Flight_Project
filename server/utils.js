const jwt = require('jsonwebtoken')

const createResponse = (msg, status, data) => {
  return {
    message: msg,
    status,
    data,
  };
};

const dateDiffInHours = (d1, d2) => {
  const durationInMilis = Math.abs(
    new Date(d1).getTime() - new Date(d2).getTime()
  );
  const hoursDiff = (durationInMilis / 3600000).toFixed(2);
  return hoursDiff;
};
const createToken = (body) => {
    return jwt.sign(body, process.env.SECRET, {
        expiresIn: "2d"
    })
}

const decodeToken = (token) => {
    return jwt.decode(token)
}

module.exports = {
  createResponse,
  dateDiffInHours,
  createToken,
  decodeToken
};
