import JWT from "jsonwebtoken";

export const privateRouteAdmin = ((req, res, next) => {
    let success = false;

    // Fazer verificação de auth
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Assumindo que o token é enviado no formato "Bearer <token>"

        try {
            const user = JWT.verify(token, process.env.JWT_SECRET_KEY);

            // Verifique se o usuário tem permissão de administrador
            if (user) {
                return res.status(201).json({ message: 'Acesso autorizado.',data:user });
            } else {
                return res.status(403).json({ message: 'Acesso não autorizado.' });
            }
        } catch (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
    } else {
        return res.status(401).json({ message: 'Autorização ausente.' });
    }

    if (success) {
        next();
    }
});
