import { makeStyles } from "@material-ui/core"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { LuggageIcon } from "../../../../../assets/icons"
import ThemeContext from "../../../../../context"
import {
  // HourlyIcon,
  // LuggageIcon,
  MinusIcon,
  PlusIcon,
} from "../../../../../assets/icons"
import "../../index.css"
import styles from "./Luggage.module.scss"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",

    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

const Luggage = ({ luggage, setLuggage, isGateMeeting }) => {
  const classes = useStyles()

  const { register } = useFormContext()

  //   const [hoursAddressForm, setHoursAddressForm] = useState(0)

  const onDecrease = () => {
    if (luggage === 0) {
      return
    }
    setLuggage((luggage) => luggage - 1)
  }
  const onIncrease = () => {
    setLuggage((luggage) => luggage + 1)
  }

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

  //   React.useEffect(() => {
  //     if (hoursState !== 0) {
  //       setHourly(true)
  //       setHoursAddressForm(parseInt(hoursState))
  //     }
  //   }, [hoursState])

  return (
    // <Grid
    //   container
    //   direction="row"
    //   justify="space-between"
    //   alignItems="center"
    //   style={{ marginBottom: "4px", marginTop: "4px" }}
    // >
    //   <Grid item>
    //     <Grid container direction="row" alignItems="center">
    //       <LuggageIcon />

    //       <Typography
    //         style={{ color: "white", fontSize: "14px", marginTop: "4px" }}
    //       >
    //         Luggage Count
    //       </Typography>
    //     </Grid>
    //   </Grid>
    //   <Grid item style={{ marginRight: "8px" }}>
    //     <Grid
    //       container
    //       direction="row"
    //       justify="space-around"
    //       alignItems="center"
    //       className={classes.mainPlusMinusContainer}
    //       // style={{
    //       //   // background: "#282828",
    //       //   // height: "35px",
    //       //   // borderRadius: "5px",
    //       //   height: "34px",
    //       //   // paddingTop: "-4px",
    //       // }}
    //     >
    //       <Grid item>
    //         <span
    //           onClick={onDecrease}
    //           // style={{ marginRight: "5px" }}
    //         >
    //           <MinusIcon />
    //         </span>
    //       </Grid>
    //       <Grid
    //         item
    //         style={{
    //           textAlign: "center",
    //           // borderBottom: "2px solid #AC8159",
    //           // height: "105%",
    //         }}
    //       >
    //         <input
    //           ref={register}
    //           name="hours"
    //           className="luggage"
    //           onChange={(e) => {
    //             setLuggage(e.target.value)
    //           }}
    //           value={luggage}
    //           size="1"
    //           style={{
    //             // pointerEvents: "none",
    //             minWidth: "34px",
    //             maxWidth: "34px",
    //             // marginLeft: "2px",
    //             // marginRight: "2.5px",
    //             // marginBottom: "4px",
    //             backgroundColor: "transparent",
    //             border: "none",
    //             color: "white",
    //             textAlign: "center",
    //             fontFamily: "Roboto",
    //             textTransform: "none",
    //             fontWeight: "400",
    //             fontSize: "14px",
    //             height: "100%",
    //           }}
    //           type="number"
    //         />
    //       </Grid>
    //       <Grid item>
    //         <span
    //           onClick={onIncrease}
    //           style={
    //             {
    //               // marginLeft: "4px",
    //               // marginRight: "7px",
    //             }
    //           }
    //         >
    //           <PlusIcon />
    //         </span>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>

    <div
      // container
      // direction="row"
      // justify="space-between"
      // alignItems="center"
      // style={{ marginTop: "13px" }}
      className={styles.luggageQuantityWrapper}
      style={{
        opacity: isGateMeeting ? "1" : "0.5",
        cursor: isGateMeeting ? "auto" : "no-drop",
      }}
    >
      <div
        // item
        className={styles.luggageQuantityIconAndTitleContainer}
      >
        {/* <div container direction="row"> */}
        {/* <NumberOfluggagesIcon
          style={{ paddingLeft: "30px" }}
        ></NumberOfluggagesIcon> */}
        {/* <span className={styles.luggageQuantityIcon}></span> */}
        {/* <LuggageIcon color={fontColor} /> */}
        <span
          // style={{
          //   color: "white",
          //   fontSize: "14px",
          //   wordWrap: "break-word",

          //   width: isMobile ? "130px" : "none",
          // }}
          className={styles.luggageCounterTitle}
          style={{ color: fontColor }}
        >
          Luggage Count
        </span>
        {/* </div> */}
      </div>
      <div
        // item
        className={styles.luggageQuantityCounterContainer}
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
        {/* <div
          // item
          className={styles.luggageQuantityMinusContainer}
          // style={{
          //   borderBottom: "2px solid #AC8159",
          //   "&:hover": { borderBottom: "2px solid white" },
          // }}
        >
          <button
            onClick={onDecrease}
            // style={
            //   {
            //     // marginRight: "5px",
            //   }
            // }
            style={{
              background: backAndNextButtonsColor,
              border: `1px solid ${borderColorForInnerElements}`,
            }}
            className={styles.luggageQuantityMinusSelf}
            type="button"
          >
            <MinusIcon color={fontColor} />
          </button>
        </div> */}
        <div
          // style={{
          //   textAlign: "center",
          //   // borderBottom: "2px solid #AC8159",
          //   // height: "100%",
          // }}
          className={styles.luggageQuantityInputContainer}
        >
          <input
            ref={register}
            name="hours"
            // className="luggage"
            onClick={(event) => {
              event.currentTarget.type = "text"
              const { value } = event.target
              const position = value.length
              event.target.setSelectionRange(position, position)
              event.currentTarget.type = "number"
            }}
            onChange={(e) => {
              setLuggage(e.target.value)
            }}
            onFocus={(e) => {
              luggage == 0 && setLuggage("")
            }}
            onBlur={() => {
              luggage == "" && setLuggage(0)
            }}
            disabled={isGateMeeting ? false : true}
            value={luggage}
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
            //   height: "100%",
            // }}
            style={{
              background: inputsBackground,
              border: `1px solid ${borderColorForInnerElements}`,
              // borderBottom: `1px solid ${borderColorForInnerElements}`,
              color: inputsFontColor,
              borderRadius: borderRadiusesForInnerElements,
            }}
            type="number"
            className={styles.luggageQuantityInputSelf}
          />
        </div>
        {/* <div
          // item
          className={styles.luggageQuantityPlusContainer}
        >
          <button
            onClick={onIncrease}
            // style={{ marginLeft: "4px" }}
            style={{
              background: backAndNextButtonsColor,
              border: `1px solid ${borderColorForInnerElements}`,
            }}
            className={styles.luggageQuantityPlusSelf}
            type="button"
          >
            <PlusIcon color={fontColor} />
          </button>
        </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Luggage
