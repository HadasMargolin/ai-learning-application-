# 🧠 AI Learning Platform – Mini MVP

A smart learning system that allows users to:
- Register with name and phone number
- Choose a category and sub-category
- Submit a prompt to GPT (OpenAI)
- Get an AI-generated lesson
- View their learning history
- Admin can view all users and prompts

---

## 🛠️ Tech Stack

- **Backend**: ASP.NET Core Web API (C#)
- **Frontend**: React.js
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core
- **AI**: OpenAI GPT API
- **Tools**: Postman, Docker, Visual Studio, pgAdmin

---

## 📁 Project Structure

```
ai-learning-application--main/
├── Backend/
│   └── Backend/        # ASP.NET Core API project
├── frontend/
│   └── src/            # React client application
├── docker-compose.yml  # PostgreSQL via Docker
```

---

## 🚀 How to Run the Project Locally

### 1. 📦 Backend (ASP.NET Core)

```bash
cd Backend/Backend
dotnet restore
dotnet ef database update
dotnet run
```

Make sure `appsettings.json` contains your connection string and OpenAI key.

### 2. 🌐 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Configuration

### 📄 `frontend/.env.example`

```env
REACT_APP_API_BASE_URL=http://localhost:7066/api
```

### 📄 `Backend/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ai_learning_platform;Username=postgres;Password=0556722371"
  },
 "OpenAI": {
  "ApiKey": "YOUR_API_KEY_HERE"
}
}
###The OpenAI API key is **not included** in this repository for security reasons.  
```

> Replace `"0556722371"` with your actual DB password if needed.

---

## 🐳 Docker Support

This project includes a `docker-compose.yml` file to run PostgreSQL locally.

To spin up the database:
```bash
docker-compose up -d
```

This will:
- Launch a PostgreSQL container named `learning-db`
- Create a database named `ai_learning_platform`
- Set the user to `postgres` with password `0556722371`
- Persist data via volume

The application connects to this container via the configured connection string in `appsettings.json`.

> ✅ Docker Desktop must be installed and running before using the above command.

---

## ✅ Main Features

- User registration by name & phone
- Category & sub-category selection
- Prompt submission to GPT
- AI-generated lesson response
- Learning history per user
- Admin dashboard to view all users and prompts

> 🔐 The default admin code is: `admin123`

---

## ⚠️ Assumptions

- No authentication system (JWT) implemented
- Admin is identified manually by user ID = `"admin"`
- Phone number is used as a simple way to identify users

---

## 🧪 Testing

Use Postman or the React frontend to test the API endpoints.

---

## 🧾 Developer

**Hadas Margolin**

---

## 📝 Notes

- Docker Compose is included to simplify database setup.
- You can enhance the system with JWT auth, Swagger documentation, and deploy to platforms like Vercel or Heroku.
