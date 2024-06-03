// Middleware para tratamento de erros
export const errorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Erro de sintaxe no JSON:', err);
        return res.status(400).json({ error: 'JSON malformado' });
    }

    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
};