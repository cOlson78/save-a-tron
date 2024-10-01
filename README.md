# save-a-tron
Save a ton with Save-A-Tron!

# React and Flask connection
It's not really "connected" per say, but Flask acts like an API that the React front end can retreive data from.

It works because in package.json, there is a "proxy" heading to port 5000. That is where the Flask server is, and how React can get that data.

# Setting up the conenction

Here is how you can know that the connection works for you: 

Back-end:
1. Make sure you have Python and Flask installed.
2. From the "save-a-tron" folder, type in "python backend/server.py" in the console
3. If it works, it should go into a development server at port 5000

Front-end:
1. Make sure npm is installed (I think you get it from installing Node.js)
2. If you are using Visual Studio Code, make sure you are IN the frontend folder
3. Type in "npm start"
4. If it works, it should go into a development server at port 3000. It also should automatically open it in your browser.

To make sure each development server is working at the same time, it is recommended that you have two different windows of Visual Studio Code open, one to the "save-a-tron" folder for the Flask back-end, and the "frontend" folder for the React front-end.