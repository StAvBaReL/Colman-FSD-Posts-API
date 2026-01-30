# Product Requirements Document (PRD)
## Posts & Comments REST API

**Version:** 1.0  
**Date:** January 30, 2026  
**Project Type:** Academic Assignment - REST API Development  
**Team Size:** 2 Students

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Requirements](#technical-requirements)
3. [API Specifications](#api-specifications)
4. [Data Models](#data-models)
5. [Collaboration Workflow](#collaboration-workflow)
6. [Testing Requirements](#testing-requirements)
7. [Deliverables](#deliverables)
8. [Work Distribution](#work-distribution)

---

## Project Overview

### Purpose
Create a REST API using Node.js and Express that manages Posts and Comments resources with full CRUD operations.

### Objectives
- Implement RESTful endpoints for Posts management
- Implement complete CRUD operations for Comments
- Practice collaborative development using Git and Pull Requests
- Demonstrate MongoDB integration
- Document all API requests in a `request.rest` file

### Scope
**In Scope:**
- Posts API (Create, Read by ID, Read all, Read by sender, Update)
- Comments API (Full CRUD + get comments by post)
- MongoDB database integration
- Manual testing via REST client
- Git collaboration workflow

**Out of Scope:**
- Unit tests (explicitly not required)
- Authentication/Authorization (unless specified)
- Frontend implementation
- Automated testing frameworks

---

## Technical Requirements

### Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose)
- **Language:** TypeScript (based on project standards)
- **Architecture:** MVC Pattern
- **Testing:** Manual testing using REST client (`.rest` files)

### Architecture Standards
Follow the project's established MVC architecture:
- **Models:** Database schemas for Post and Comment
- **Controllers:** Business logic using BaseController pattern
- **Routes:** Endpoint definitions with proper middleware
- **Middleware:** Request/response processing (if needed)

### Database Connection
- Connect to MongoDB as demonstrated in class
- Use environment variables for connection string
- Store MongoDB URI in `.env.dev` file

---

## API Specifications

### Posts API

#### 1. Add a New Post
- **Method:** `POST`
- **Endpoint:** `/post`
- **Description:** Allows a user to add a new post to the database
- **Request Body:**
  ```json
  {
    "title": "string (required)",
    "content": "string (required)",
    "sender": "string (required, user ID)"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "_id": "string",
    "title": "string",
    "content": "string",
    "sender": "string",
    "createdAt": "timestamp"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: Missing required fields
  - `500 Internal Server Error`: Database error

#### 2. Get All Posts
- **Method:** `GET`
- **Endpoint:** `/post`
- **Description:** Returns all posts in the database as a JSON array
- **Query Parameters:** None (base case)
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "sender": "string",
      "createdAt": "timestamp"
    }
  ]
  ```

#### 3. Get a Post by ID
- **Method:** `GET`
- **Endpoint:** `/post/:id`
- **Description:** Returns the post with the specified ID
- **URL Format:** `/post/<post_id>`
- **Response (200 OK):**
  ```json
  {
    "_id": "string",
    "title": "string",
    "content": "string",
    "sender": "string",
    "createdAt": "timestamp"
  }
  ```
- **Error Responses:**
  - `404 Not Found`: Post ID does not exist
  - `500 Internal Server Error`: Database error

#### 4. Get Posts by Sender
- **Method:** `GET`
- **Endpoint:** `/post?sender=<sender_id>`
- **Description:** Returns all posts published by a specific sender
- **Query Parameters:**
  - `sender` (string, required): The sender's ID
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "sender": "string",
      "createdAt": "timestamp"
    }
  ]
  ```

#### 5. Update a Post
- **Method:** `PUT`
- **Endpoint:** `/post/:id`
- **Description:** Updates a post with new data, replacing its current content
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "sender": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "_id": "string",
    "title": "string (updated)",
    "content": "string (updated)",
    "sender": "string (updated)",
    "updatedAt": "timestamp"
  }
  ```
- **Error Responses:**
  - `404 Not Found`: Post ID does not exist
  - `400 Bad Request`: Invalid data
  - `500 Internal Server Error`: Database error

---

### Comments API (Full CRUD)

#### 1. Create a Comment
- **Method:** `POST`
- **Endpoint:** `/comment`
- **Description:** Adds a new comment to a specific post
- **Request Body:**
  ```json
  {
    "content": "string (required)",
    "postId": "string (required, references Post)",
    "sender": "string (required, user ID)"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "_id": "string",
    "content": "string",
    "postId": "string",
    "sender": "string",
    "createdAt": "timestamp"
  }
  ```

#### 2. Get All Comments
- **Method:** `GET`
- **Endpoint:** `/comment`
- **Description:** Returns all comments in the database
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "string",
      "content": "string",
      "postId": "string",
      "sender": "string",
      "createdAt": "timestamp"
    }
  ]
  ```

#### 3. Get a Comment by ID
- **Method:** `GET`
- **Endpoint:** `/comment/:id`
- **Description:** Returns a specific comment by its ID
- **Response (200 OK):**
  ```json
  {
    "_id": "string",
    "content": "string",
    "postId": "string",
    "sender": "string",
    "createdAt": "timestamp"
  }
  ```

#### 4. Get Comments by Post ID
- **Method:** `GET`
- **Endpoint:** `/comment?postId=<post_id>`
- **Description:** Returns all comments associated with a specific post
- **Query Parameters:**
  - `postId` (string, required): The post's ID
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "string",
      "content": "string",
      "postId": "string",
      "sender": "string",
      "createdAt": "timestamp"
    }
  ]
  ```

#### 5. Update a Comment
- **Method:** `PUT`
- **Endpoint:** `/comment/:id`
- **Description:** Updates a comment's content
- **Request Body:**
  ```json
  {
    "content": "string (required)"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "_id": "string",
    "content": "string (updated)",
    "postId": "string",
    "sender": "string",
    "updatedAt": "timestamp"
  }
  ```

#### 6. Delete a Comment
- **Method:** `DELETE`
- **Endpoint:** `/comment/:id`
- **Description:** Deletes a comment by its ID
- **Response (200 OK):**
  ```json
  {
    "message": "Comment deleted successfully"
  }
  ```
- **Error Responses:**
  - `404 Not Found`: Comment ID does not exist
  - `500 Internal Server Error`: Database error

---

## Data Models

### Post Schema
```typescript
{
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  }
}
```

### Comment Schema
```typescript
{
  content: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true
  },
  sender: {
    type: String,
    required: true
  }
}
```

---

## Collaboration Workflow

### Team Structure
- **Team Size:** 2 students (pair programming)
- **Work Distribution:** Each student implements 50% of endpoints

### Git Workflow (MANDATORY)

#### Branch Strategy
1. **Create a feature branch for EACH API endpoint:**
   - Format: `feature/post-create`, `feature/post-get-by-id`, etc.
   - Example branches:
     ```
     feature/post-create
     feature/post-get-all
     feature/post-get-by-id
     feature/post-get-by-sender
     feature/post-update
     feature/comment-create
     feature/comment-get-all
     feature/comment-get-by-id
     feature/comment-get-by-post
     feature/comment-update
     feature/comment-delete
     ```

2. **Pull Request Process:**
   - Create a Pull Request (PR) for each feature branch
   - The **other student** must review and approve the PR
   - Only merge after approval
   - Include description of changes in PR

3. **Best Practices:**
   - Commit frequently with meaningful messages
   - Pull latest changes from main before creating new branch
   - Resolve merge conflicts promptly
   - Test manually before creating PR

---

## Testing Requirements

### Manual Testing via REST Client
- **Tool:** VS Code REST Client extension (or similar)
- **File:** `request.rest` (or `requests.rest`)
- **Coverage:** Each API endpoint must have corresponding test requests

### Test File Structure
Organize tests by resource:

```http
### Posts API Tests

### 1. Create a new post
POST http://localhost:3000/post
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first post",
  "sender": "user123"
}

###

### 2. Get all posts
GET http://localhost:3000/post

###

### 3. Get post by ID
GET http://localhost:3000/post/507f1f77bcf86cd799439011

###

### 4. Get posts by sender
GET http://localhost:3000/post?sender=user123

###

### 5. Update a post
PUT http://localhost:3000/post/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "sender": "user123"
}

###

### Comments API Tests

### 1. Create a comment
POST http://localhost:3000/comment
Content-Type: application/json

{
  "content": "Great post!",
  "postId": "507f1f77bcf86cd799439011",
  "sender": "user456"
}

### ... (continue for all endpoints)
```

### Testing Checklist
- ✅ Test successful requests (200, 201 responses)
- ✅ Test error cases (404, 400, 500 responses)
- ✅ Test with valid and invalid data
- ✅ Test query parameters
- ✅ Verify response format matches specification
- ✅ Test database persistence (verify data is saved)

---

## Deliverables

### Required Files
1. **Source Code:**
   - `src/model/postModel.ts`
   - `src/model/commentModel.ts`
   - `src/controllers/postController.ts`
   - `src/controllers/commentController.ts`
   - `src/routes/postRoutes.ts`
   - `src/routes/commentRoutes.ts`
   - Updated `src/index.ts` (register routes)

2. **Testing:**
   - `request.rest` or `requests.rest` (all API requests documented)

3. **Configuration:**
   - `.env.dev` (with MongoDB connection string)
   - `package.json` (with all dependencies)

4. **Documentation:**
   - `README.md` (setup and run instructions)
   - Git history with Pull Requests

### Submission Requirements
- Submit the GitHub repository URL
- Ensure all Pull Requests are visible in GitHub history
- Include clear commit messages
- Each student's contributions should be visible in Git history

---

## Work Distribution

### Suggested Division (Student A vs Student B)

#### Option 1: Split by Resource
**Student A - Posts API (5 endpoints):**
1. ✅ Add a new post (POST `/post`)
2. ✅ Get all posts (GET `/post`)
3. ✅ Get post by ID (GET `/post/:id`)
4. ✅ Get posts by sender (GET `/post?sender=<sender_id>`)
5. ✅ Update a post (PUT `/post/:id`)

**Student B - Comments API (6 endpoints):**
1. ✅ Create comment (POST `/comment`)
2. ✅ Get all comments (GET `/comment`)
3. ✅ Get comment by ID (GET `/comment/:id`)
4. ✅ Get comments by post (GET `/comment?postId=<post_id>`)
5. ✅ Update comment (PUT `/comment/:id`)
6. ✅ Delete comment (DELETE `/comment/:id`)

#### Option 2: Split by Operation Type
**Student A:**
- Posts: Create, Read (all), Read (by ID)
- Comments: Create, Read (all), Read (by ID)

**Student B:**
- Posts: Read (by sender), Update
- Comments: Read (by post), Update, Delete

### Testing Responsibility
- Each student creates REST client tests for their implemented endpoints
- Both students review and test each other's endpoints

---

## Implementation Guidelines

### Folder Structure
Follow the project's established structure:
```
src/
├── index.ts               # Register routes here
├── server.ts              # Entry point
├── controllers/
│   ├── baseController.ts  # Use inheritance pattern
│   ├── postController.ts
│   └── commentController.ts
├── model/
│   ├── postModel.ts
│   └── commentModel.ts
└── routes/
    ├── postRoutes.ts
    └── commentRoutes.ts
```

### Code Standards
- ✅ Use TypeScript
- ✅ Follow MVC architecture
- ✅ Extend `BaseController` for CRUD operations
- ✅ Use try-catch for error handling
- ✅ Follow naming conventions (camelCase, PascalCase)
- ✅ Include descriptive error messages

### Database Connection
```typescript
// In src/index.ts
import mongoose from "mongoose";

const initApp = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB");
  // ... rest of app initialization
};
```

---

## Success Criteria

### Functional Requirements
- ✅ All 11 API endpoints implemented and working
- ✅ Data persists in MongoDB
- ✅ Endpoints return correct HTTP status codes
- ✅ Response format matches specification
- ✅ Query parameters work correctly

### Collaboration Requirements
- ✅ Work distributed equally (50/50)
- ✅ Each API has its own feature branch
- ✅ Each API has a Pull Request
- ✅ All PRs reviewed and approved by partner
- ✅ Clean Git history with meaningful commits

### Documentation Requirements
- ✅ All endpoints documented in `request.rest`
- ✅ README includes setup instructions
- ✅ Code follows project standards
- ✅ Environment variables properly configured

---

## Timeline & Milestones

### Phase 1: Setup (Team)
- [ ] Initialize project structure
- [ ] Set up MongoDB connection
- [ ] Create base controller
- [ ] Agree on work distribution

### Phase 2: Development (Individual)
- [ ] Student A: Implement assigned endpoints
- [ ] Student B: Implement assigned endpoints
- [ ] Create feature branches for each endpoint
- [ ] Create REST client tests for each endpoint

### Phase 3: Integration (Team)
- [ ] Review and approve each other's PRs
- [ ] Merge all features to main branch
- [ ] Test entire API end-to-end
- [ ] Update documentation

### Phase 4: Submission
- [ ] Final testing
- [ ] Clean up code
- [ ] Verify all requirements met
- [ ] Submit repository link

---

## Notes

### Important Reminders
- **MongoDB Connection:** Connect to MongoDB as demonstrated in class
- **No Unit Tests Required:** Manual testing via REST client is sufficient
- **Pull Requests Are Mandatory:** Each API must have its own PR
- **Partner Approval Required:** Do not self-merge
- **Hebrew Instruction Translation:** "יש להגיש קו" appears truncated in requirements

### Resources
- Project Standards: See `AGENTS.md`
- REST Client Extension: VS Code Extension Marketplace
- MongoDB: Use connection string from class examples
- Git Workflow: Use feature branches + PRs

---

## Questions & Clarifications

If you have questions about:
- **API Behavior:** Refer to this PRD
- **Code Standards:** Refer to `AGENTS.md`
- **Git Workflow:** Follow the Pull Request process outlined above
- **Testing:** Use the REST client test structure provided

---

**Document Version History:**
- v1.0 (January 30, 2026) - Initial PRD based on assignment requirements
