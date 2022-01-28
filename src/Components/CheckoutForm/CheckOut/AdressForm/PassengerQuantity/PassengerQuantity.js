import { makeStyles, useMediaQuery } from "@material-ui/core"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { NumberOfPassengersIcon } from "../../../../../assets/icons"
import ThemeContext from "../../../../../context"
import {
  MinusIcon,
  // NumberOfPassengers,
  // NumberOfPassengersIcon,
  PlusIcon,
} from "../../../../../assets/icons"
import "../../index.css"
import styles from "./PassengerQuantity.module.scss"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",
    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

export default React.memo(function PassengerQuantity({
  passengersqState,
  setPassengers,
  passengers,
  passengersQuantityForBackStep,
  setPassengersQuantityForBackStep,
  redBorderOnSubmitForPassengers,
}) {
  const classes = useStyles()
  const { register } = useFormContext()

  const onDecrease = () => {
    if (passengersQuantityForBackStep === 0) {
      return
    }
    let progress = passengersQuantityForBackStep - 1
    setPassengers((passengers) => passengers - 1)
    setPassengersQuantityForBackStep(progress)
  }
  const onIncrease = (e) => {
    if (passengersQuantityForBackStep === 14) {
      return
    }
    let progress = passengersQuantityForBackStep + 1
    setPassengers((passengers) => passengers + 1)
    setPassengersQuantityForBackStep(progress)

    console.log(passengersQuantityForBackStep)
  }
  // console.log(passengersQuantityForBackStep)
  //   React.useEffect(() => {
  //     setPassengers(parseInt(passengersqState))
  //   }, [passengersqState])
  const isMobile = useMediaQuery("(max-width:340px)")
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
  } = useContext(ThemeContext)

  return (
    <div
      // container
      // direction="row"
      // justify="space-between"
      // alignItems="center"
      // style={{ marginTop: "13px" }}
      className={styles.passengerQuantityWrapper}
    >
      <div
        // item
        className={styles.passengerQuantityIconAndTitleContainer}
      >
        {/* <div container direction="row"> */}
        {/* <NumberOfPassengersIcon
          style={{ paddingLeft: "30px" }}
        ></NumberOfPassengersIcon> */}
        {/* <NumberOfPassengersIcon color={fontColor} /> */}
        {/* <span className={styles.passengerQuantityIcon}></span> */}
        <span
          // style={{
          //   color: "white",
          //   fontSize: "14px",
          //   wordWrap: "break-word",

          //   width: isMobile ? "130px" : "none",
          // }}
          className={styles.passengerCounterTitle}
          style={{ color: fontColor }}
        >
          Number of passengers
        </span>
        {/* </div> */}
      </div>
      <div
        // item
        className={styles.passengerQuantityCounterContainer}
        style={{
          borderRadius: `${borderRadiusesForInnerElements}`,
          border: redBorderOnSubmitForPassengers
            ? "1px solid red"
            : "1px solid transparent",
        }}
      >
        {/* <div
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className={classes.mainPlusMinusContainer}
          // style={{
          //   // background: "#282828",
          //   // height: "35px",
          //   // borderRadius: "5px",

          //   // paddingTop: "-4px",
          // }}
        > */}
        <div
          // item
          className={styles.passengerQuantityMinusContainer}
          // style={{
          //   borderBottom: "2px solid #AC8159",
          //   "&:hover": { borderBottom: "2px solid white" },
          // }}
        >
          {/* <button
            onClick={onDecrease}
            // style={
            //   {
            //     // marginRight: "5px",
            //   }
            // }
            type="button"
            className={styles.passengerQuantityMinusSelf}
            style={{
              background: backAndNextButtonsColor,
              border: `1px solid ${borderColorForInnerElements}`,
            }}
          >
            
            <MinusIcon color={fontColor} />
          </button> */}
        </div>
        <div
          // style={{
          //   textAlign: "center",
          //   // borderBottom: "2px solid #AC8159",
          //   // height: "100%",
          // }}
          className={styles.passengerQuantityInputContainer}
          // style={{ border: `1px solid ${borderColorForInnerElements}` }}
        >
          <input
            ref={register}
            name="passengersQuantity"
            onChange={(e) => {
              setPassengers(e.target.value)
              setPassengersQuantityForBackStep(e.target.value)
            }}
            className="passenger"
            value={passengersQuantityForBackStep}
            size="1"
            // style={{
            //   // pointerEvents: "none",
            //   minWidth: "34px",
            //   maxWidth: "34px",
            //   // marginLeft: "2px",
            //   // marginRight: "2.5px",
            //   // marginBottom: "4px",
            //   backgroundColor: "transparent",
            //   border: "none",
            //   color: "white",
            //   textAlign: "center",
            //   fontFamily: "Roboto",
            //   textTransform: "none",
            //   fontWeight: "400",
            //   fontSize: "14px",
            //   // height: "100%",
            //   // borderBottom: "2px solid #AC8159",
            // }}
            type="number"
            className={styles.passengerQuantityInputSelf}
            style={{
              background: backAndNextButtonsColor,
              border: `1px solid ${borderColorForInnerElements}`,
              // borderBottom: `1px solid ${borderColorForInnerElements}`,
              color: inputsFontColor,
            }}
          />
        </div>
        {/* <div
          // item
          className={styles.passengerQuantityPlusContainer}
        >
          <button
            onClick={(event) => {
              onIncrease()
              event.stopPropagation()
            }}
            // style={{ marginLeft: "4px" }}
            className={styles.passengerQuantityPlusSelf}
            style={{
              background: backAndNextButtonsColor,
              border: `1px solid ${borderColorForInnerElements}`,
            }}
            type="button"
          >
            <PlusIcon color={fontColor} />
          </button>
        </div> */}
        {/* </div> */}
      </div>
    </div>
  )
})
