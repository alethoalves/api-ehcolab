
export const reqIntercepter = (req, res, next) => {
    console.log(`➡️  ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)
    next();
}