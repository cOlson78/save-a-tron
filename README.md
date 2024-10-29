# save-a-tron
Save a ton with Save-A-Tron!

# Repository Structure
We have two main folders: frontend and backend. 'frontend' contains the React project that will be our front end of the project. 'backend' holds the Python files that will do the scraping commands and database servers.

The "testing" folder contains files we use during the development of the program to experiment with technologies before we want to implement them into our actual project. 

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

# Whisper AI set up
Whisper AI is used in this project for voice-to-text applications. To use the Whisper AI features on your local machines, there is a :
1. Install the whisper tar.gz file for your machine (found here: https://pypi.org/project/openai-whisper/#description)
2. Install it using pip.
3. Download FFmpeg on its website (https://ffmpeg.org/download.html) or its GitHub page (https://github.com/BtbN/FFmpeg-Builds/releases). This is needed to work with audio files and processing. 
4. Add FFmpeg.exe to your systems path. The process is different for different systems, but here is how you would do so on windows:
  a. Right-click "This PC" and select Properties.
  b. Click Advanced system settings and then Environment Variables.
  c. Under System Variables, find the Path variable, select it, and click Edit.
  d. Click New and add the path to the folder where ffmpeg.exe is installed (e.g., C:\ffmpeg\bin\).
6.  To test that it worked, go to your console and type in ffmpeg --version.
