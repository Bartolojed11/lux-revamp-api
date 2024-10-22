// Environment details
const ENVIRONMENT = process.env.NODE_ENV;
const PORT = process.env.PORT;

// JWT Token details
const API_SECRET = process.env.JWT_SECRET;
const API_TOKEN_TTL = process.env.API_EXPIRE_IN;
const API_COOKIE_TTL = process.env.API_COOKIE_EXPIRE_IN;

// App order prefix
const ORDER_PREFIX = process.env.ORDER_PREFIX;

module.exports = {
    ENVIRONMENT,
    PORT,
    API_SECRET,
    API_TOKEN_TTL,
    API_COOKIE_TTL,
    ORDER_PREFIX,
};
