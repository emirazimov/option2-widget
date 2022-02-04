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
  // CloseWidgetIcon,
} from "./assets/icons"
import CheckOut from "./Components/CheckoutForm/CheckOut/CheckOut"
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile"
import {
  getCompanyProfile,
  initializing,
} from "./Redux/company-profile-reducer"
import { getCompanyToken } from "./Redux/company-token-reducer"
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

  const handleChange = (panel) => (event, isExpanded) => {
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    position.current.y = -10
    if (userScreenWidth - xOrdinate < 500) {
      position.current.x = userScreenWidth - 390
    }
    if (xOrdinate < -20) {
      position.current.x = 0
    }
    setExpanded(isExpanded ? panel : false)
  }

  const enableAccordionButton = (e) => {
    setTimeout(() => {
      setDisabled(false)
    }, 200)

    {
      /*Этот обработчик чтобы сам раскрывшийся виджет не выходил за рамки экрана если перетаскивается за пределы то он возвращается */
    }
    if (expanded) {
      yOrdinate = position.current.y
      xOrdinate = position.current.x
      if (xOrdinate + 500 > userScreenWidth) {
        position.current.x = userScreenWidth - 380
      }
      if (xOrdinate < -20) {
        position.current.x = 0
      }
      if (yOrdinate - (heightOfCard + 75) < -userScreenHeight) {
        position.current.y = -userScreenHeight + (heightOfCard + 75)
      }
      if (yOrdinate > 0) {
        position.current.y = 0
      }
    }
    {
      /*Тот же обратчик только для иконки Book Now! с пульсацией до раскрытой иконке*/
    }
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    if (xOrdinate < 0) {
      position.current.x = -60
    }
    if (xOrdinate + 300 > userScreenWidth) {
      position.current.x = userScreenWidth - 400
    }
    if (yOrdinate - 215 < -userScreenHeight) {
      position.current.y = -userScreenHeight + 240
    }

    if (yOrdinate > 0) {
      position.current.y = 0
    }
    // console.log(position.current.y)
    // console.log(userScreenHeight)
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
    settingHeight()
    // setHeightOfBookNow(refOfBookNow.current.clientHeight)
  }, [heightOfBookNow])
  props.getCompanyToken()
  React.useEffect(() => {
    if (props.loading) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [props.loading])
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

  // useEffect(() => {
  //   if (jwtToken) {
  //     return
  //   }

  //   props.getCompanyToken()
  // }, [jwtToken])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const isMobile = useMediaQuery("(max-width:530px)")
  const isiPad = useMediaQuery("(max-width:1024px)")
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
  // var iframe = document.createElement("iframe")
  // // iframe.setAttribute("id", "widget-by-bookinglane")
  // document.getElementsByTagName("h1").appendChild(iframe)

  // var metaForScale = document.createElement("meta")
  // metaForScale.setAttribute("name", "viewport")
  // metaForScale.setAttribute(
  //   "content",
  //   "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  // )
  // useEffect(() => {}, [
  //   document.getElementsByTagName("head")[0].appendChild(metaForScale),
  // ])

  // console.log("success")
  // document.body.querySelector(".jss3").style.display = "block"

  const {
    ThemeProviderAppBackgroundColor,
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
    BackgroundImage,
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
      {jwtToken && (
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
              height: "100%",
              background: `url(${BackgroundImage}) center no-repeat`,
              backgroundPositionY: "0",
              backgroundSize: "100%",
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
              {props.initializing ? (
                <CheckOut
                  isFetching={props.isFetching}
                  setExpanded={handleClose}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  nextStep={nextStep}
                  backStep={backStep}
                  setBackgroundScrollStop={setBackgroundScrollStop}
                />
              ) : (
                <Preloader />
              )}
            </div>
          </div>
        </div>
      )}
      {!jwtToken && null}
    </div>
    // </Draggable>
  )
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.cars.isFetching,
    companyName: state.companyProfile.profile.companyName,
    initializing: state.companyProfile.initializing,
    loading: state.companyToken.loading,
  }
}

export default connect(mapStateToProps, { getCompanyProfile, getCompanyToken })(
  App
)

const BookNowIconBlock = styled.div`
  pointer-events: ${(props) => {
    if (props.disabled) {
      return "none"
    }
  }};
  opacity: ${(props) => {
    if (props.disabled) {
      return " 0.5"
    }
  }};
  @keyframes pulse {
    10% {
      -moz-box-shadow: 0 0 0 0
        ${(props) => props.bookNowIconFontAndCircleBorderColor};
      box-shadow: 0 0 0 0
        ${(props) => props.bookNowIconFontAndCircleBorderColor};
    }
    38% {
      -moz-box-shadow: 0 0 0 0
        ${(props) => props.bookNowIconFontAndCircleBorderColor};
      box-shadow: 0 0 3px 4.5px
        ${(props) => props.bookNowIconFontAndCircleBorderColor};
    }
    100% {
      -moz-box-shadow: 0 0 0 0
        ${(props) => props.bookNowIconFontAndCircleBorderColor};
      box-shadow: 0 0 0 0 tranparent;
    }
  }

  // padding-left: 0px;
  // &:before {
  //   background-color: white;
  // }

  // padding: 0px;
  width: 104px;
  height: 104px;
  position: fixed;
  bottom: 0px;
  left: 0;
  cursor: pointer;
  transition: 0ms;
  animation-name: pulse;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  background-color: ${(props) => props.bookNowIconBackgroundColor};
  filter: opacity(1);
  -webkit-filter: opacity(1);
  border-radius: 50%;

  @media (max-width: 500px) {
    width: 87px;
    height: 87px;
  }
`
