# Sanctum Secretum - Hidden Chatroom Setup Guide

This guide will walk you through setting up the Firebase Realtime Database for your hidden chatroom feature.

## Overview

The chatroom is a **separate, hidden page** (`sanctum-9a4f2e8b.html`) that can be accessed via a subtle lightning bolt (⚡) icon in the status bar of the main interface. It's designed to be discoverable only by those who know where to look.

**Privacy & Security:**
- The chatroom has an obscure filename to hide it from casual browsing
- `robots.txt` blocks search engine crawlers
- `noindex` meta tags prevent indexing
- No title attribute on the link (no tooltip hint)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "Ars Notoria Chatroom")
4. Optional: Disable Google Analytics (not needed for this project)
5. Click **"Create project"**

## Step 2: Set Up Realtime Database

1. In your Firebase project, click **"Realtime Database"** in the left sidebar
2. Click **"Create Database"**
3. Choose a location (select closest to your users)
4. **Start in TEST MODE** for now (we'll set up security rules later)
5. Click **"Enable"**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** (`</>`) to add a web app
5. Give it a nickname (e.g., "Chatroom Web")
6. **Do NOT** check "Firebase Hosting" - we're deploying to Netlify
7. Click **"Register app"**
8. You'll see a `firebaseConfig` object with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

9. **Copy these values** - you'll need them in the next step

## Step 4: Configure sanctum-9a4f2e8b.html

1. Open `sanctum-9a4f2e8b.html` in a text editor
2. Find the **FIREBASE CONFIGURATION** section (around line 135)
3. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",           // Replace this
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace this
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",  // Replace this
    projectId: "YOUR_PROJECT_ID",          // Replace this
    storageBucket: "YOUR_PROJECT_ID.appspot.com",  // Replace this
    messagingSenderId: "YOUR_SENDER_ID",   // Replace this
    appId: "YOUR_APP_ID"                   // Replace this
};
```

4. Save the file

## Step 5: Set Up Security Rules (IMPORTANT!)

By default, Firebase Realtime Database starts in test mode, which allows anyone to read/write. This is **insecure** and will expire after 30 days. Set up proper security rules:

1. Go to Firebase Console → **Realtime Database** → **Rules** tab
2. Replace the rules with:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true,
      "$messageId": {
        ".validate": "newData.hasChildren(['username', 'timestamp']) && (newData.hasChild('text') || newData.hasChild('imageUrl'))",
        "username": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 20"
        },
        "text": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 1000"
        },
        "imageUrl": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "timestamp": {
          ".validate": "newData.val() == now"
        },
        "replyTo": {
          ".validate": "newData.hasChildren(['key', 'username'])",
          "key": {
            ".validate": "newData.isString()"
          },
          "username": {
            ".validate": "newData.isString() && newData.val().length <= 20"
          },
          "text": {
            ".validate": "newData.isString() && newData.val().length <= 100"
          }
        }
      }
    },
    "online": {
      ".read": true,
      "$userId": {
        ".write": true,
        ".validate": "newData.val() === true"
      }
    }
  }
}
```

**What these rules do:**
- Allow anyone to read messages (public chat)
- Allow anyone to write messages with validation:
  - Username must be 1-20 characters
  - Message must have either `text` (1-1000 chars) or `imageUrl`
  - Timestamp must be server time (prevents tampering)
  - Optional `replyTo` object stores context of the replied-to message
- Allow anyone to delete messages (for own-message deletion)
- Track online users securely

3. Click **"Publish"**

## Step 5A: Enable Firebase Storage for Image Pasting

The chatroom now supports pasting images directly into the chat! Enable Firebase Storage to allow this feature:

### Enable Storage

1. In Firebase Console, click **Storage** in the left sidebar
2. Click **"Get started"**
3. Choose **"Start in production mode"**
4. Click **"Next"**
5. Select the same location as your Realtime Database
6. Click **"Done"**

### Set Up Storage Security Rules

