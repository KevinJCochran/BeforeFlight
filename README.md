# BeforeFlight

## Installation
Clone this repo then run the following command to install dependencies:
```shell
npm install
```
You may get a `fsevents` error. I fixed it by installing Xcode
and try again. Then run the following to start the dev server:
```shell
npm start
```

## Usage guide

On load, you will be presented with a list of airports to view.
Clicking on the "more info" button will take you to the airport's
page. You can also use the search bar at the top of the screen to
go directly to an airport you wish to see. The only airports currently
available are `kaus`, `50r`, `egll`, and `khou`.

## Specification
### Input:
- One or more airport identifiers: `kaus`, `50r`, `egll`, `khou` .
