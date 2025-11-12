import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID || "your-app-id",
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID || "your-measurement-id"
};

const isProduction = import.meta.env.VITE_APP_ENV === 'production';

// Initialize Firestore
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export { firebaseApp, auth, db, analytics, logEvent, isProduction };