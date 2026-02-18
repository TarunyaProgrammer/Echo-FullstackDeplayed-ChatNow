# Echo - Real-Time Chat Application

Echo is a modern, real-time messaging application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It features secure authentication, instant messaging via Socket.io, and a sleek, responsive UI powered by Tailwind CSS and Framer Motion.

## 🚀 Features

- **Real-time Messaging**: Instant delivery of messages using Socket.io.
- **User Authentication**: Secure signup and login with JWT and BCrypt.
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS.
- **State Management**: Efficient global state handling with Zustand.
- **Interactive UI**: Smooth animations with Framer Motion and 3D elements with React Three Fiber.
- **Notifications**: Real-time alerts using React Hot Toast.

## 🛠️ Tech Stack

### Client (Frontend)

- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router v7
- **Real-time**: Socket.io-client
- **HTTP Client**: Axios
- **Animations**: Framer Motion, React Three Fiber

### Server (Backend)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)

---

## 🏁 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/TarunyaProgrammer/Echo-FullstackDeplayed-ChatNow.git
cd Echo-FullstackDeplayed-ChatNow
```

### 2. Backend Setup (Server)

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the following configuration:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

   > **Note**: Replace `your_mongodb_connection_string` with your actual MongoDB URI.

4. Start the server:
   ```bash
   npm run dev
   ```
   The server should run on `http://localhost:5000`.

### 3. Frontend Setup (Client)

1. Open a new terminal and navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **Important Configuration**:
   By default, the frontend interacts with the deployed backend. To run it locally, you need to update the API base URL.

   Open `client/src/services/api.js` and uncomment the local URL:

   ```javascript
   const api = axios.create({
     baseURL: "http://localhost:5000/api", // Use this for local development
     // baseURL: "https://echo-fullstackdeplayed-chatnow.onrender.com/api",
   });
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The client should be available at `http://localhost:5173`.

---

## 📂 Project Structure

```
Echo/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth, Socket)
│   │   ├── hooks/          # Custom React Hooks
│   │   ├── pages/          # Application Pages (Login, Chat, etc.)
│   │   ├── services/       # API and Socket services
│   │   ├── App.jsx         # Main App component with Routes
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   └── vite.config.js
│
├── server/                 # Backend Express Application
│   ├── config/             # DB Configuration
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth and Error handling
│   ├── models/             # Mongoose Models (User, Message)
│   ├── routes/             # API Routes
│   ├── socket/             # Socket.io handlers
│   └── server.js           # Server Entry point
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
