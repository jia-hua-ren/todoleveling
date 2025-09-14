# TodoLeveling

A prototype gamified ToDo list web-app that rewards users with experience points for completing tasks, which can be expanded upon in many ways to help motivate the user to complete their tasks. It can be accessed [here](https://todoleveling.onrender.com/)

## Features

- User Authentication with Google OAuth2
- Task Management: Create, edit, delete, and reorder tasks
- Drag & Drop Interface: Intuitive task reordering and completion
- Experience System: Gain XP for completing tasks
- Level Progression: Level up as you complete more tasks

## Tech Stack

This is a webapp that consists of a separate frontend and backend. Hosted in a single Docker container on render.com

#### Frontend

- Framework: Next.js
- Language: TypeScript
- Tailwind CSS
- Drag and Drop: dnd-kit

#### Backend

- Framework: Spring Boot
- Database: Postgres SQL for production, H2 for development
- RESTful API endpoints

## Architecture

- Frontend and backend are separate applications
- RESTful API communication between client and server
- Session-based authentication
- Optimistic UI updates for a smooth user experience

## Versions

Node.js 24+ and npm/yarn
Java 21
Maven 3.9.9
Next.js 15+
