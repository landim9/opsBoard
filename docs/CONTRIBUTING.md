# Contribuindo com o OpsBoard

Obrigado por querer contribuir! Este guia cobre o fluxo de trabalho esperado.

## Fluxo de Branches

| Prefixo | Uso |
|---|---|
| `feat/` | Nova funcionalidade |
| `fix/` | Correção de bug |
| `chore/` | Manutenção (deps, CI, configs) |
| `docs/` | Documentação |
| `refactor/` | Refatoração sem mudança de comportamento |
| `test/` | Testes |

## Convenção de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(api): adicionar endpoint de exportação CSV
fix(workers): corrigir timezone na geração de rotinas
chore: atualizar dependências
docs: melhorar README com guia de setup
```

## Checklist antes do PR

- [ ] `npm run lint` passa sem erros
- [ ] `npm run build` compila sem erros de TypeScript
- [ ] Testes relevantes adicionados ou atualizados
- [ ] Variáveis de ambiente novas documentadas no `.env.example` correspondente
- [ ] Migrations do Prisma criadas se o schema foi alterado

## Setup Local

Veja o [README principal](../README.md#setup-local) para instruções completas.

## Reportando Bugs

Abra uma issue com:
1. Descrição do comportamento esperado vs. atual
2. Passos para reproduzir
3. Versão do Node.js e sistema operacional
4. Logs relevantes (sem dados sensíveis)
