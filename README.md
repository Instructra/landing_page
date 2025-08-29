# Instructra landing page

This project is the landing page for the Instructra app.

## 🚀 Tech Stack

This project uses the following stack:

- ### Next.js – React framework for building web applications

- ### Vercel – Hosting and deployment platform

- ### Resend – Email service provider

- ### Tailwind CSS – Utility-first CSS framework

- ### Zod – TypeScript-first schema validation

- ### next-recaptcha-v3 -  Google reCAPTCHA v3 integration

- ### zustand -  state management solution

## 🛠️ Getting Started

1. ### Clone and install dependencies

    ```bash
    git clone https://github.com/Instructra/landing_page.git
    cd instructra-landing
    npm install
    ```

1. ### Install Vercel CLI (if not already installed)

    ```bash
    npm install -g vercel@latest
    ```

1. ### Pull environment variables

    - Mac/Linux:

    ```bash
    vercel env pull && cp .env.local .env
    
    ```

    - Windows (CMD):

    ```cmd
    copy /Y .env.local .env
    ```

    - Windows (PowerShell):

    ```powershell
    Copy-Item .env.local .env -Force
    ```

1. Start the development server

    ```bash
    npm run dev
    ```

    and The app will be available at:

    ```bash
    http://localhost:3000
    ```

- ### ⚠️ *Notes:*

  - To test reCAPTCHA or submit forms, you must use:

  ```bash
  http://127.0.0.1:3000
  ```
