# New Back-end Componenets for this project

## Multer for file uploads
We chose Multer because it fits well with our project theme, the Hall of Fame. It allows us to upload and store images of the greatest players, along with their stats and achievements.

## Implementation and Integration plans

### Objective

The purpose of this Multer for my project is to implement a image upload feature for players in the Hall of Fame.
It allows users to upload and display the images of players.

### Implementation and Integration

The system will receive the images from users, store them on the server and display images on the website.

In order to implement multer, we will:
- Install the multer dependency
- Create multer configuration file
- Update player interface for storing the URL of images
- Update player route and controller for handling image uploading
- Add static middleware in app.ts to make stored files accessible via HTTP URLs