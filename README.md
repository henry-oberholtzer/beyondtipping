# Beyond Tipping
_by [Brianca Knight](https://github.com/BriancaKnight)  | [Henry Oberholtzer](https://github.com/henry-oberholtzer) | [Kim Robinson](https://github.com/kimmykokonut) | [Noah Kise](https://github.com/NoahKise)_

* Splash page here

---
### <u>Jump to section</u>
* <a href="#about-the-project">About the Project</a>
  * <a href="#description">Description</a>
  * <a href="#built-with">Built With</a>
  * <a href="#known-bugs">Known Bugs</a>
* <a href="#getting-started">Getting Started</a>
  * <a href="#prerequisites">Prerequisites</a>
  * <a href="#setup">Setup</a>
  * <a href="#api-documentation">API Documentation</a>
* <a href="#setup-client-side">Setup Client Side</a>
* <a href="#stretch-goals">Stretch Goals</a>
* <a href="#license">License</a>
  * <a href="#acknowledgements">Acknowledgements</a>
---

## About the Project

## Description
An application that lists restaurants that have removed the tipping model, opting for a flat price on menus or implementing a service fee.  Restaurants available as a list or interactive map.

## Built With
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Known Bugs
* None at this time

## Getting Started

## Prerequisites

#### Install Postman
(Optional) [Download and install Postman](https://www.postman.com/downloads/).

#### Code Editor
  To view or edit the code, you will need a code editor or text editor. The open-source code editor we used is VisualStudio Code.

  1) Code Editor Download: [VisualStudio Code](https://www.npmjs.com/)
  2) Click the download most applicable to your OS and system.
  3) Wait for download to complete, then install -- Windows will run the setup exe and macOS will drag and drop into applications.

## Setup

### Clone repository

1. Navigate to the [repository](https://github.com/henry-oberholtzer/beyondtipping).

2. Click the `Fork` button and you will be taken to a new page where you can give your repository a new name and description. Choose "create fork".

3. Click the `Code` button and copy the url for HTTPS.

4. On your local computer, create a working directory of your choice.

5. In this new directory, via the terminal, type `$ git clone https://github.com/henry-oberholtzer/beyondtipping`.

6. Run the command `cd beyondtipping` to enter into the project directory.

7. View or Edit: On your terminal, type `$ code .` to open the project in VS Code.

8. In VSCode- in project directory of the terminal: type `$ npm install` to compile the application's code and install all needed dependencies.

(You may need to have these installed manually (and create a Prismic account)):
```
$ npx @slicemachine/init@latest
$npm i clsx
 ```

9. Run local server: `$ npm run dev`
(This will be located at: http://localhost:3000/)
(this command should run front and back end at the same time-http://127.0.0.1:8000/)

### Flask

1. Install Homebrew
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. Install python 3
`$ brew install python@3`
3. Create a virtual environment
`$ python3 -m venv .venv`
4. Enter virtual environment
`$ source .venv/bin/activate`
5. Install packages and dependencies
`$ pip install -r /requirements.txt`
6. Run api server: http://127.0.0.1:8000/
`$ python index.py`

### Database

- SQLite is integrated into Flask
- ??? PW .env?

#### Launch the API
1) Navigate to api directory using the MacOS Terminal or Windows Powershell.
2) Run the command `flask run` to have access to the API in Postman or browser via flask rest(not sure if this exists?) `http://localhost:5000/admin`
---
???
---
3) You can close the server at anytime by entering `ctrl` + `c` in the terminal. 

---

## API Documentation
- Explore the API endpoints in Postman

* Account registration
  - None at this time

* API Endpoints

- Base Url: `https://localhost:5000`

#### HTTP Request Structure
```
GET /restaurants  | Gets list of restaurants from database  
POST /restaurants | Creates new restaurant object
GET /restaurants/{id} | Gets restaurant by id
PUT /restaurants/{id} | Edits restaurant by id
DELETE /restaurants/{id}  | Deletes restaurant by id
GET /types  | Gets list of tipping types
GET /types/{id} | Gets tip type by id
```
---

#### Example Query
```
https://localhost:5000/restaurants/1
```

#### Sample JSON Response
```
  {
        restaurantId: 1,
        name: "Bernstein's Bagels",
        address: "816 N Russell St, Portland, OR 97227",
        coordinates: "45.54178453985534, -122.67473068332497",
        websiteUrl: "https://bernsteinsbagels.com/",
        imageUrl: "https://static1.squarespace.com/static/58715578e6f2e1d4215c94fb/t/62278b3792539d0c2c8cacab/1646758711651/LOGO.jpg?format=1500w",
        typeId: 1
    }
```

#### Path Parameters
| Parameter | Type | Default | Required | Description |
| :---: | :---: | :---: | :---: | --- |
| name | string | none | true | Return matches by name.

#### Example Query
```
https://localhost:5000/restaurants/?name=bagel
```

#### Sample JSON Response
```
{
        restaurantId: 1,
        name: "Bernstein's Bagels",
        address: "816 N Russell St, Portland, OR 97227",
        coordinates: "45.54178453985534, -122.67473068332497",
        websiteUrl: "https://bernsteinsbagels.com/",
        imageUrl: "https://static1.squarespace.com/static/58715578e6f2e1d4215c94fb/t/62278b3792539d0c2c8cacab/1646758711651/LOGO.jpg?format=1500w",
        typeId: 1
    }
```


---

## Setup Client Side
* WIP

## Stretch Goals
* Build out Restaurant model (hours, foodType)
* Clickable restaurant to info

## License

## Acknowledgements
