import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import ThemeContext from "./context"
import store from "./Redux/redux-store"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// var divForReact = document.createElement("div")

// divForReact.setAttribute("id", "widget-by-bookinglane")
// document.getElementsByTagName("body")[0].appendChild(divForReact)
// var head = document.getElementsByTagName("head")[0]

// head.innerHTML += `<link
//       rel="stylesheet"
//       href="https://bookinglane-widgets.s3.us-east-2.amazonaws.com/Global-widget-files/widget.css"
//     />`

// console.log(window.location.pathname)

var ThemeProviderAppBackgroundColor = window.ThemeProviderAppBackgroundColor

var bodyBackgroundColor = window.bodyBackgroundColor

var fontColor = window.fontColor

var borderRadiusesForInnerElements = window.borderRadiusesForInnerElements

var borderRadiusesForWholeApp = window.borderRadiusesForWholeApp

var borderColorForInnerElements = window.borderColorForInnerElements

var borderColorForOuterApp = window.borderColorForOuterApp

var carsTypeColor = window.carsTypeColor

var hoverColor = window.hoverColor

var iconsColor = window.iconsColor

var inputsFontColor = window.inputsFontColor

var backAndNextButtonsColor = window.backAndNextButtonsColor
var backAndNextButtonsFontColor = window.backAndNextButtonsFontColor
var backAndNextButtonsBorderColor = window.backAndNextButtonsBorderColor
var innerTextOnHover = window.innerTextOnHover
var inputsBackground = window.inputsBackground

var bookNowIconFontAndCircleBorderColor =
  window.bookNowIconFontAndCircleBorderColor

var bookNowIconBackgroundColor = window.bookNowIconBackgroundColor
var BackgroundImage = window.BackgroundImage

var fleetCarsBackgroundColor = window.fleetCarsBackgroundColor
var fleetCarsBorderColor = window.fleetCarsBorderColor
var logoAndCompanynameBackgroundColor = window.logoAndCompanynameBackgroundColor
var logoAndCompanynameFontColor = window.logoAndCompanynameFontColor
var stepsIndicatorBackgroundColor = window.stepsIndicatorBackgroundColor
var stepsIndicatorFontColor = window.stepsIndicatorFontColor
var poweredByBookinglaneBackgroundColor =
  window.poweredByBookinglaneBackgroundColor
var poweredByBookinglaneFontColor = window.poweredByBookinglaneFontColor
var mapBackground = window.mapBackground
var previewBlocksBorderColor = window.previewBlocksBorderColor
// font-color-for-customize

var body = document.getElementsByTagName("body")[0]
body.style = `background: ${bodyBackgroundColor}; margin: 0;`

function Main() {
  return (
    <Provider store={store}>
      <ThemeContext.Provider
        value={{
          ThemeProviderAppBackgroundColor,
          BackgroundImage,
          fontColor,
          borderRadiusesForInnerElements,
          borderRadiusesForWholeApp,
          borderColorForInnerElements,
          borderColorForOuterApp,
          carsTypeColor,
          hoverColor,
          iconsColor,
          backAndNextButtonsColor,
          innerTextOnHover,
          inputsFontColor,
          inputsBackground,
          bookNowIconFontAndCircleBorderColor,
          bookNowIconBackgroundColor,
          backAndNextButtonsFontColor,
          backAndNextButtonsBorderColor,
          fleetCarsBackgroundColor,
          fleetCarsBorderColor,
          stepsIndicatorBackgroundColor,
          stepsIndicatorFontColor,
          logoAndCompanynameBackgroundColor,
          logoAndCompanynameFontColor,
          poweredByBookinglaneBackgroundColor,
          poweredByBookinglaneFontColor,
          mapBackground,
          bodyBackgroundColor,
          previewBlocksBorderColor,
        }}
      >
        <App />
      </ThemeContext.Provider>
    </Provider>
  )
}

// document.getElementById("widget-by-bookinglane")

// // get our shadow HOST
// const host = document.querySelector('#react-app');
// // create a shadow root inside it
// const shadow = host.attachShadow({ mode: 'open' });
// // create the element where we would render our app
// const renderIn = document.createElement('div');
// // append the renderIn element inside the shadow
// shadow.appendChild(renderIn);

// document.querySelector("#widget-by-bookinglane")

// const root = document.querySelector("#widget-by-bookinglane")
// root.attachShadow({ mode: "open" })

ReactDOM.render(<Main />, document.getElementById("widget-by-bookinglane"))

reportWebVitals()

// render(<Main />, root.shadowRoot)
// <Router>
//     <Routes>
//       <Route path="/" element={<Main />}></Route>
//     </Routes>
//   </Router>
