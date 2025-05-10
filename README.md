# SyncNotes-extension
Sync Notes is a Chrome extension designed to help users efficiently take, manage, and organize notes directly from their browser while visiting various websites. The extension allows users to save URLs, add categorized notes, prioritize important notes, and view all saved notes from a dedicated page. It enhances productivity by providing a seamless experience for note-taking while browsing.

# Demo video(previous version) : 
https://www.linkedin.com/posts/aditi-goswami-850076261_syncnotes-chromeextension-webdevelopment-activity-7222294131354533888-wa69?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEBCdDwB5h5W7jRSFBqY63d51zJULJbK29U

Features:
1. Save Notes with Website Links:
Save notes along with the URL of the current website.
Each note consists of a Title, Description, and Category.
2. Category Filtering:
Filter notes by category to quickly find related notes.
Notes can be categorized based on topics, projects, or any other label.
3. Note Prioritization:
Mark notes as Important or Not Important.
Important notes are automatically sorted and moved to the top of the list for better visibility.
4. Real-Time Updates:
Any changes, like marking a note as important, instantly reflect without needing to refresh the page.
5. View and Manage All Notes:
View all saved notes on a dedicated page.
Expand or collapse note details (description, URL) with a simple click on the title.
Notes are sortable based on their priority.
6. Customization:
Create a personalized experience by using categories and priority levels to organize your notes efficiently.
Functionality


Popup Interface:
       The extension popup provides users the ability to:
      Save a new note with the current website’s URL.
      Edit an existing note if it's already saved.
      Delete a note from the database.
      Mark notes as important to prioritize them.

Notes Display Page:
     Accessible via the extension's options page.
     Displays all saved notes with their title, description, URL, and category.
     Allows filtering by category and toggling of priority.

Priority System:
Toggle the importance of a note with a button.
Notes marked as important (priority 1) automatically shift to the top of the list.

Dynamic Interface:
The popup and notes page refresh dynamically after any operation, ensuring the latest data is always visible.

Tech Stack-
Frontend:
HTML5: Structure and layout for popup and notes display.
CSS3: Custom styling for a clean, user-friendly interface.
JavaScript (ES6+): Handles interactions, data updates, and dynamic content rendering.
jQuery: Simplified DOM manipulation and event handling.
Axios: For making HTTP requests to the backend API.
Backend:
Node.js: Server-side runtime environment.
Express.js: Backend framework used to build the REST API for handling notes.
PostgreSQL: Database for storing notes, including their URLs, titles, descriptions, categories, and priorities.

how to run :
  1. Clone the Repository
  2. Install Dependencies
  3. Database Setup
  4. Start the Server
  5. Load the Extension in Chrome
Go to chrome://extensions/.
Enable Developer mode.
Click on Load unpacked and select the sync-notes-extension directory.
   6. Use the Extension
Pin the extension to your Chrome toolbar for easy access.
The updates on SyncNotes are made with the help of my team with github profiles as : @Shraddha290, @s_jashwant_21 ,@Shobhit-20-04
You can see thier work on : https://www.linkedin.com/in/shraddha-khachane-7143a7262/  ,
https://www.linkedin.com/in/shobhit-agrawal-b79279252/   ,
https://www.linkedin.com/in/shaan-jashwant-47ba1a257/
Click the extension icon to open the popup and start saving notes.

It is the updated version of the one i uploaded on july:
![image](https://github.com/user-attachments/assets/d2119fe4-740f-4c02-b83e-b013aa862424)

