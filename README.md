# Telegraph Clone

Pre-Requisites
=======================
- Have docker installed on your machine
- http-server installed globally to run the client side

Installation
=======================

1. Clone the repository
2. cd into the repo folder
3. Run `docker compose up`
4. Wait for all docker containers to be ready

Usage
=======================

Client Side
1. cd into the client folder
2. run http-server or vscode live server
3. Open a browser 
4. Navigate to http://localhost:8080
5. Complete the form
6. Click Publish

You are then presented with the post you just made

Available APIs
#### GET
- `/` - Greeting message
- `/{id}` - Retrieve a single post by id

id is composed of title-day-month

#### POST
- `/` - Create a new post
    This requires a json payload in the following format...
    ```{
        "title": "",
        "author": "",
        "content": ""
    }```

######## CHANGELOG ##########

- Set up basic express server
- Build out client side with basic form
- Add Post model with create method
- Set up POST route
- Add Docker Compose to include Mongo database
- Client side logic for removing form and retrieving post
- Add CSS styling
- Code to deal with posts with same name
- Add logic for when no post is found
- Add 404 page

########### BUGS / OUTSTANDING DEV ###########

- [] Allow images and videos to be added
- [] Add testing suite
- [x] Add 404 page
