# TO_LET - Smart Rental Property Platform

A modern rental property platform built with React, TypeScript, and Firebase.

## Features

- 🏠 Property browsing and search
- 🤖 AI-powered assistant for property recommendations
- 👤 User authentication (Firebase Auth)
- 📊 Owner dashboard for property management
- 💾 Cloud storage for property images (Firebase Storage)
- 🌓 Dark mode support
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: Google Generative AI
- **Routing**: React Router v7
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jayeshfarkunde27/To-let.git
cd To-let
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Firebase Setup

This project uses Firebase for authentication, database, and storage. The Firebase configuration is already set up in `firebaseConfig.ts` with fallback values for development.

For production deployment, make sure to set the following environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Google Gemini AI Setup

This project uses Google Gemini AI for intelligent property search and description generation.

1. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add it to your `.env.local` file:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Build

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
to_let---smart-rental-property-platform/
├── components/          # Reusable UI components
├── context/            # React context providers
├── pages/              # Page components
│   ├── Auth/          # Authentication pages
│   ├── Owner/         # Owner dashboard pages
│   └── Tenant/        # Tenant pages
├── services/          # API and service integrations
├── firebaseConfig.ts  # Firebase configuration
├── App.tsx            # Main app component
└── index.tsx          # Entry point
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
