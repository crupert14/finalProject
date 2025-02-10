FOLDER STRUCTURE

- database
    Where we will house any logic that connects to the database
- models
    Self explanatory, folder for database models, if you don't know what it is
    theres alot of resources online or shoot me(Cade) a text at +1(609)678-7207
- node_modules
    Do not touch or modify under any circumstances, these are predownloaded modules
    from npm (node package manager)
- public
    For storing images/assets that will be used on the front end
- routes
    For routes to different pages on the site, will hold the logic to display the page
- src
    Will hold CSS and JavaScript files meant for webpage looks/interaction
- views
    Will be accessed by the routes file, will either hold HTML, ejs, pug or other
    front-end languages that will be used to display the web page

ROOT FILES
- .env
    Holds environment variables that will be accessible from any code file so long as
    dotenv.config() is in the beginning
- .gitignore
    Tells github which files not to publish publicly, reserved for private information 
    like API keys
- package.json
    Lists details about the project, scripts, the name, etc
- README.md
    The file you're reading, used to describe how an application works/how it is used
- server.js
    File that will be run to start the application/called whenever the website is requested
    by a server or computer (wherever you are running it)