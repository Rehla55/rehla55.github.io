# رحلة الـ 55 يوم (Journey of 55 Days)

## Project Overview
This project is a spiritual/educational daily challenge web application titled "**رحلة الـ 55 يوم**" (Journey of 55 Days). It engages users with daily spiritual messages, explanations, and timed quizzes over a 55-day period. The application features a real-time leaderboard, progress tracking, and push notifications.

### Main Technologies
- **Frontend:** HTML5 (RTL/Arabic), Vanilla CSS3, Vanilla JavaScript.
- **Backend (Firebase):**
  - **Realtime Database:** Stores user profiles, scores, submissions, and questions.
  - **Authentication:** Supports Email/Password and Google Sign-In.
  - **Hosting:** Serves the static assets.
  - **Cloud Messaging (FCM):** Handles push notifications.
- **Worker:** A Python background process (`firebase_worker.py`) that validates quiz submissions and updates scores.

## Scaling Architecture: Connection Multiplexing (V3)
To operate within the Firebase Free Tier (100 concurrent connection limit), the application uses a **transient connection strategy**:
- **Multiplexing:** Instead of persistent listeners, the app calls `db.goOnline()` to fetch/write data and `db.goOffline()` immediately after.
- **Critical Quiz Window:** The connection is held open **only** during the 30-second quiz and submission phase to ensure zero latency for the validator.
- **Async Synchronization:** The UI handles loading states gracefully, ensuring the homepage only renders once all required data (User Profile + Daily Question) is fetched in parallel.

## File Structure
- `index.html`: Main UI with RTL support and themed CSS.
- `script.js`: Core frontend logic, Firebase integration, and Multiplexing V3 implementation.
- `firebase_worker.py`: Python script for server-side answer validation.
- `database.rules.json`: Security rules enforcing role-based access (admin/user) and data integrity.
- `firebase-messaging-sw.js`: Service worker for background notifications.
- `img/`: Asset directory for logos and UI elements.

## Building and Running

### Deployment
Deploy the web app and database rules using the Firebase CLI:
```powershell
firebase deploy --only hosting,database
```

### Backend Worker
The Python worker requires `firebase-admin` and a valid `serviceAccountKey.json` (ignored by git).
```powershell
python firebase_worker.py
```

## Development Conventions
- **Language:** UI is strictly Arabic (RTL).
- **Styles:** Uses a gold and dark-blue theme with CSS variables.
- **Database Safety:** Always use `ensureConnected()` in `script.js` before performing database writes to handle potential connection queuing.
- **Git Safety:** `GEMINI.md`, `.gitignore`, and sensitive JSON keys are excluded from source control.
