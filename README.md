# ExplainMyCode

## 🚀 AI-Powered Code Debugger & Explainer

**ExplainMyCode** is an AI-powered tool that helps developers debug and understand their code. It detects errors, explains them, and suggests possible fixes.

---

## 📌 Features

- **Code Analysis** – Detect syntax, logical, and runtime errors.
- **Bug Explanation** – Provides human-readable explanations.
- **Fix Suggestions** – Offers AI-powered code corrections.
- **Multi-Language Support** – Supports Python, JavaScript, C++, etc.
- **Code Optimization** – Suggests performance improvements.

---

## 🛠 Tech Stack

- **Frontend**: React.js (Monaco Editor for code input)
- **Backend**: Node.js (Express.js)
- **AI Model**: OpenAI GPT (or custom fine-tuned models)
- **Database**: MongoDB (optional for storing past debugging history)
- **Deployment**: Vercel (Frontend) & Render (Backend)

---

## 📂 Project Structure

```
/ExplainMyCode
 ├── backend/             # Node.js + Express API
 ├── frontend/            # React.js frontend
 ├── README.md            # Project Documentation
 ├── .gitignore           # Ignore unnecessary files
 ├── package.json         # Project dependencies
```

---

## ⚙️ Environment Variables

Create `.env` files in both the `backend/` and `frontend/` directories for proper configuration.

### 🔐 `backend/.env`

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_or_local_model_key
OPENAI_BASE_URL=https://api.chatanywhere.org/v1
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

### 🔐 `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:8080/
```

## 🚀 Getting Started

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/ExplainMyCode.git
cd ExplainMyCode
```

### **2️⃣ Install Dependencies**

```bash
cd backend
npm install

cd ../frontend
npm install
```

### **3️⃣ Set Up Environment Variables**
- Create `.env` files in both `backend/` and `frontend/` directories.
- Fill in the required variables as mentioned above.

### **4️⃣ Run the Project**

```bash
# Start Backend
cd backend
node server.js

# Start Frontend
cd frontend
npm run dev
```

---

## 📜 License

MIT License © 2025 *Aayush Chouhan*

