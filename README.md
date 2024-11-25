# Writer/Editor Dashboard Frontend

This is the frontend application for the **Writer/Editor Dashboard**, built using **Vite** and **Vue.js 3**. The frontend provides a user-friendly interface for writers and editors to create, edit, and publish articles. It interacts with the backend via RESTful APIs to manage content and user authentication.

---

## Features

- **Authentication**: Login and session management for users.
- **Role-based Access**:
  - **Writers**: Create and edit articles.
  - **Editors**: Review and publish articles.
- **Dynamic UI**: Built with Vue.js 3 for seamless interactions.
- **API Integration**: Fetches and manipulates data via the backend APIs.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

- **Vite**: Lightning-fast frontend tooling.
- **Vue.js 3**: Reactive framework for building modern web apps.
- **Pinia**: State management for Vue.js.
- **Axios**: HTTP client for API communication.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm or yarn**: Package manager to install dependencies.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rodche-web/archintel-exam-client.git
cd archintel-exam-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the backend API URL:

```env
VITE_API_URL=http://localhost:3000/api
VITE_S3_BUCKET_URL=bucket-url-here
```

### 4. Run the Application

#### For Development:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

#### For Production Build:

```bash
npm run build
```

The production-ready files will be in the `dist/` folder. Use a static file server (e.g., **Netlify**, **Vercel**, or **nginx**) to serve the app.