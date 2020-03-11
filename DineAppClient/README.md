# DineAppClient

## Project setup
```
npm install
```Clone or DownLoadRepo from
https://github.com/gajananpojage/DATARepo

Extract the DataRepo-master.zip
Navigate to DataRepo-master/DineAppClient Folder
Open Command Prompt at this path
run npm install command
eg.C:\Dev\Projects\DATARepo-master\DineAppClient>npm install
 (If any issue occurs in future with node-module) just delete node-module folder& package-lock.json file)
and rerun npm install

On successful run run below command

npm run serve

### Compiles and hot-reloads for development
```
npm run serve
```
access application on
http://localhost:8080/

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```
### Functionality

This will show url to access application.
Click on Left Top Icon to open Sidebar.
Dummy Json data is usedto list Jobs, Profile & Validation List Operation such as filtering and 
navigating to result tab.
Functionality:
On application Load setting up some dummy json data records for Job,Profile and Validation.
User can create Job,Profile,Validation using Create Tab.
User can view the created Job,Profile,Validation in List Tab and also can filter records and sort By criteria provided.
User can click on any item in List View and navigate to result Tab, which display more details of specific record.
Createdrecord will be added at the top of list

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

