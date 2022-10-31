<h1>Weather App</h1>

This is a project made for submission of Software Engineering Principles (CSI1007) class.

<h3>Techstack:</h3>

- UI: React, NextJS
- Backend: GoLang
- DB: SQLite

<hr>

<h2>Project Structure</h2>

    .
    ├── server                             # server
    |   ├── handlers                         # backend handlers
    |   |   ├── user.go                        # manages all user related flows eg: CRUD on prefs
    |   |   ├── weather.go                     # manages all weather related flows eg: CRUD on weather data
    |   |   ├── events.go                      # manages all events related flows eg: CRUD on events
    |   |   ├── auth.go                        # manages all auth related flows eg: login, logout, signup
    |   |   ├── serve_ui.go                    # serves the the static files generated by NextJS
    |   ├── models                           # backend models for the database and backend flows
    |   |   ├── user_preferences.go            # user preferences model
    |   |   ├── weather.go                     # weather model
    |   |   ├── events.go                      # events model
    |   ├── router                           # routes all the traffic
    |   |   ├── router.go                      # manages GET, POST, PUT, DELETE requests
    |   ├── main.go                          # main entry point for the server/backend
    ├── ui                                 # UI directory
        ├── pages                            # every frontend page
        |   ├── index.js                       # home page
        |   ├── login.js                       # login page
        |   ├── signup.js                      # signup page
        |   ├── preferences.js                 # user preferences page
        ├── components                       # resuable REACT components
            ├── navbar.js                      # navbar component
            ...                                # more components
            ...
    ├── .github                              # GitHub Actions Workflows (CI/CD)
    |   ├── workflows                          # includes all the workflows like build backend/UI, test
    |       ├── ...                            # more workflows
    ├── README.md                            # this file    
    ├── Makefile                             # makefile for the project (includes all types of commands)
    └── LICENSE                              # Project License

<hr>

[Copyright (c)](/LICENSE) <br>

Developed and Maintained by Pranav Singh
