# GitHub Setup Instructions

Since I cannot create the repository for you (I don't have your password), please follow these steps:

## Step 1: Create Repository on GitHub
1. Go to [https://github.com/new](https://github.com/new).
2. Set **Repository name** to: `feeding-minds-initiative`
3. Make sure it is **Public**.
4. Click **Create repository**.
5. **Copy the HTTPS URL** (It looks like `https://github.com/YOUR_USERNAME/feeding-minds-initiative.git`).

## Step 2: Run These Commands
Be sure to replace `PASTE_YOUR_URL_HERE` with the URL you just copied!

```powershell
# 1. Add the remote link (REPLACE THE URL!)
git remote add origin PASTE_YOUR_URL_HERE

# 2. Rename branch to main
git branch -M main

# 3. Push your code
git push -u origin main
```

**Example:**
`git remote add origin https://github.com/StartAgain/feeding-minds-initiative.git`

Once you run these commands, your code will be live on GitHub!