1. Click the **"Rules"** tab in Firebase Storage
2. Replace the default rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chat_images/{allPaths=**} {
      allow read: if true;  // Anyone can view images
      allow write: if request.auth == null  // Allow unauthenticated uploads
                   && request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');  // Images only
    }
  }
}
```

**What these rules do:**
- Anyone can READ images (so they display in chat)
- Anyone can WRITE images BUT:
  - Maximum file size: 5MB
  - Only image files allowed (prevents abuse)
  - Images stored in `chat_images/` folder

3. Click **"Publish"**

### How Image Pasting Works

Once Storage is enabled:
1. Users can copy any image (screenshot, file, etc.)
2. Click in the message textarea
3. Press **Ctrl+V** (or Cmd+V on Mac)
4. Image automatically uploads to Firebase Storage
5. Image appears in the chat for all users

**Note:** If Storage is not enabled, users can still send text messages normally.

## Chat Features

### Replying to Messages
- Click the **↩ Reply** button on any message
- A reply preview bar appears above the input
- Type your reply and send - it will show the context of the original message
- Click **✕** to cancel a reply
- Works with both text and image messages

### Deleting Your Own Messages
- A **✕ Delete** button appears on messages you sent (matched by username)
- Click it and confirm to permanently remove the message from Firebase
- Deleted messages disappear in real-time for all connected users
- **Note:** Since there's no authentication, deletion is enforced client-side. The username in localStorage determines ownership.

## Step 6: Test Locally

1. Open `index.html` in your browser
2. Look for the small **⚡** lightning bolt in the bottom-right status bar
3. Click it to access the chatroom
4. Enter a username and send a test message
5. Open the chatroom in another browser tab/window to test real-time sync

## Step 7: Deploy to Netlify

Once everything works locally:

1. Drag your entire `Ars Notoria Digitalis` folder to Netlify (including `sanctum-9a4f2e8b.html` and `robots.txt`)
2. OR use Git deployment as described in the main README
3. The chatroom will be accessible at `https://your-site.netlify.app/sanctum-9a4f2e8b.html`
4. But users will need to find the hidden ⚡ link!

## Optional: More Secure Rules

If you want to limit abuse, consider these additional security measures:

### Rate Limiting (Prevent Spam)
Add rate limiting to prevent message spam:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": "!root.child('users/' + auth.uid + '/lastPost').exists() || root.child('users/' + auth.uid + '/lastPost').val() < (now - 3000)",
      // ... rest of validation rules
    }
  }
}
```

### Message History Limit
Automatically delete old messages to save space:

1. In Firebase Console, go to **Realtime Database** → **Data** tab
2. You can manually delete old messages, or set up a Cloud Function (requires paid plan)

## Troubleshooting

### "FIREBASE NOT CONFIGURED" Error
- Make sure you replaced ALL placeholder values in `firebaseConfig`
- Check that `databaseURL` includes your actual project ID
- Verify your Firebase project is active in the Firebase Console

### "Permission Denied" Error
- Check your security rules in Firebase Console
- Make sure you published the rules
- Verify the database is in the correct mode (not locked down mode)

### Messages Not Appearing
- Open browser console (F12) and check for errors
- Verify your `databaseURL` is correct
- Check Firebase Console → **Realtime Database** → **Data** to see if messages are being written

### Connection Status Shows "Disconnected"
- Check your internet connection
- Verify Firebase project is active (free tier has limits)
- Check browser console for Firebase errors

## Usage Notes

- **Free Tier Limits**: Firebase Spark (free) plan includes:
  - 1 GB stored data
  - 10 GB/month downloaded data
  - 100 simultaneous connections
  - This is more than enough for a small community

- **Data Persistence**: Messages are stored indefinitely in Firebase unless you manually delete them

- **Privacy**: Usernames and messages are stored in Firebase servers. This is a public chat with no encryption.

- **Moderation**: No built-in moderation. You can manually delete messages in Firebase Console.

## Hiding/Removing the Chatroom

If you ever want to disable the chatroom:

1. **Remove the link**: Delete the `<a>` tag from `index.html` (line 623)
2. **Delete the file**: Remove `sanctum-9a4f2e8b.html` from your deployment
3. **Update robots.txt**: Remove the Disallow rules for the chatroom
3. **Optional**: Disable the Firebase Realtime Database in Firebase Console

The chatroom is completely modular and can be removed without affecting the rest of the site.

## Advanced: Custom Domain

If deploying to your own domain, update the Firebase Console:

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your custom Netlify domain or personal domain
3. This prevents unauthorized domains from using your Firebase config

## Cost Considerations

Firebase is **free** for small projects, but be aware of limits:
- If you exceed free tier, you'll need to upgrade to Blaze (pay-as-you-go)
- Monitor usage in Firebase Console → **Usage** tab
- Set up budget alerts to avoid surprises

## Support

For Firebase-specific issues, consult:
- [Firebase Documentation](https://firebase.google.com/docs/database)
- [Firebase Console](https://console.firebase.google.com/)

For chatroom feature issues, check:
- Browser console (F12) for JavaScript errors
- Firebase Realtime Database → Data tab to see actual data structure

---

**Happy chatting in the Sanctum Secretum!** ⚡🔮
