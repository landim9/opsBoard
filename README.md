# OpsBoard

Plataforma SaaS de gestão operacional com rotinas, execuções, audit trail e billing integrado.

## Visão Geral

O OpsBoard permite que empresas gerenciem rotinas operacionais (diárias, semanais, mensais), acompanhem execuções com SLA, e tenham visibilidade completa via audit trail — tudo com suporte a múltiplos workspaces e planos (Free / Pro / Business).

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend API | Fastify + TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js (Credentials + JWT) |
| Filas | BullMQ + Redis |
| Billing | Stripe (Checkout + Webhooks) |
| Monorepo | Turborepo + npm workspaces |

## Estrutura do Monorepo

```
opsBoard/
├── apps/
│   ├── web/          # Frontend Next.js
│   └── api/          # Backend Fastify
├── packages/
│   ├── db/           # Prisma schema + cliente compartilhado
│   ├── quota/        # Lógica de cotas por plano
│   ├── types/        # Tipos TypeScript compartilhados
│   └── ui/           # Componentes de UI compartilhados
├── turbo.json
└── package.json
```

## Pré-requisitos

- Node.js >= 20
- npm >= 10
- PostgreSQL rodando localmente (ou via Docker)
- Redis rodando localmente (ou via Docker)

## Setup Local

### 1. Clone e instale as dependências

```bash
git clone https://github.com/landim9/opsBoard.git
cd opsBoard
npm install
```

### 2. Configure as variáveis de ambiente

Copie os exemplos e preencha os valores:

```bash
# Frontend
cp apps/web/.env.example apps/web/.env.local

# API
cp apps/api/.env.example apps/api/.env

# Database package
cp packages/db/.env.example packages/db/.env
```

### 3. Rode o banco de dados e o Redis via Docker (opcional)

```bash
docker run -d --name opsboard-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=opsboard -p 5432:5432 postgres:16
docker run -d --name opsboard-redis -p 6379:6379 redis:7
```

### 4. Execute as migrations do Prisma

```bash
npm run db:migrate
```

### 5. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

O frontend estará em `http://localhost:3000` e a API em `http://localhost:3001`.

## Variáveis de Ambiente

### `apps/api/.env`

| Variável | Obrigatória | Descrição |
|---|---|---|
| `JWT_SECRET` | ✅ | Segredo para assinatura dos tokens JWT. Mínimo 32 chars. |
| `DATABASE_URL` | ✅ | Connection string do PostgreSQL. |
| `REDIS_URL` | ✅ | URL do Redis (padrão: `redis://localhost:6379`). |
| `STRIPE_SECRET_KEY` | ✅ | Chave secreta da Stripe (`sk_live_...` ou `sk_test_...`). |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Segredo do webhook da Stripe (`whsec_...`). |
| `STRIPE_PRO_PRICE_ID` | ✅ | ID do price da Stripe para o plano Pro. |
| `ALLOWED_ORIGINS` | ✅ | Origens permitidas no CORS, separadas por vírgula. Ex: `https://app.opsboard.com` |
| `PORT` | ❌ | Porta da API (padrão: `3001`). |
| `NODE_ENV` | ❌ | `development`, `test` ou `production`. |

### `apps/web/.env.local`

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXTAUTH_SECRET` | ✅ | Segredo para o NextAuth.js. |
| `NEXTAUTH_URL` | ✅ | URL base da aplicação (ex: `http://localhost:3000`). |
| `NEXT_PUBLIC_API_URL` | ✅ | URL pública da API Fastify. |
| `NEXT_PUBLIC_STRIPE_PRO_URL` | ❌ | URL da página de pricing (padrão: `/pricing`). |
| `DEV_STUB_EMAIL` | ❌ | Email do usuário stub (apenas em desenvolvimento). |
| `DEV_STUB_PASSWORD` | ❌ | Senha do usuário stub (apenas em desenvolvimento). |

### `packages/db/.env`

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | ✅ | Connection string do PostgreSQL. |

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia todos os apps em modo desenvolvimento. |
| `npm run build` | Builda todos os apps e packages. |
| `npm run lint` | Roda o linter em todos os packages. |
| `npm run format` | Formata todos os arquivos `.ts`, `.tsx` e `.md`. |
| `npm run db:generate` | Gera o Prisma client. |
| `npm run db:push` | Faz push do schema sem criar migration. |
| `npm run db:migrate` | Cria e aplica migrations. |
| `npm run db:studio` | Abre o Prisma Studio. |

## Modelos do Banco de Dados

- **Workspace** — Tenant raíz. Suporta hierarquia (matriz/filiais).
- **User** — Usuários do sistema. TOTP secret criptografado.
- **WorkspaceMember** — RBAC: `owner`, `manager`, `executor`, `viewer`.
- **Invitation** — Convites por email com token e expiração.
- **Routine** — Rotina operacional com frequência, cron, SLA e checklist.
- **Execution** — Instância de execução de uma rotina com status e evidências.
- **ActivityLog** — Audit trail append-only de todas as ações.
- **PlanQuota** — Cotas por plano (máx. usuários, rotinas, histórico, etc.).

## Workers (BullMQ)

| Worker | Schedule | Função |
|---|---|---|
| `routine-scheduler` | Diário às 00:00 | Gera execuções para rotinas ativas do dia. |
| `overdue-checker` | A cada 1 hora | Marca execuções vencidas como `overdue`. |

## Planos

| Recurso | Free | Pro | Business |
|---|---|---|---|
| Usuários | 3 | 20 | Ilimitado |
| Rotinas ativas | 10 | 50 | Ilimitado |
| Histórico | 30 dias | Ilimitado | Ilimitado |
| Exportação | ❌ | ✅ | ✅ |
| Audit Trail | ❌ | ✅ | ✅ |
| API Access | ❌ | ❌ | ✅ |
| Multi Unidade | ❌ | ❌ | ✅ |

## Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Commit suas alterações seguindo [Conventional Commits](https://www.conventionalcommits.org/)
4. Abra um Pull Request

## Licença

MIT
