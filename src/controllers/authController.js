import { z } from 'zod';
import * as servicesAuth from '../services/servicesAuth.js';
import { db } from '../libs/prisma.js';
import { signupSchema, signinSchema } from "../zodSchemas/authSchema.js";
import { hash, compare } from "../services/hash.js";
// Função de signup
export const signup = async (req, res) => {
    try {
        // Validar e parsear o corpo da requisição
        const body = signupSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({
                error: {
                    message: "Dados inválidos",
                    details: body.error 
                }}
            );
        }

        const { confirmacaoSenha, ...userData } = body.data;

        // Verificar se o CPF e/ou EMAIL já está em uso
        const existingUserByCpfOrEmail = await db.user.findFirst({
            where:  {email:userData.email}
        });

        if (existingUserByCpfOrEmail) {
            return res.status(409).json({
                error: {
                    message: "Usuário já cadastrado."
                }}
            );
        }

        // Criar o usuário
        const newUser = await db.user.create({
            data: {...userData,
                senha: await hash(userData.senha), // Assumindo que você tenha uma função para hash da senha
            },
        });

        // Gerar token para o usuário autenticado
        const token = servicesAuth.createToken(newUser);

        // Retornar o token
        res.status(201).json({
            success: {
                message: "Usuário cadastrado.",
                token
            }}
        );

    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({ error: {message:"Ocorreu um erro interno no servidor",details:error} });
    }
};

// Função de signin
export const signin = async (req, res) => {
    const body = signinSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ error:{ message: "Dados inválidos", details: body.error }});
    }

    const { email, senha } = body.data;

    try {
        // Verificar se o email e a senha são válidos
        const user = await db.user.findUnique({ where: { email } });
       
        if (!user || !(await compare(senha, user.senha))) {
            return res.status(403).json({ error: {message: "Email e/ou senha incorretos." }});
        }

        // Gerar token para o usuário autenticado
        const token = servicesAuth.createToken(user);

        // Retornar o token
        res.status(201).json({ success: {
            message: "Usuário logado.",
            token
        } });
    } catch (error) {
        // Captura qualquer erro que possa ocorrer na consulta ao banco de dados
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: {message:"Ocorreu um erro interno no servidor",details:error} });    }
};
