// import Accordion from "@material-ui/core/Accordion"
// import AccordionDetails from "@material-ui/core/AccordionDetails"
// import AccordionSummary from "@material-ui/core/AccordionSummary"
// import Card from "@material-ui/core/Card"
// import CssBaseline from "@material-ui/core/CssBaseline"
import Slide from "@material-ui/core/Slide"
// import { ThemeProvider } from "@material-ui/styles"
// import { isMobile } from 'react-device-detect';
import React, { useContext, useEffect, useState } from "react"
import Draggable from "react-draggable"
import { connect } from "react-redux"
import {
  BookNowIcon,
  BookNowIconForMobile,
  PoweredByBookinglane,
  // CloseWidgetIcon,
} from "./assets/icons"
import CheckOut from "./Components/CheckoutForm/CheckOut/CheckOut"
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile"
import {
  getCompanyProfile,
  initializing,
} from "./Redux/company-profile-reducer"
// import { getCompanyToken } from "./Redux/company-token-reducer"
// import theme from "./Theme"

import { userScreenHeight, userScreenWidth, useStyles } from "./AppStyles"
import { AppBar, useMediaQuery } from "@material-ui/core"
import { useRef } from "react"
// import Slide1 from "@mui/material/Slide"
import { Preloader } from "./Components/Helpers/Preloader/Preloader"
import styles from "./AppStyles.module.scss"
import ThemeContext from "./context"
import styled from "styled-components"
import StepsIndicator from "./Components/CompanyProfile/StepsIndicator"
import poweredByBookinglane from "./assets/PoweredByBookinglane.png"
// import ReCAPTCHA from "react-google-recaptcha"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

let xOrdinate = 0
let yOrdinate = 0
// const cardHeight = document.getElementById("mainContent").clientHeight

