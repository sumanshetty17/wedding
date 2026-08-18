// ── FIREBASE SETUP ───────────────────────────────────────────────
// This site uses Firebase Phone Authentication to send real OTP
// texts for the "Start Planning" form. To make it live, you need
// your own free Firebase project — full step-by-step instructions
// are in README.md under "Turning on real OTP verification".
//
// Paste your project's config values below. These values are safe
// to have in frontend code (they just identify your Firebase
// project, they are not secret keys) — but Phone Auth itself only
// works from domains you've explicitly allowed in the Firebase
// console, so nobody else can piggyback on your project.
const firebaseConfig = {
  apiKey: "AIzaSyAC_MS7zxiKJRJd6yReQY4YfQ0mCoRh70g",
  authDomain: "marriheaven-3fde1.firebaseapp.com",
  projectId: "marriheaven-3fde1",
  storageBucket: "marriheaven-3fde1.firebasestorage.app",
  messagingSenderId: "1012736804027",
  appId: "1:1012736804027:web:f8b75395a53efb893f959e",
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

// Lets the rest of the app know whether real config has been pasted
// in yet, so the OTP form can show a clear setup message instead of
// a confusing Firebase error if you deploy before finishing setup.
export const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";
