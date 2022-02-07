import React, { useContext, useEffect } from "react"
import { connect } from "react-redux"
import {
  getCompanyProfile,
  setGotAddressError,
} from "../../Redux/company-profile-reducer"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
// import { makeStyles } from '@material-ui/core/styles'
// import { CloseWidgetIcon } from "../../assets/icons"
// import Divider from "@material-ui/core/Divider"
// import { isMobile } from "react-device-detect"
// import { Preloader } from "../Helpers/Preloader/Preloader"
// import AppBar from "@material-ui/core/AppBar"
import { useMediaQuery } from "@material-ui/core"
import {
  setResetWidgetInputs,
  setResetWidgetInputsActionCreator,
} from "../../Redux/reset-widget-inputs-reducer"
import {
  setIsAirportPickupIncluded,
  setShowCarsWithSafetySeat,
} from "../../Redux/form-reducer"
import { setGateMeetingRedux } from "../../Redux/gate-meeting-reducer"
import styles from "./CompanyProfile.module.scss"
import ThemeContext from "../../context"
import { CloseWidgetIcon } from "../../assets/icons"
import { setHourlyRedux } from "../../Redux/hourly-reducer"

// const useStyles = makeStyles((theme) => ({
//   companyContainer: {
//     padding: theme.spacing(1.5),
//     // position: 'fixed',
//     background: "black",
//   },
//   companyLogo: {
//     borderRadius: "100px",
//     border: "1px solid white",
//     width: "55px",
//     height: "55px",
//     marginLeft: "5px",
//     userDrag: "none",
//     userSelect: "none",
//     mozUserSelect: "none",
//     webkitUserDrag: "none",
//     webkitUserSelect: "none",
//     msUserSelect: "none",
//   },
//   companyName: {
//     fontFamily: "Roboto",
//     fontWeight: "700",
//     color: "white",
//     fontSize: "17px",
//     [theme.breakpoints.up(768)]: {
//       fontSize: "20.5px",
//     },
//     textTransform: "none",
//   },
//   closeIcon: {
//     textAlign: "center",
//     verticalAlign: "sub",
//     width: "28px",
//     height: "22px",
//     paddingTop: "7px",
//     "&:hover": {
//       textAlign: "center",
//       width: "28px",
//       height: "22px",
//       paddingTop: "7px",
//       borderRadius: "20px",
//       background: "#4F4F4F",
//       marginRight: "10px",
//       transition: "0.2s",
//       "& $path": {
//         fill: "white",
//       },
//     },
//   },
// }))
const StepsIndicator = ({
  initializing,
  profile,
  getCompanyProfile,
  handleCloseDialog,
  setExpanded,
  setActiveStep,
  setBackgroundScrollStop,
  resetInputs,
  setResetWidgetInputs,
  setGotAddressError,
  setIsAirportPickupIncluded,
  setGateMeetingRedux,
  setShowCarsWithSafetySeat,
  setHourlyRedux,
  activeStep,
}) => {
  // const classes = useStyles()

  const jwtToken = localStorage.getItem("Authorization")
  const smallDevices = useMediaQuery("(max-width:768px)")

  const resetWidgetInputs = (dispatch) => {
    dispatch(setResetWidgetInputsActionCreator(true))
  }
  useEffect(() => {
    if (jwtToken) {
      getCompanyProfile()
    }
  }, [getCompanyProfile, jwtToken])
  // useEffect(() => {
  //   setResetWidgetInputs()
  // }, [])
  const {
    ThemeProviderAppBackgroundColor,
    fontColor,
    borderRadiuses,
    carsTypeColor,
    hoverColor,
    iconsColor,
    backAndNextButtonsColor,
    innerTextOnHover,
    inputsFontColor,
  } = useContext(ThemeContext)

  return (
    <div className={styles.stepsIndicators} style={{ background: "white" }}>
      <span
        style={{
          opacity: activeStep == 0 ? "1" : "0.5",
          color: "black",
        }}
      >
        Price Quote
      </span>
      <span
        style={{
          opacity: activeStep == 1 ? "1" : "0.5",
          color: "black",
        }}
      >
        Select Vehicle
      </span>
      <span
        style={{
          opacity: activeStep == 2 ? "1" : "0.5",
          color: "black",
        }}
      >
        Preview
      </span>
      <span
        style={{
          opacity: activeStep == 3 ? "1" : "0.5",
          color: "black",
        }}
      >
        Payment
      </span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.companyProfile.profile,
    resetInputs: state.resetWidgetInputs.resetInputs,
  }
}

export default connect(mapStateToProps, {
  getCompanyProfile,
  setResetWidgetInputs,
  setGotAddressError,
  setIsAirportPickupIncluded,
  setGateMeetingRedux,
  setShowCarsWithSafetySeat,
  setHourlyRedux,
})(StepsIndicator)