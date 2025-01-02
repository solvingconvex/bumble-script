# Swipe Your Entire Country While Sleeping
## Overview
Added and modified a script for a friend while testing something.
Automates the likes on bumble.
Follow the instructions below to set up and run the script. 

---

## Prerequisites
- A Bumble account with Boost on

---

## Setup and Usage Instructions

1. **Login to Bumble**
   - Open Bumble in Google Chrome (desktop) and sign in.

2. **Access Developer Tools**
   - Press `Ctrl + Shift + J` to open Developer Tools.
   - Navigate to the `Sources` tab.

3. **Set Up Overrides**
   - In the Developer Tools panel, find and click the `Overrides` tab.
   - Click `Select folder for overrides`. This action will open your file explorer.
   - Create a new folder (e.g., "test") and select it.
   - Allow Chrome to save changes by clicking `Allow` when prompted.

4. **Find and Override Bumble's JavaScript File**
   - Return to the `Page` tab in Developer Tools.
   - Locate the file: `top/us1.bumbcdn.com/i/aco/bumble.com/v2/-/moxie/dist/vendor.ba6c1ecd04b61342bcdf.js`.
   - Right-click the file and select `Override Content`.

5. **Modify the Script**
   - Use `Ctrl + F` to search for the line: `return !!e && !0 === e.isTrusted`.
   - Replace it with: `return true;`.
   - Save the file and reload the page.

6. **Run the Auto Liker Script**
   - Go to the `Console` tab in Developer Tools.
   - Copy and paste the contents of `bumble.js` into the console.
   - Press `Enter` to run the script.

7. **Stop or Restart the Script**
   - Press Stop or Restart button.

---

## Troubleshooting
- **No "Like" Button Found:** If the script cannot find the "Like" button, it will retry a few times before refreshing the page.
- **Script Not Working:** Ensure the JavaScript file was overridden correctly. Double-check the modified line and reload the page.

---

## Disclaimer
This script is intended for educational purposes. The user assumes all responsibility for its use.

