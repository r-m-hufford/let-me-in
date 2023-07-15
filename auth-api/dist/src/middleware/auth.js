function auth(res, req, next) {
    console.log('auth middleware');
    next();
}
