# 🧩 Grade -- Word Puzzle Game

**Grade** is a modern, minimalist word puzzle game inspired by Wordle,
with support for multiple game modes: **Single (1 word)**, **Duo (2
words)**, and **Quartet (4 words)**.\
It is designed with a strong focus on performance and a premium user
experience on both mobile and desktop.

------------------------------------------------------------------------

## ✨ Features

-   **Three Game Modes**: Single, Duo, and Quartet.
-   **Progressive Web App (PWA)**: Installable directly from the
    browser.
-   **Native Mobile Support**: Powered by **Capacitor** for Android
    (APK) and iOS.
-   **Safe Area Awareness**: UI respects notches and dynamic islands
    (iOS & Android).
-   **Dynamic Theme**: Light and Dark mode support.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Next.js 16
-   Tailwind CSS
-   Shadcn/UI
-   Framer Motion
-   Capacitor

------------------------------------------------------------------------

## 📦 Local Setup

### 1. Install Dependencies

``` bash
npm install
```

### 2. Run in Development Mode

``` bash
npm run dev
```

The app will be available at:

    http://localhost:3000

------------------------------------------------------------------------

## 📱 Mobile Build (Capacitor)

Before proceeding, ensure your `next.config.js` includes:

``` js
output: 'export'
```

This is required for static export and Capacitor compatibility.

------------------------------------------------------------------------

### 1. Build the Project for Mobile

``` bash
npm run build:mobile
```

This command generates the static files required by Capacitor.

------------------------------------------------------------------------

### 2. Android Setup

``` bash
npx cap sync android
npx cap open android
```

-   Android Studio will open automatically.
-   Select a device or emulator.
-   Click **Run ▶** to install the app.

------------------------------------------------------------------------

### 3. iOS Setup (macOS + Xcode Required)

``` bash
npx cap add ios
npx cap sync ios
npx cap open ios
```

In Xcode:

1.  Select your **Target**.
2.  Choose a simulator (e.g., iPhone 15).
3.  Click **Run ▶** to launch the app.

------------------------------------------------------------------------

## 🎨 Cell Color Rules

-   🟩 **Green**: Correct letter in the correct position.
-   🟨 **Yellow**: Correct letter in the wrong position.
-   ⬜ **Gray**: Letter does not exist in the word.
