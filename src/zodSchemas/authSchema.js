import { z } from 'zod';
// Função para remover caracteres não numéricos
import { apenasNumeros } from "../services/formatacao.js";
import { cpfValidator } from '../services/validators.js';

export const signupSchema = z.object({
    nome: z
      .string({ message: 'Nome é obrigatório!' }).trim()
      .min(2, 'Mínimo 2 caracteres!')
      .max(80, 'Limite de caracteres excedido!'),
    email: z
      .string({ message: 'Email é obrigatório!' }).trim()
      .min(1, 'Campo obrigatório!')
      .email({ message: 'Informe um email válido!' }),
    celular: z
      .preprocess((val) => apenasNumeros(String(val)),
        z.string({ message: 'Celular é obrigatório!' }).trim()
        .length(11, { message: 'Celular deve ter 11 dígitos!' })
      ),
    
    senha: z
      .string({ message: 'Senha é obrigatória!' }).trim()
      .min(1, 'Campo obrigatório!')
      .min(3, { message: 'Mínimo 3 caracteres!' }),
    confirmacaoSenha: z
      .string({ message: 'Senha é obrigatória!' }).trim()
      .min(1, 'Campo obrigatório!')
      .min(3, { message: 'Mínimo 3 caracteres!' }),
  }).refine(data => data.senha === data.confirmacaoSenha, {
    message: "As senhas devem coincidir",
    path: ["confirmacaoSenha"],
  });

export const signinSchema = z.object({
  email: z
    .string({ message: 'Email é obrigatório!' }).trim()
    .min(1, 'Campo obrigatório!')
    .email({ message: 'Informe um email válido!' }),
  senha: z
    .string({ message: 'Senha é obrigatória!' }).trim()
    .min(1, 'Campo obrigatório!')
    .min(3, { message: 'Mínimo 3 caracteres!' })

});
