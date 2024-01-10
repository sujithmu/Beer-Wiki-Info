# Project Title - Beer Wiki Info
This project is a responsive web application built with React and TypeScript. Using this web app user can search and add 'beer' to favorites.


## Technologies Used
**React**: A JavaScript library for building user interfaces.
**TypeScrip**t: A strict syntactical superset of JavaScript, adding optional static typing.
**Vite**: Build tool that creates and loads react applications faster than RCA (Create React App).
**Vitest**: Vitest is a JavaScript unit testing framework.

## Project Structure
This project is designed with a user-friendly interface and consists of several key components

1. **Home Page**: Is the entry point of the application. User can route to list of beers screen. Favourite Beers can be found here.
2. **Beer List**: Screen where user can find complete list of beers available. Users can search and sort for beers and list also contains pagination.
3. **Beer**: User while clicking on a beer will be redirected to 'Beers' screen where he can find additional information about beers.

Organized Folder Structure: The project follows a specific folder structure to make the codebase easier to navigate and maintain. Each feature of the application has its own directory, which contains all the related components and hooks functions. This modular structure promotes separation of concerns and makes it easier to find and update specific parts of the codebase, providing a better understanding of the functionality of each part of the application.

## Key Features
1. **Material UI**: Material UI is an open-source React component library that implements Google's Material Design.
2. **Reusable Components, Hooks**: The project is structured to promote reusability, with common functionality extracted into reusable components and hooks.

## Testing
Unit testing is configure using **Vitest** which is a JavaScript unit testing framework.

## Error Handling
**Error Boundary**: This project uses Error Boundaries provided by React for better error handling. Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

## Performance Optimization
**React.lazy**: This project uses React.lazy for code splitting by route. React.lazy function lets you render a dynamic import as a regular component. It helps to load components lazily as they are rendered, which can significantly improve performance in larger apps.

## Running the Project Locally
To run the project locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory in the terminal.
3. Run npm install to install the project dependencies.
4. Run npm run dev to start the frontend development server. Is should open up in 'http://localhost:5173/'
5. Run unit tests using npx vitest from the root of the project.
