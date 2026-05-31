# 🔐 RBAC System - Complete API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication Header Format
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📋 Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:**
```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "viewer"  // Optional: viewer (default), editor, admin
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john",
    "email": "john@example.com",
    "role": "viewer"
  }
}
```

**Error Response (400/409):**
```json
{
  "error": "User already exists"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "securepass123",
    "role": "viewer"
  }'
```

---

### 2. Login User
Authenticate and receive JWT token.

**Endpoint:**
```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "alice",
  "password": "1234"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "alice",
    "email": "alice@example.com",
    "role": "admin"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "1234"
  }'
```

---

### 3. Get Current User
Retrieve authenticated user profile.

**Endpoint:**
```
GET /auth/me
```

**Authentication:** ✅ Required

**Success Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "alice",
  "email": "alice@example.com",
  "role": "admin"
}
```

**Error Response (401):**
```json
{
  "error": "No token provided"
}
```

**Example:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 4. Verify Permission
Check if current user can perform an action.

**Endpoint:**
```
POST /auth/verify-permission
```

**Authentication:** ✅ Required

**Request Body:**
```json
{
  "action": "delete"  // create, read, update, delete, manage_users
}
```

**Success Response (200):**
```json
{
  "action": "delete",
  "role": "admin",
  "hasAccess": true,
  "permissions": ["create", "read", "update", "delete", "manage_users"]
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/auth/verify-permission \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"action": "delete"}'
```

---

## 👥 User Management Endpoints

### 5. Get All Users
List all registered users (Admin only).

**Endpoint:**
```
GET /users
```

**Authentication:** ✅ Required (Admin only)

**Success Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "alice",
    "email": "alice@example.com",
    "role": "admin",
    "created_at": "2024-05-31 10:30:00"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "username": "bob",
    "email": "bob@example.com",
    "role": "editor",
    "created_at": "2024-05-31 10:35:00"
  }
]
```

**Error Response (403):**
```json
{
  "error": "Insufficient permissions"
}
```

**Example:**
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

---

### 6. Get User by ID
Retrieve specific user profile.

**Endpoint:**
```
GET /users/:id
```

**Parameters:**
- `id` - User ID (UUID)

**Authentication:** ✅ Required (Self or Admin)

**Success Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "username": "bob",
  "email": "bob@example.com",
  "role": "editor",
  "created_at": "2024-05-31 10:35:00"
}
```

**Error Response:**
- 403: Insufficient permissions (non-admins can only view own profile)
- 404: User not found

**Example:**
```bash
curl -X GET http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <TOKEN>"
```

---

### 7. Update User
Change user role or email (Admin only).

**Endpoint:**
```
PUT /users/:id
```

**Parameters:**
- `id` - User ID (UUID)

**Authentication:** ✅ Required (Admin only)

**Request Body:**
```json
{
  "role": "admin",
  "email": "newemail@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "username": "bob",
    "email": "newemail@example.com",
    "role": "admin"
  }
}
```

**Error Response:**
- 400: Invalid role
- 403: Insufficient permissions
- 404: User not found

**Example:**
```bash
curl -X PUT http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin",
    "email": "bob.new@example.com"
  }'
```

---

### 8. Delete User
Remove a user from system (Admin only).

**Endpoint:**
```
DELETE /users/:id
```

**Parameters:**
- `id` - User ID (UUID)

**Authentication:** ✅ Required (Admin only)

**Success Response (200):**
```json
{
  "message": "User 'bob' deleted successfully"
}
```

**Error Response:**
- 400: Cannot delete own account
- 403: Insufficient permissions
- 404: User not found

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

---

## 🔐 Permission Matrix

| Action | Admin | Editor | Viewer |
|--------|-------|--------|--------|
| create | ✅ | ✅ | ❌ |
| read | ✅ | ✅ | ✅ |
| update | ✅ | ✅ | ❌ |
| delete | ✅ | ❌ | ❌ |
| manage_users | ✅ | ❌ | ❌ |

---

## 🧪 Complete Example Workflow

### Step 1: Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "sarah",
    "email": "sarah@example.com",
    "password": "pass123",
    "role": "editor"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMiIsInVzZXJuYW1lIjoic2FyYWgiLCJyb2xlIjoiZWRpdG9yIiwiaWF0IjoxNjg1NDQ2NjAwLCJleHAiOjE2ODU1MzMwMDB9.xyz...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "username": "sarah",
    "email": "sarah@example.com",
    "role": "editor"
  }
}
```

### Step 2: Check Permissions
```bash
curl -X POST http://localhost:5000/api/auth/verify-permission \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"action": "delete"}'
```

**Response:**
```json
{
  "action": "delete",
  "role": "editor",
  "hasAccess": false,  // Editors cannot delete
  "permissions": ["create", "read", "update"]
}
```

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal error |

---

## 🔒 Security Notes

✅ Always use HTTPS in production
✅ Keep JWT_SECRET secure
✅ Tokens expire in 24 hours
✅ Store tokens in localStorage (frontend)
✅ Send tokens in Authorization header
✅ Never expose tokens in URLs

---

## 🧪 Testing with Postman/Insomnia

1. **Create Collection** → RBAC API
2. **Set Base URL** → http://localhost:5000/api
3. **Add Requests**:
   - POST /auth/login
   - GET /auth/me
   - POST /auth/verify-permission
   - GET /users
   - PUT /users/:id
   - DELETE /users/:id

4. **Set up Environment Variable**:
   - Save token from login response
   - Use `{{token}}` in Authorization header

---

**API Reference v1.0 | Last Updated: May 2024**
