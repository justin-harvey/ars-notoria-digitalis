# Sacred Library - PDF Setup Guide

Your "Currently Reading" section has been transformed into the **Sacred Library** - a curated collection of occult and esoteric PDFs.

## What Changed

- ✅ Section renamed to "Sacred Library" (📖 icon)
- ✅ Pre-populated with 8 classic occult texts
- ✅ Display format: Title, author, year, description, category tag
- ✅ PDF download buttons (when URLs are configured)
- ✅ Still locked behind the $5 premium unlock code
- ✅ Keeps the unlock code: `READING-2026`

## Books Included

1. **The Kybalion** - Three Initiates (1908) - Hermetic philosophy
2. **The Book of Abramelin** - Abraham von Worms (1458) - Sacred magic
3. **The Secret Teachings of All Ages** - Manly P. Hall (1928) - Has working PDF link!
4. **Three Books of Occult Philosophy** - Agrippa (1531) - Ceremonial magic
5. **The Goetia: Lesser Key of Solomon** - Anonymous (1641) - 72 demons
6. **The Sacred Magic of Ancient Egypt** - Rosemary Clark (2003) - Egyptian magic
7. **The Picatrix** - Anonymous (1256) - Astrological magic
8. **The Corpus Hermeticum** - Hermes Trismegistus (200 CE) - Hermetic texts

## How to Add PDF Links

### Step 1: Upload PDFs to Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **ars-notoria-chatroom** project
3. Click **Storage** in the left sidebar
4. If not enabled yet, click **"Get started"** and enable it
5. Create a folder: Click **"Create folder"** → Name it `library`
6. Upload your PDFs:
   - Click **"Upload file"**
   - Select your occult PDF files
   - They will appear in the `library` folder

### Step 2: Get Download URLs

For each uploaded PDF:

1. Click on the PDF file in Firebase Storage
2. In the right panel, look for **"File location"** or **"Download URL"**
3. Click the **copy icon** to copy the full URL
4. It will look like:
   ```
   https://firebasestorage.googleapis.com/v0/b/ars-notoria-chatroom.appspot.com/o/library%2Fkybalion.pdf?alt=media&token=abc123...
   ```

### Step 3: Update the grimoire.js File

1. Open `grimoire.js` in a text editor
2. Find the `initializeGrimoire()` function (around line 41)
3. Find the book you want to update (e.g., "The Kybalion")
4. Replace `'FIREBASE_STORAGE_URL_HERE'` with your actual Firebase URL:

**Before:**
```javascript
{
    id: 1,
    title: 'The Kybalion',
    author: 'Three Initiates',
    year: 1908,
    description: 'Hermetic philosophy and the seven principles',
    pdfUrl: 'FIREBASE_STORAGE_URL_HERE', // Replace this
    category: 'Hermetic'
}
```

**After:**
```javascript
{
    id: 1,
    title: 'The Kybalion',
    author: 'Three Initiates',
    year: 1908,
    description: 'Hermetic philosophy and the seven principles',
    pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/ars-notoria-chatroom.appspot.com/o/library%2Fkybalion.pdf?alt=media&token=abc123...',
    category: 'Hermetic'
}
```

5. Repeat for all 8 books
6. Save the file

### Step 4: Clear Browser Storage (Important!)

The library is pre-populated on **first load only**. If you've already opened the grimoire, you need to reset it:

**Option A: Clear localStorage (Deletes all grimoire data!)**
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Type: `localStorage.removeItem('grimoire_data')`
4. Press Enter
5. Refresh the page

**Option B: Manually update existing data**
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Type:
   ```javascript
   let data = JSON.parse(localStorage.getItem('grimoire_data'));
   data.reading[0].pdfUrl = 'YOUR_FIREBASE_URL_HERE';
   localStorage.setItem('grimoire_data', JSON.stringify(data));
   ```
4. Refresh the page

### Step 5: Deploy to Netlify

Once you've updated all the URLs:
1. Upload the updated `grimoire.js` to Netlify
2. The library will now have working PDF links!

## Security Rules for Firebase Storage

Set up security rules so PDFs are publicly readable:

1. Go to Firebase Console → **Storage** → **Rules** tab
2. Use these rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /library/{allPaths=**} {
      allow read: if true;  // Anyone can read PDFs
      allow write: if false; // Nobody can write (upload only via Console)
    }
  }
}
```

3. Click **Publish**

## Where to Find Free Occult PDFs

**Public Domain Sources:**
- [Internet Archive](https://archive.org/) - Search for occult, grimoire, Hermetic
- [Sacred Texts](https://sacred-texts.com/) - Many free PDFs
- [Project Gutenberg](https://www.gutenberg.org/) - Public domain books

**Important:** Only upload PDFs you have the right to distribute!

## Adding More Books

To add more books to the library, edit the `reading` array in `grimoire.js`:

```javascript
{
    id: 9, // Increment the ID
    title: 'Your Book Title',
    author: 'Author Name',
    year: 2000,
    description: 'Brief description of the book',
    pdfUrl: 'FIREBASE_STORAGE_URL_HERE',
    category: 'Grimoire' // Options: Grimoire, Hermetic, Philosophy, Egyptian, Kabbalah, Alchemy
}
```

## Category Colors

Each category has a different colored tag:
- **Grimoire** - Purple
- **Hermetic** - Light Cyan
- **Philosophy** - Yellow
- **Egyptian** - Light Green
- **Kabbalah** - Light Purple
- **Alchemy** - Light Red

## Cost Considerations

Firebase Storage free tier:
- **5 GB** total storage
- **1 GB/day** download bandwidth
- **50,000** downloads per day

**Typical PDF sizes:**
- Small book: 1-5 MB
- Medium book: 5-20 MB
- Large illustrated book: 20-100 MB

**Example:** If each PDF averages 10 MB, you can store ~500 books in the free tier.

## Notes

- The library still requires the **$5 unlock code** to access
- Unlock code is still: `READING-2026` (change in line 8 of grimoire.js)
- Only "The Secret Teachings of All Ages" has a working link by default (Internet Archive)
- Users with the unlock code can read PDFs directly in their browser
- PDFs open in a new tab when clicked

## Troubleshooting

**"PDF Not Available" shows for all books:**
- You haven't replaced the placeholder URLs yet
- Follow Steps 1-3 above to add Firebase URLs

**PDFs won't open:**
- Check Firebase Storage security rules (must allow public read)
- Verify the URL is correct and includes the `?alt=media` parameter
- Check Firebase Console to ensure the file uploaded successfully

**Library doesn't update after changing grimoire.js:**
- Clear browser localStorage (see Step 4 above)
- Do a hard refresh (Ctrl + Shift + R)

---

**Your Sacred Library is ready!** 📖✨

Once you upload PDFs to Firebase Storage and update the URLs, your users will have access to a beautiful collection of occult texts!
