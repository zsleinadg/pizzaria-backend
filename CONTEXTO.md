# Documento de Contexto do Projeto - Backend Pizzaria

## 📋 Índice
1. [Arquitetura](#arquitetura)
2. [Organização de Pastas](#organização-de-pastas)
3. [Tecnologias e Versões](#tecnologias-e-versões)
4. [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
5. [Validação de Schemas](#validação-de-schemas)
6. [Endpoints](#endpoints)
7. [Middlewares](#middlewares)
8. [Configurações](#configurações)

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

```
Rotas → Controller → Service → Banco de Dados (Prisma)
  ↓         ↓          ↓
Middleware  ↓          ↓
  ↓         ↓          ↓
Validação   ↓          ↓
  ↓         ↓          ↓
Usuário ← Response ← Service
```

### Fluxo de Requisição

1. **Rotas (`routes.ts`)**: Define os endpoints e aplica middlewares (validação, autenticação, autorização)
2. **Controller**: Recebe a requisição HTTP, extrai os dados do body/params/query e chama o Service apropriado
3. **Service**: Contém toda a lógica de negócio, interage com o banco de dados através do Prisma Client e retorna os dados processados
4. **Controller**: Recebe a resposta do Service e retorna para o usuário com o status HTTP apropriado

### Princípios da Arquitetura

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
- **Reutilização**: Services podem ser reutilizados em diferentes controllers
- **Testabilidade**: A separação facilita a criação de testes unitários
- **Manutenibilidade**: Código organizado e fácil de manter

---

## 📁 Organização de Pastas

```
backend/
├── prisma/
│   ├── migrations/           # Migrações do banco de dados
│   └── schema.prisma         # Schema do Prisma (modelagem do BD)
├── src/
│   ├── @types/               # Definições de tipos TypeScript
│   │   └── express/
│   │       └── index.d.ts    # Extensão do tipo Request do Express
│   ├── controllers/          # Controllers (camada de controle)
│   │   ├── category/
│   │   │   └── create-category-controller.ts
│   │   └── user/
│   │       ├── auth-user-controller.ts
│   │       ├── create-user-controller.ts
│   │       └── detail.user-controller.ts
│   ├── middlewares/          # Middlewares do Express
│   │   ├── isAdmin.ts        # Verifica se usuário é ADMIN
│   │   ├── isAuthenticated.ts # Verifica autenticação JWT
│   │   └── validateSchema.ts # Validação de schemas Zod
│   ├── prisma/
│   │   └── index.ts          # Instância do Prisma Client
│   ├── routes.ts             # Definição de todas as rotas
│   ├── schemas/              # Schemas de validação Zod
│   │   ├── categorySchema.ts
│   │   └── userSchema.ts
│   ├── services/             # Services (lógica de negócio)
│   │   ├── category/
│   │   │   └── create-category-service.ts
│   │   └── user/
│   │       ├── auth-user-service.ts
│   │       ├── create-user-service.ts
│   │       └── detail-user-service.ts
│   └── server.ts             # Configuração do servidor Express
├── package.json              # Dependências do projeto
├── tsconfig.json            # Configuração do TypeScript
└── prisma.config.ts         # Configuração do Prisma
```

---

## 🛠️ Tecnologias e Versões

### Dependências Principais

| Biblioteca | Versão | Descrição |
|------------|--------|-----------|
| **express** | ^5.2.1 | Framework web para Node.js |
| **@prisma/client** | ^7.3.0 | Cliente Prisma ORM |
| **@prisma/adapter-pg** | ^7.3.0 | Adaptador PostgreSQL para Prisma |
| **prisma** | ^7.3.0 | CLI do Prisma (dev) |
| **pg** | ^8.17.2 | Driver PostgreSQL |
| **zod** | ^4.3.5 | Biblioteca de validação de schemas |
| **jsonwebtoken** | ^9.0.3 | Geração e verificação de tokens JWT |
| **bcryptjs** | ^3.0.3 | Hash de senhas |
| **cors** | ^2.8.5 | Middleware CORS |
| **dotenv** | ^17.2.3 | Gerenciamento de variáveis de ambiente |
| **tsx** | ^4.21.0 | Executor TypeScript |

### Dependências de Desenvolvimento

| Biblioteca | Versão | Descrição |
|------------|--------|-----------|
| **typescript** | ^5.9.3 | Linguagem TypeScript |
| **@types/express** | ^5.0.6 | Tipos TypeScript para Express |
| **@types/node** | ^25.0.10 | Tipos TypeScript para Node.js |
| **@types/cors** | ^2.8.19 | Tipos TypeScript para CORS |
| **@types/jsonwebtoken** | ^9.0.10 | Tipos TypeScript para JWT |
| **@types/pg** | ^8.16.0 | Tipos TypeScript para PostgreSQL |

### Runtime e Ambiente

- **Node.js**: Compatível com versões que suportam ES2020
- **TypeScript**: 5.9.3
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma 7.3.0

---

## 🗄️ Modelagem do Banco de Dados

### Provider
- **PostgreSQL** (via Prisma)

### Models

#### 1. User (Usuário)
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(STAFF)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

**Campos:**
- `id`: UUID (chave primária)
- `name`: Nome do usuário
- `email`: Email único
- `password`: Senha criptografada (bcrypt)
- `role`: Enum Role (STAFF ou ADMIN)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### 2. Category (Categoria)
```prisma
model Category {
  id        String    @id @default(uuid())
  name      String
  products  Product[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@map("categories")
}
```

**Campos:**
- `id`: UUID (chave primária)
- `name`: Nome da categoria
- `products`: Relação 1:N com Product
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### 3. Product (Produto)
```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  price       Int
  description String
  banner      String
  disabled    Boolean  @default(false)
  category_id String
  category    Category @relation(fields: [category_id], references: [id], onDelete: Cascade)
  items       Item[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

**Campos:**
- `id`: UUID (chave primária)
- `name`: Nome do produto
- `price`: Preço (Int - em centavos)
- `description`: Descrição do produto
- `banner`: URL da imagem do produto
- `disabled`: Status de ativação (default: false)
- `category_id`: FK para Category
- `category`: Relação N:1 com Category
- `items`: Relação 1:N com Item
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### 4. Order (Pedido)
```prisma
model Order {
  id        String   @id @default(uuid())
  table     Int
  status    Boolean  @default(false)
  draft     Boolean  @default(true)
  name      String?
  items     Item[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("orders")
}
```

**Campos:**
- `id`: UUID (chave primária)
- `table`: Número da mesa
- `status`: Status do pedido (default: false)
- `draft`: Se é rascunho (default: true)
- `name`: Nome do cliente (opcional)
- `items`: Relação 1:N com Item
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

#### 5. Item (Item do Pedido)
```prisma
model Item {
  id         String   @id @default(uuid())
  amount     Int
  order_id   String
  order      Order    @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product_id String
  product    Product  @relation(fields: [product_id], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("items")
}
```

**Campos:**
- `id`: UUID (chave primária)
- `amount`: Quantidade do item
- `order_id`: FK para Order
- `order`: Relação N:1 com Order
- `product_id`: FK para Product
- `product`: Relação N:1 com Product
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

### Enums

```prisma
enum Role {
  STAFF
  ADMIN
}
```

### Relacionamentos

- **Category → Product**: 1:N (Uma categoria tem muitos produtos)
- **Product → Item**: 1:N (Um produto pode estar em muitos itens)
- **Order → Item**: 1:N (Um pedido tem muitos itens)
- **Product → Category**: N:1 (Muitos produtos pertencem a uma categoria)
- **Item → Order**: N:1 (Muitos itens pertencem a um pedido)
- **Item → Product**: N:1 (Muitos itens referenciam um produto)

### Constraints

- **Cascade Delete**: Ao deletar uma Category, todos os Products relacionados são deletados. Ao deletar um Product ou Order, todos os Items relacionados são deletados.
- **Unique**: Email do usuário deve ser único.

---

## ✅ Validação de Schemas

O projeto utiliza **Zod** para validação de dados de entrada. Os schemas são definidos na pasta `src/schemas/` e aplicados através do middleware `validateSchema`.

### Estrutura de Validação

O middleware `validateSchema` valida:
- `body`: Dados do corpo da requisição
- `query`: Parâmetros de query string
- `params`: Parâmetros de rota

### Schemas Implementados

#### 1. User Schemas (`userSchema.ts`)

**createUserSchema:**
```typescript
{
  body: {
    name: string (mínimo 3 caracteres)
    email: string (formato de email válido)
    password: string (
      mínimo 8 caracteres,
      deve conter: 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial
    )
  }
}
```

**authUserSchema:**
```typescript
{
  body: {
    email: string (formato de email válido)
    password: string (obrigatório)
  }
}
```

#### 2. Category Schema (`categorySchema.ts`)

**createCategorySchema:**
```typescript
{
  body: {
    name: string (mínimo 2 caracteres)
  }
}
```

### Resposta de Erro de Validação

Quando a validação falha, o middleware retorna:

```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "body.email",
      "message": "Invalid email"
    }
  ]
}
```

Status HTTP: **400 Bad Request**

---

## 🔌 Endpoints

### Base URL
```
http://localhost:3333
```

### Endpoints de Usuário

#### 1. Criar Usuário
- **Método**: `POST`
- **Rota**: `/users`
- **Autenticação**: Não requerida
- **Validação**: `createUserSchema`
- **Body**:
  ```json
  {
    "name": "string (min: 3)",
    "email": "string (email válido)",
    "password": "string (min: 8, com maiúscula, minúscula, número e especial)"
  }
  ```
- **Resposta de Sucesso** (201):
  ```json
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "STAFF",
    "createdAt": "datetime"
  }
  ```

#### 2. Autenticar Usuário (Login)
- **Método**: `POST`
- **Rota**: `/session`
- **Autenticação**: Não requerida
- **Validação**: `authUserSchema`
- **Body**:
  ```json
  {
    "email": "string (email válido)",
    "password": "string"
  }
  ```
- **Resposta de Sucesso** (200):
  ```json
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "STAFF | ADMIN",
    "token": "jwt_token"
  }
  ```

#### 3. Detalhes do Usuário Logado
- **Método**: `GET`
- **Rota**: `/me`
- **Autenticação**: Requerida (`isAuthenticated`)
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Resposta de Sucesso** (200):
  ```json
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "STAFF | ADMIN",
    "createdAt": "datetime"
  }
  ```

### Endpoints de Categoria

#### 1. Criar Categoria
- **Método**: `POST`
- **Rota**: `/category`
- **Autenticação**: Requerida (`isAuthenticated`)
- **Autorização**: Apenas ADMIN (`isAdmin`)
- **Validação**: `createCategorySchema`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
    "name": "string (min: 2)"
  }
  ```
- **Resposta de Sucesso** (201):
  ```json
  {
    "id": "uuid",
    "name": "string",
    "createdAt": "datetime"
  }
  ```

### Respostas de Erro

#### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [...]
}
```

#### 401 Unauthorized
```json
{
  "error": "Token not provided" | "Invalid token" | "User without permission"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error!"
}
```

---

## 🛡️ Middlewares

### 1. validateSchema
- **Localização**: `src/middlewares/validateSchema.ts`
- **Função**: Valida dados de entrada usando schemas Zod
- **Uso**: Aplicado nas rotas antes do controller
- **Retorno**: 
  - Sucesso: Chama `next()`
  - Erro: Retorna 400 com detalhes da validação

### 2. isAuthenticated
- **Localização**: `src/middlewares/isAuthenticated.ts`
- **Função**: Verifica se o usuário está autenticado via JWT
- **Headers Requeridos**: `Authorization: Bearer <token>`
- **Comportamento**: 
  - Extrai o token do header
  - Verifica e decodifica o JWT
  - Adiciona `user_id` ao objeto `req`
- **Retorno**:
  - Sucesso: Chama `next()`
  - Erro: Retorna 401 se token ausente ou inválido

### 3. isAdmin
- **Localização**: `src/middlewares/isAdmin.ts`
- **Função**: Verifica se o usuário autenticado tem role ADMIN
- **Dependência**: Deve ser usado após `isAuthenticated`
- **Comportamento**:
  - Busca o usuário no banco usando `req.user_id`
  - Verifica se `role === "ADMIN"`
- **Retorno**:
  - Sucesso: Chama `next()`
  - Erro: Retorna 401 se usuário não for ADMIN

### Ordem de Aplicação dos Middlewares

```
validateSchema → isAuthenticated → isAdmin → Controller
```

---

## ⚙️ Configurações

### TypeScript (`tsconfig.json`)

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Ativado (todas as verificações estritas)
- **Source Maps**: Habilitado
- **OutDir**: `./dist`
- **RootDir**: `./src`

### Prisma

- **Provider**: PostgreSQL
- **Client Output**: `../src/generated/prisma`
- **Migrations**: `prisma/migrations/`

### Servidor Express

- **Porta**: `3333` (ou `process.env.PORT`)
- **CORS**: Habilitado
- **JSON Parser**: Habilitado
- **Error Handler**: Middleware global para tratamento de erros

### Variáveis de Ambiente

O projeto utiliza `dotenv` para gerenciar variáveis de ambiente. Arquivo `.env` necessário:

```env
PORT=3333
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=your_secret_key_here
```

### Scripts Disponíveis

```json
{
  "dev": "tsx watch src/server.ts"
}
```

- **dev**: Inicia o servidor em modo desenvolvimento com hot-reload

---

## 📝 Convenções de Código

### Nomenclatura

- **Controllers**: `*-controller.ts` (ex: `create-user-controller.ts`)
- **Services**: `*-service.ts` (ex: `create-user-service.ts`)
- **Schemas**: `*Schema.ts` (ex: `userSchema.ts`)
- **Classes**: PascalCase (ex: `CreateUserController`)
- **Funções/Métodos**: camelCase (ex: `handle`, `execute`)
- **Arquivos**: kebab-case (ex: `create-user-controller.ts`)

### Estrutura de Controller

```typescript
class ControllerName {
    async handle(req: Request, res: Response) {
        // Extrai dados da requisição
        // Instancia o Service
        // Chama o Service
        // Retorna resposta
    }
}
```

### Estrutura de Service

```typescript
class ServiceName {
    async execute(props: InterfaceProps) {
        // Lógica de negócio
        // Interação com banco (Prisma)
        // Retorna dados processados
    }
}
```

---

## 🔐 Segurança

### Autenticação
- **JWT (JSON Web Token)**: Tokens com expiração de 30 dias
- **Hash de Senhas**: bcryptjs com salt rounds = 8

### Autorização
- **Role-based**: Sistema de roles (STAFF, ADMIN)
- **Middleware de Verificação**: `isAdmin` para rotas administrativas

### Validação
- **Zod**: Validação rigorosa de entrada
- **Sanitização**: Prevenção de dados maliciosos

---

## 📚 Recursos Adicionais

### Extensões de Tipo TypeScript

O projeto estende o tipo `Request` do Express para incluir `user_id`:

```typescript
declare namespace Express {
    export interface Request {
        user_id: string
    }
}
```

### Prisma Client

Instância customizada do Prisma Client com adaptador PostgreSQL:

```typescript
import { PrismaClient } from "../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString })
const prismaClient = new PrismaClient({ adapter })
```

---

## 📅 Última Atualização

**Data**: 25 de Janeiro de 2026

---

## 👥 Contribuição

Este documento deve ser atualizado sempre que houver mudanças significativas na arquitetura, endpoints, ou estrutura do projeto.
