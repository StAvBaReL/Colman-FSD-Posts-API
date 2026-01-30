# Development Standards & Best Practices

## 📋 Table of Contents
1. [Architecture Standards](#architecture-standards)
2. [Folder Structure Standards](#folder-structure-standards)
3. [Naming Conventions](#naming-conventions)
4. [API Design Standards](#api-design-standards)
5. [Authentication & Security](#authentication--security)
6. [Error Handling Standards](#error-handling-standards)
7. [Testing Standards](#testing-standards)
8. [Documentation Standards](#documentation-standards)
9. [Code Organization](#code-organization)
10. [Development Workflow](#development-workflow)

---

## Architecture Standards

### MVC Pattern
All projects MUST follow the MVC (Model-View-Controller) architecture:
- **Models**: Define database schemas and data structures
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and link them to controllers
- **Middleware**: Handle cross-cutting concerns (auth, validation, logging)

### Base Controller Pattern
**STANDARD**: Use inheritance-based controller pattern to avoid code duplication.

**Implementation**:
```typescript
// Base Controller (Abstract)
class BaseController {
    model: any;
    
    constructor(dataModel: any) {
        this.model = dataModel;
    }
    
    async get(req, res) { /* Generic GET logic */ }
    async getById(req, res) { /* Generic GET by ID */ }
    async post(req, res) { /* Generic POST */ }
    async put(req, res) { /* Generic PUT */ }
    async del(req, res) { /* Generic DELETE */ }
}

// Specific Controller
class MovieController extends BaseController {
    constructor() {
        super(Movie);
    }
    
    // Override ONLY when adding custom logic
    async post(req, res) {
        req.body.createdBy = req.user._id;
        return super.post(req, res);
    }
}
```

**Why**: Ensures DRY principle, consistent CRUD operations, easy extensibility.

### Separation of Concerns
**STANDARD**: Each layer has a single responsibility:
- **Routes**: Only define endpoints and apply middleware
- **Controllers**: Only handle business logic
- **Models**: Only define data structure and validation
- **Middleware**: Only handle request/response processing

---

## Folder Structure Standards

## Folder Structure Standards

### Mandatory Root Structure
```
/
├── src/                    # ALL source code goes here
├── dist/                   # Compiled output (auto-generated, git-ignored)
├── public/                 # Static files only
│   └── uploads/           # User-uploaded files
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── jest.config.ts         # Testing configuration
```

### Mandatory Source Structure
```
src/
├── index.ts               # Application configuration & initialization
├── server.ts              # Server entry point (calls index.ts)
├── swagger.ts             # API documentation config
├── controllers/           # Business logic ONLY
│   ├── baseController.ts # Abstract base for CRUD
│   └── {resource}Controller.ts
├── middleware/            # Request/response processing
│   └── {purpose}Middleware.ts
├── model/                 # Database schemas ONLY
│   └── {resource}Model.ts
├── routes/                # Endpoint definitions ONLY
│   └── {resource}Routes.ts
└── tests/                 # All test files
    ├── {resource}.test.ts
    └── testUtils.ts       # Shared test utilities
```

**RULES**:
1. One file per resource in each folder
2. No business logic in routes
3. No database queries in routes
4. Tests mirror source structure

---

## Naming Conventions

### File Naming
| Type | Pattern | Example |
|------|---------|---------|
| Controllers | `{resource}Controller.ts` | `movieController.ts` |
| Models | `{resource}Model.ts` | `userModel.ts` |
| Routes | `{resource}Routes.ts` | `authRoutes.ts` |
| Middleware | `{purpose}Middleware.ts` | `authMiddleware.ts` |
| Tests | `{resource}.test.ts` | `movies.test.ts` |

### Code Naming
- **Variables/Functions**: camelCase (`movieController`, `generateToken`)
- **Classes**: PascalCase (`BaseController`, `MovieController`)
- **Constants**: UPPER_SNAKE_CASE (in `.env` files)
- **Interfaces/Types**: PascalCase (`AuthRequest`, `Tokens`)
- **Database Models**: lowercase singular (`"user"`, `"movie"`, `"comment"`)

### Route Naming
- Use **plural nouns** for resource collections: `/movies`, `/comments`
- Use **singular nouns** when the route itself is singular: `/auth/login`
- Use **kebab-case** for multi-word endpoints: `/api-docs`

---

## API Design Standards

### Base URL Structure
```
http://localhost:{PORT}/{resource}/{action|id}
```

### Standard CRUD Endpoints
Every resource MUST follow this pattern:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/{resource}` | Get all items (with optional query filters) | No* |
| GET | `/{resource}/:id` | Get single item by ID | No* |
| POST | `/{resource}` | Create new item | Yes |
| PUT | `/{resource}/:id` | Update item by ID | Yes |
| DELETE | `/{resource}/:id` | Delete item by ID | Yes |

*Auth requirements may vary by resource

### Example: Movie API
```
GET    /movie              # Get all movies
GET    /movie/:id          # Get movie by ID
POST   /movie              # Create movie (auth required)
PUT    /movie/:id          # Update movie (auth required, owner only)
DELETE /movie/:id          # Delete movie (auth required, owner only)
```

### Query Parameters
- Filters are passed as query parameters: `GET /movie?title=Inception`
- All query params are optional
- Controller automatically handles filtering via `req.query`

### Response Structure

**Success Response:**
```json
{
  "data": { /* object or array */ }
}
```

**Error Response:**
```json
{
  "error": "Error message here"
}
```

### HTTP Status Codes
- **200 OK**: Successful GET, PUT
- **201 Created**: Successful POST
- **400 Bad Request**: Validation error
- **401 Unauthorized**: Missing/invalid token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Response Format Standards

**Success Response:**
```json
{
  "data": { /* object or array */ }
}
```

**Error Response:**
```json
{
  "error": "Error message here"
}
```

### HTTP Status Codes (REQUIRED)
- **200 OK**: Successful GET, PUT
- **201 Created**: Successful POST
- **400 Bad Request**: Validation error
- **401 Unauthorized**: Missing/invalid token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

---

## Authentication & Security

### Authentication Strategy
- **JWT (JSON Web Tokens)** for stateless authentication
- **Dual Token System**: Access token + Refresh token

### Token Configuration
```typescript
// Environment Variables
JWT_SECRET=secretkey
JWT_EXPIRES_IN=3600        // 1 hour
JWT_REFRESH_EXPIRES_IN=86400 // 24 hours
```

### Auth Flow
1. **Register/Login** → Receive access token + refresh token
2. **Protected Routes** → Include `Authorization: Bearer {token}` header
3. **Token Refresh** → Use refresh token to get new access token

### Middleware Usage
```typescript
// In routes
import authMiddleware from "../middleware/authMiddleware";

router.post("/movie", authMiddleware, movieController.post);
```

### Password Security
- **Bcrypt** for password hashing
- Salt rounds: 10
- Passwords never stored in plain text

### CORS Configuration
```typescript
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "*");
res.header("Access-Control-Allow-Methods", "*");
```

---

## Error Handling Standards

### Controller-Level Error Handling
All controllers use try-catch blocks:

```typescript
async method(req, res) {
    try {
        // Business logic
        const result = await this.model.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        });
    }
}
```

### Standard Error Response
```typescript
const sendError = (res: Response, message: string, code?: number) => {
    const errCode = code || 400;
    res.status(errCode).json({ error: message });
}
```

### Validation Errors
- Check required fields at the start of controller methods
- Return `400` or `401` with descriptive error message
- Example:
  ```typescript
  if (!email || !password) {
      return sendError(res, "Email and password are required", 401);
  }
  ```

---

## Testing Standards

### Test Organization
- Test files in `/src/tests/`
- One test file per resource: `{resource}.test.ts`
- Shared utilities in `testUtils.ts`

### Testing Framework
- **Jest** as test runner
- **Supertest** for HTTP assertions
- **ts-jest** for TypeScript support

### Test Execution
```bash
npm test              # Run all tests
npm run testauth      # Run auth tests only
npm run testmovie     # Run movie tests only
npm run testcomment   # Run comment tests only
npm run testmulter    # Run multer tests only
```

### Test Configuration
- **Run in band** (`--runInBand`): Tests run sequentially
- **Detect open handles** (`--detectOpenHandles`): Find async operations that prevent exit
- **Force exit** (`--forceExit`): Ensure tests terminate

### Test Structure
```typescript
describe('Resource Name', () => {
    beforeAll(async () => {
        // Setup (e.g., connect to test DB)
    });

    afterAll(async () => {
        // Cleanup (e.g., close connections)
    });

    test('should do something', async () => {
        // Arrange, Act, Assert
    });
});
```

---

## Documentation Standards

### API Documentation with Swagger
- **Swagger UI** available at `/api-docs`
- **JSON spec** available at `/api-docs.json`

### Swagger Annotations
Every route must have Swagger documentation:

```typescript
/**
 * @swagger
 * /resource/{id}:
 *   get:
 *     summary: Short description
 *     description: Detailed description
 *     tags: [ResourceName]
 *     security: []  # No auth required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get("/:id", controller.getById);
```

### Schema Definitions
Define reusable schemas in Swagger config (`swagger.ts`):

```typescript
components: {
    schemas: {
        Movie: {
            type: 'object',
            properties: {
                _id: { type: 'string' },
                title: { type: 'string' },
                releaseYear: { type: 'number' },
                createdBy: { type: 'string' }
            }
        }
    }
}
```

---

## Development Workflow

### Environment Configuration
- Use `.env.dev` for development environment variables
- Required variables:
  - `PORT`: Server port (e.g., 3000)
  - `MONGODB_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret for JWT signing
  - `JWT_EXPIRES_IN`: Access token expiration (seconds)
  - `JWT_REFRESH_EXPIRES_IN`: Refresh token expiration (seconds)

### Scripts
```bash
npm run dev     # Development with nodemon (auto-reload)
npm start       # Production build and run
npm test        # Run all tests
npm run lint    # Check code style
```

### Build Process
1. TypeScript compiles to `/dist`
2. Source maps generated for debugging
3. Compiled output uses CommonJS modules

---

## Code Organization

### Model Definition Pattern
```typescript
import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  field: {
    type: String,      // Data type
    required: true,    // Validation
    unique: true,      // Constraint (optional)
  },
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "otherModel", // Reference to another model
    required: true,
  },
});

export default mongoose.model("resource", resourceSchema);
```

### Mongoose Connection
- Connection handled in `index.ts`
- Database URI from environment variables
- Connection wrapped in Promise for async initialization

---

## Development Workflow

### ✅ DO
- Extend `BaseController` for standard CRUD operations
- Use `authMiddleware` for protected routes
- Document all routes with Swagger annotations
- Handle errors with try-catch in all async functions
- Use TypeScript types and interfaces
- Store sensitive data in environment variables
- Hash passwords with bcrypt
- Use JWT for authentication
- Write tests for all features
- Follow consistent naming conventions

### ❌ DON'T
- Don't expose sensitive data in responses
- Don't store passwords in plain text
- Don't commit `.env` files to version control
- Don't skip error handling
- Don't bypass authentication on sensitive routes
- Don't use `any` type unless absolutely necessary
- Don't mix authentication logic with business logic

---

## Adding New Features

### Adding a New Resource (Example: "Book")

1. **Create Model** (`src/model/bookModel.ts`):
   ```typescript
   import mongoose from "mongoose";
   
   const bookSchema = new mongoose.Schema({
     title: { type: String, required: true },
     author: { type: String, required: true },
     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
   });
   
   export default mongoose.model("book", bookSchema);
   ```

2. **Create Controller** (`src/controllers/bookController.ts`):
   ```typescript
   import Book from "../model/bookModel";
   import BaseController from "./baseController";
   
   class BookController extends BaseController {
     constructor() {
       super(Book);
     }
     // Add custom methods if needed
   }
   
   export default new BookController();
   ```

3. **Create Routes** (`src/routes/bookRoutes.ts`):
   ```typescript
   import express from "express";
   import bookController from "../controllers/bookController";
   import authMiddleware from "../middleware/authMiddleware";
   
   const router = express.Router();
   
   router.get("/", bookController.get.bind(bookController));
   router.post("/", authMiddleware, bookController.post.bind(bookController));
   // ... other routes with Swagger docs
   
   export default router;
   ```

4. **Register Routes** (in `src/index.ts`):
   ```typescript
   import bookRoutes from "./routes/bookRoutes";
   app.use("/book", bookRoutes);
   ```

5. **Write Tests** (`src/tests/book.test.ts`)

