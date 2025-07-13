# EchoTunes

EchoTunes is a full-stack music streaming web application inspired by Spotify. It allows users to browse, search, and play songs, manage their profile, and for admins, manage the song library. The project is built with a React frontend and a Node.js/Express backend, using MongoDB for data storage and Firebase for file storage.

## Features

- User authentication (email/password & Google OAuth)
- Browse and search songs by name or artist
- Play music with a modern audio player
- Recently played songs
- Artist pages with their songs
- Admin panel to add and delete songs
- Responsive design for desktop and mobile
- Profile management

## Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Material UI, Axios, React Router, Firebase Storage
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Cookie-Parser, CORS
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database
- Firebase project (for storage)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/your-username/EchoTunes.git
cd EchoTunes
```
#### 2. Setup the server

```sh
cd server
npm install
```

- Create a .env file in the server directory:
```sh
JWT_SECRET=your_jwt_secret
```
- Update MongoDB connection string in server/index.js if needed.

#### 3. Setup the client

```sh
cd ../client
npm install
```

- Create a .env file in the client directory:
```sh
VITE_FIREBASE_API_KEY=your_firebase_api_key
```
- Update Firebase config in src/firebase.js with your Firebase project details.

...existing code...
#### 4. Running the App

Start the backend server:

```sh
cd server
npm run dev
```

Start the frontend:

```sh
cd ../client
npm run dev
```

The client will run on [http://localhost:5173](http://localhost:5173) and the server on [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
EchoTunes/
  client/      # React frontend
  server/      # Node.js backend
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.