import JWT from "jsonwebtoken";

export const checkEmail = (email) => {
    return true
};

export const hashPassword = (email) => {
    return true
};

export const validatePassword = (password) => {
    return true
};


export const createToken = (user) => {
    if (!user || !user.id || !user.email || !user.nome ) {
        throw new Error('Usuário inválido ou faltando campos necessários.');
    }

    const expiresIn = 24 * 60 * 60; // 24 horas em segundos

    try {
        const token = JWT.sign({
            id: user.id,
            email: user.email,
            nome: user.nome,
        }, process.env.JWT_SECRET_KEY, { expiresIn });

        console.log('Token criado com sucesso para o usuário:', user.id);
        return token;
    } catch (error) {
        console.error('Erro ao criar token:', error.message);
        throw new Error('Erro ao criar token.');
    }
};

export const validateToken = (password) => {
    return true
};