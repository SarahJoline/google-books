# google-books

![App Screenshot](/client/public/screenshot.png)

### What the app does:

This app used the Google Books API so users can look for books. They can then save the book to MongoDB to create a reading list. They can later check the books off their list with the delete button. Clicking on the book will bring you directly to the Google Books page for the book where you can find more information. This app uses react-router-dom to switch between components.

Happy Reading!

### To get the app running:

After cloning the repo run:

> npm install

To run the app on your computer run:

> npm run dev

### Database:

The Schema includes:

- id - ID of the book from the Google Books API

- title - Title of the book from the Google Books API

- authors - The book's author(s) from the Google Books API

- description - The book's description from the Google Books API

- image - The thumbnail image from the Google Books API

- link - The book information link from the Google Books API

However, for styling purposes, only the image appears on the pages.

### Technoligies used:

- MongoDB
- Express
- React
- Node.js

Styled with love and CSS.

### Live site:

Deployed on Heroku

https://app-google-books.herokuapp.com/