const App = (props) => {
  // const classes = useStyles(props)
  // const [positionsX, setPositionsX] = useState(null)
  // const [positionsY, setPositionsY] = useState(null)
  // useEffect(() => {
  //   console.log(window.positionX)
  //   setPositionsX(window.positionX)
  //   setPositionsY(window.positionY)
  //   console.log(positionsX, positionsY)
  // }, [positionsX, positionsY])

  const [activeStep, setActiveStep] = React.useState(0)
  let position = React.useRef({
    x: window.positionX,
    y: -50,
  })
  console.log(position)
  const [expanded, setExpanded] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  // const [disabledWidget, setDisabledWidget] = React.useState(false)
  // const [open, setOpen] = React.useState(false)
  const [heightOfCard, setHeightOfCard] = React.useState(0)
  const refOfCard = useRef(null)
  const [heightOfBookNow, setHeightOfBookNow] = React.useState(0)
  const [backgroundScrollStop, setBackgroundScrollStop] = React.useState(false)
  const [
    backgroundScrollStopForTimePicker,
    setBackgroundScrollStopForTimePicker,
  ] = React.useState(false)
  // const [draggable, setDraggable] = React.useState(false)

  const refOfBookNow = useRef(null)

  const handleClose = () => {
    setExpanded(false)
    document.body.style.overflowY = "unset"
    // position.current.y = 10

    if (userScreenWidth - xOrdinate < 500) {
      position.current.x = userScreenWidth - 390
    }
  }
  {
    /* Этот обработчик для того чтобы при закрытии виджета кнопка book now стояла в самом краю без этого она сдвигаетсяв лево */
  }

  React.useEffect(() => {
    if (backgroundScrollStop) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [backgroundScrollStop])

  const settingHeight = () => {
    setHeightOfCard(refOfCard.current?.clientHeight)
  }

  React.useEffect(() => {
    localStorage.removeItem("captcha")
    // setHeightOfBookNow(refOfBookNow.current.clientHeight)
  }, [])
  // props.getCompanyToken()
  // React.useEffect(() => {
  //   if (props.loading) {
  //     setDisabled(true)
  //   } else {
  //     setDisabled(false)
  //   }
  // }, [props.loading])
  const handleDrag = (e, ui) => {
    position.current.x = ui.x
    position.current.y = ui.y
    if (!expanded)
      setTimeout(() => {
        setDisabled(true)
      }, 150)
  }

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const jwtToken = localStorage.getItem("Authorization")

  useEffect(() => {
    // if (jwtToken) {
    //   return
    // }
    if (jwtToken) {
      props.getCompanyProfile()
    }
    // props.getCompanyProfile()
  }, [props.getCompanyProfile, jwtToken])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const isMobile = useMediaQuery("(max-width:867px)")
  const biggerBackgroundImage = useMediaQuery("(max-width:1033px)")
  const forBostonLimousineToDisplayIconOnTheLeft =
    useMediaQuery("(max-width:500px)")

  // let stylesForBody = `
  //   z-index: 1000000000;
  //   position: fixed;
  // bottom: 0;
  // width: 100%;
  // `
  //   bottom: 50px;
  // right: 0;
  // left: 50px;
  // document.getElementById("widget-by-bookinglane").style = stylesForBody

  const containerRef = React.useRef(null)

  const leftOrRight = window.leftOrRight

  const positioningForWithoutDraggableAppXAndY = React.useRef({
    x: window.positionXforWithoutDraggableApp,
    y: window.positionYforWithoutDraggableApp,
  })
  console.log(window)

  // function onChange(value) {
  //   console.log("Captcha value:", value)
  //   window.localStorage.setItem("captcha", value)
  // }

  const {
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
    stepsIndicatorBackgroundColor,
    stepsIndicatorFontColor,
    logoAndCompanynameBackgroundColor,
    logoAndCompanynameFontColor,
    logoAndCompanynameBorderColor,
    poweredByBookinglaneBackgroundColor,
    poweredByBookinglaneFontColor,
  } = useContext(ThemeContext)

  return (
    // <Draggable
    //   onDrag={handleDrag}
    //   onStop={enableAccordionButton}
    //   position={position.current}
    //   // defaultPosition={{ x: userScreenWidth, y: 25 }}

    //   // disabled={false}
    //   // bounds="body"
    //   handle=".companyProfileClassForDrag, #booknowIcon"
    // >
    <div ref={containerRef} className={styles.mainBookNowWrapper}>
      {BackgroundImage ? (
        <img src={BackgroundImage} className={styles.backgroundImage} />
      ) : (
        <div
          className={styles.backgroundImage}
          style={{ background: "black" }}
        ></div>
      )}
      {/* <BookNowIconBlock
                    // elevation={0}
                    // disabled={disabled}
                    onClick={() => {
                      handleChange()
                      setBackgroundScrollStop(true)
                      setExpanded(true)
                    }}
                    // className={
                    //   disabled
                    //     ? styles.mainBookNowIconDisabledWhileDragging
                    //     : styles.mainBookNowIconEnabledWhileDragging
                    // }
                    style={{ display: expanded ? "none" : "block" }}
                    bookNowIconFontAndCircleBorderColor={
                      bookNowIconFontAndCircleBorderColor
                    }
                    bookNowIconBackgroundColor={bookNowIconBackgroundColor}
                    disabled={disabled}
                    ref={refOfBookNow}
                    id="booknowIcon"
                  >
                    
                    <BookNowIcon color={bookNowIconFontAndCircleBorderColor} />
                    <span className={styles.bookNow}>BOOK NOW!</span>
                  </BookNowIconBlock> */}
      {props.initializing ? (
        <div className={styles.cardContainerShow} ref={refOfCard}>
          {/* <div
            // position="sticky"
            className={styles.divForStickyHeader}
          >
            <div className="companyProfileClassForDrag"> */}
          {/* этот класс c div-oм для реакт драга чтобы можно было перетаскивать по шапке виджета*/}
          <div className={styles.companyProfile}>
            {/* это для pointer cursora */}
            <CompanyProfile
              setExpanded={handleClose}
              initializing={props.initializing}
              expanded={expanded}
              setActiveStep={setActiveStep}
              setBackgroundScrollStop={setBackgroundScrollStop}
            />
          </div>

          <div
            style={{
              width: "100%",
              height: !isMobile ? "100%" : "auto",
              // overflowY: "auto",
              // background: BackgroundImage
              //   ? `url(${BackgroundImage}) center no-repeat`
              //   : ThemeProviderAppBackgroundColor,
              background: ThemeProviderAppBackgroundColor,
              // backgroundPositionY: "23%",
              // backgroundSize: !biggerBackgroundImage ? "100%" : "390%",
            }}
          >
            <div className={styles.stepsIndicatorContainer}>
              <StepsIndicator activeStep={activeStep} />
            </div>

            {/* </div>
          </div> */}

            <div
              // ref={refOfCard}
              // style={{ borderRadius: "10px" }}
              className={styles.contentContainer}
              // style={{
              //   background: ThemeProviderAppBackgroundColor,
              // }}
            >
              <CheckOut
                isFetching={props.isFetching}
                setExpanded={handleClose}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                nextStep={nextStep}
                backStep={backStep}
                setBackgroundScrollStop={setBackgroundScrollStop}
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "50px",
              textAlign: "center",
              paddingTop: "11px",
              paddingBottom: "11px",
              background: poweredByBookinglaneBackgroundColor,
              borderTop: `1px solid ${logoAndCompanynameBorderColor}`,
            }}
          >
            <a
              style={{ textDecoration: "none" }}
              href="https://bookinglane.com/"
            >
              {/* <img
              src={poweredByBookinglane}
              style={{ width: "150px", height: "34px" }}
            ></img> */}
              <PoweredByBookinglane color={poweredByBookinglaneFontColor} />
            </a>
          </div>
          {/* <ReCAPTCHA
          sitekey="6LeuP3weAAAAAHoe3aaP27xmYorD1s1vXK7XdlPk"
          onChange={onChange}
        /> */}
        </div>
      ) : (
        <Preloader />
      )}
    </div>
    // </Draggable>
  )
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.cars.isFetching,
    companyName: state.companyProfile.profile.companyName,
    initializing: state.companyProfile.initializing,
    // loading: state.companyToken.loading,
  }
}

export default connect(mapStateToProps, { getCompanyProfile })(App)
