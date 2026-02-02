# AI Email Reply Assistant

An intelligent email response generator that helps users craft professional, contextually appropriate email replies using AI technology.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

AI Email Reply Assistant is a full-stack application that leverages artificial intelligence to generate contextually relevant email responses. The system analyzes incoming emails and produces professional replies tailored to the content and tone of the original message.

## ✨ Features

- **AI-Powered Response Generation**: Utilizes advanced language models to create contextually appropriate replies
- **Tone Customization**: Adjust the tone of responses (formal, casual, friendly, professional)
- **Multi-Platform Support**: Available as web application and browser extension
- **Real-time Processing**: Fast response generation with minimal latency
- **User-Friendly Interface**: Intuitive React-based frontend
- **RESTful API**: Robust Spring Boot backend with well-documented endpoints

## 📁 Project Structure

```
AI-Email-Reply-Assistant/
│
├── email-writer-sb/          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── email-writer-react/       # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── extension/                # Browser Extension
│   ├── manifest.json
│   ├── src/
│   └── README.md
│
├── .gitignore
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Build Tool**: Maven
- **AI Integration**: GEMINI API 

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: CSS

### Browser Extension
- **Platform**: Chrome Extension
- **Technologies**: JavaScript, HTML, CSS

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)**: Version 17 or higher
- **Node.js**: Version 16.x or higher
- **npm** or **yarn**: Latest stable version
- **Maven**: Version 3.6 or higher
- **Git**: Latest version

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Thaleshwari/AI-Email-Reply-Assistant.git
cd AI-Email-Reply-Assistant
```

### 2. Backend Setup (Spring Boot)

```bash
cd email-writer-sb

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup (React)

```bash
cd email-writer-react

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Browser Extension Setup

```bash
cd extension

# Install dependencies
npm install

# Build extension
npm run build
```

**To load the extension:**
1. Open Chrome/Firefox
2. Navigate to `chrome://extensions/` or `about:addons`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `extension/dist` folder

## ⚙️ Configuration

### Backend Configuration

Create an `application.properties` file in `email-writer-sb/src/main/resources/`:

```properties
# Server Configuration
server.port=8080

# AI API Configuration
ai.api.key=your-api-key-here
ai.api.endpoint=https://api.openai.com/v1


# CORS Configuration
cors.allowed.origins=http://localhost:5173
```

### Frontend Configuration

Create a `.env` file in `email-writer-react/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/email/generate
VITE_APP_NAME=AI Email Reply Assistant
```

## 💡 Usage

### Web Application

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Paste the email you want to reply to
4. Select desired tone and style
5. Click "Generate Reply"
6. Review and customize the generated response
7. Copy to clipboard or send directly

### Browser Extension

1. Click the extension icon in your browser
2. The extension will detect email content automatically
3. Click "Generate Reply" button
4. Choose from suggested responses
5. Insert into email client

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api/email/generate
```

### Endpoints

#### Generate Email Reply
```http
POST /email/generate
Content-Type: application/json

{
  "emailContent": "Original email text",
  "tone": "professional",
  
}
```

**Response:**
```json
{
  "success": true,
  "reply": "Generated email reply text",
  "timestamp": "2024-02-02T10:30:00Z"
}
```

For complete API documentation, visit `/api/swagger-ui.html` when the backend is running.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Follow Java code conventions for backend
- Use ESLint configuration for frontend
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Thaleshwari** - *Initial work* - [YourGitHub](https://github.com/Thaleshwari)

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Spring Boot community
- React community
- All contributors who helped improve this project

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Email templates library
- [ ] Sentiment analysis
- [ ] Integration with popular email clients
- [ ] Mobile application
- [ ] Advanced customization options

---

Made with ❤️ by Thaleshwari