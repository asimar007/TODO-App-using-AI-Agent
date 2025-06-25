# TODO App using AI-AGENT

This project demonstrates a simple yet powerful To-Do application powered by an AI Agent. It allows users to manage their daily tasks using natural language commands, leveraging an AI model to interpret requests and interact with a PostgreSQL database via Drizzle ORM.

## Demo Video


https://github.com/user-attachments/assets/30da4e07-7aad-4ce7-819f-8ce209ea9836


## Table of Contents

- [About the Project](#about-the-project "null")
- [Features](#features "null")
- [Technologies Used](#technologies-used "null")

- [What I Learned](#what-i-learned "null")
- [Future Enhancements](#future-enhancements "null")
- [Getting Started](#getting-started "null")

  - [Prerequisites](#prerequisites "null")
  - [Installation](#installation "null")
  - [Database Setup](#database-setup "null")
  - [Running the Application](#running-the-application "null")

- [Usage](#usage "null")

## About the Project

This To-Do application serves as a practical example of building an AI agent that can understand natural language and perform database operations (CRUD - Create, Read, Update, Delete). Unlike simple mock agents, this project integrates with a real PostgreSQL database, demonstrating how an LLM (Large Language Model) can securely access and manipulate data based on user input.

The core idea is to enable users to interact with their To-Do list conversationally, making task management more intuitive and efficient.

## Features

- **Natural Language Interaction:** Add, view, search, and delete To-Do items using everyday language.
- **AI-Powered Intent Recognition:** The AI agent interprets user commands to determine the appropriate database action.
- **PostgreSQL Database:** Stores To-Do items persistently.
- **Drizzle ORM:** Provides a type-safe and efficient way to interact with the PostgreSQL database.
- **Docker Compose:** Simplifies database setup and management.
- **Command-Line Interface:** Interact with the AI agent directly from your terminal.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js (Implied for API, though CLI is shown):** Framework for building web applications (can be extended to include a UI).
- **OpenAI API:** For natural language processing and AI agent capabilities.
- **PostgreSQL:** Relational database management system.
- **Drizzle ORM:** Modern TypeScript ORM for PostgreSQL.
- **Docker & Docker Compose:** Containerization for easy database setup.
- **`dotenv`:** For managing environment variables.
- **`readline-sync`:** For synchronous command-line input.

## What I Learned

This section will detail the key takeaways and learning points from building this project. It will cover insights into:

- Integrating LLMs with external tools and databases.
- Designing effective prompts for AI agents to understand intent and execute actions.
- Implementing CRUD operations with Drizzle ORM and PostgreSQL.
- Setting up a development environment using Docker Compose.
- The fundamental concepts of AI agent architecture (planning, action, observation).

## Future Enhancements

- **Web UI:** Integrate a frontend framework (e.g., React, Vue, Angular) for a more user-friendly interface.
- **More Complex To-Do Features:** Add `isDone`, `doneAt`, `due_date`, `priority`, etc.
- **User Authentication:** Implement user login to manage personal To-Do lists.
- **Advanced AI Capabilities:**

  - Allow updates to existing To-Dos (e.g., "Change 'buy groceries' to 'buy milk and bread'").
  - Set reminders or integrate with calendar APIs.
  - Contextual understanding across multiple turns of conversation.

- **Error Handling:** More robust error handling and user-friendly error messages.
- **Testing:** Add unit and integration tests.
- **Deployment:** Instructions for deploying the application to a cloud platform.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)
- Docker Desktop (or Docker Engine)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/asimar007/TODO-App-using-AI-Agent.git

    cd TODO-App-using-AI-Agent
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

    (If you prefer npm, use `npm install`. If yarn, use `yarn install`.)

### Database Setup

The project uses Docker Compose to run a PostgreSQL instance.

1.  **Create a `.env` file:** Create a file named `.env` in the root of your project and add the following environment variables:

    ```javascript
    DATABASE_URL = "postgresql://admin:admin@localhost:5431/postgres";
    OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";
    ```

    - `DATABASE_URL`: This connects to the PostgreSQL container.
    - `OPENAI_API_KEY`: Obtain this from your OpenAI dashboard ([https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys "null")). **Do not share your API key publicly.**

2.  **Start the PostgreSQL container:**

    ```bash
    docker-compose up -d
    ```

    This command will start the PostgreSQL container in detached mode.

3.  **Generate and apply database migrations:** The project uses Drizzle ORM for schema management.

    ```bash
    pnpm run generate  # Generates migration files based on your schema
    pnpm run migrate   # Applies the generated migrations to the database
    ```

    You can optionally run the Drizzle Studio to view your database:

    ```
    pnpm run studio
    ```

    This will open a web interface (usually `http://localhost:5000`) where you can see your `todos` table.

### Running the Application

After setting up the database and installing dependencies, you can run the AI agent:

```bash
node index.js
```

## Usage

Once the application is running, you will see a prompt in your terminal:

```
Enter your question:>
```

You can then type natural language commands to interact with your To-Do list:

- **Add a To-Do:**

  - `Add a task to buy groceries.`
  - `Create a new todo: Finish the report.`
  - `I need to record a video for YouTube.`

- **View all To-Dos:**

  - `What all things I need to do today?`
  - `Show me all my tasks.`
  - `List my todos.`

- **Search for a To-Do:**

  - `Search for any todo related to video.`
  - `Find tasks about debugging.`

- **Delete a To-Do:**

  - `I have already done debugging.` (The AI will identify the task and ask for confirmation or directly delete it based on its understanding).

The AI agent will process your request, perform the necessary database operation, and respond.
