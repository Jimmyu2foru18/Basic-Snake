# Snake Master - Tailwind Edition

This is a classic Snake game implemented using HTML, JavaScript, and styled with **Tailwind CSS** for a modern look and feel.

## How to Play

1.  Open the `index.html` file in your web browser.
2.  Use the **arrow keys** (Up, Down, Left, Right) to control the snake.
3.  The goal is to eat the yellow food blocks that appear on the screen.
4.  Each time the snake eats food, it grows longer, and your score increases.
5.  The game ends if the snake hits the walls or runs into itself.
6.  An alert will show your final score. You can click the "Restart" button or press any key to play again.

## Features

*   Sleek, dark-themed UI powered by Tailwind CSS.
*   Responsive design for various screen sizes (basic).
*   Clear score display and restart functionality.
*   Keyboard controls for snake movement.

## Deployment on GitHub Pages

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic deployment to GitHub Pages.

1.  **Create a new repository** on GitHub.
2.  **Push the code** (including `index.html`, `style.css`, `script.js`, and the `.github` folder) to your new repository's `main` branch (or your default branch).
3.  **Enable GitHub Pages** in your repository settings:
    *   Go to your repository's "Settings" tab.
    *   Navigate to the "Pages" section in the left sidebar.
    *   Under "Build and deployment", for the "Source", select "GitHub Actions".
4.  The GitHub Actions workflow will automatically build and deploy your site.
5.  Your game will be available at `https://<your-username>.github.io/<repository-name>/` shortly after the action completes.

Alternatively, for a manual deployment (without GitHub Actions):
1. Ensure your repository has the `index.html`, `style.css`, and `script.js` files in the root of the `main` (or `master`) branch.
2. Go to your repository's "Settings" > "Pages".
3. Under "Build and deployment", for the "Source", select "Deploy from a branch".
4. Choose your `main` (or `master`) branch and the `/ (root)` folder, then click "Save".

Enjoy the game!