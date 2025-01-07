export function verificarRol(rolPermitido) {
    return function (req, res, next) {
        if (req.user && req.user.role === rolPermitido) {
            next();
        } else {
            res.status(403).send(`Acceso denegado, este lugar es solo para ${rolPermitido}s.`);
        }
    };
}
