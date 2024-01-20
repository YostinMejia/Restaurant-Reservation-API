export function notFoundMiddleware(req, res, next) {
    res.status(404).send("Url not found")
}