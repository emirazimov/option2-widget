import { makeStyles } from "@material-ui/core"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { MinusIcon, PlusIcon } from "../../../../../assets/icons"
import styles from "./Hours.module.scss"
import "../../index.css"
import ThemeContext from "../../../../../context"
import { HourlyIcon } from "../../../../../assets/icons"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",

    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

const Hours = ({
  hoursState,
  setHourly,
  hoursAddressForm,
  setHoursAddressForm,
  hourly,
  hourlyAndSeatsRedux,
  redBorderOnSubmitForHours,
  setHoursRedux,
  hoursCount,
}) => {
  const classes = useStyles()

  const { register } = useFormContext()

  //   const [hoursAddressForm, setHoursAddressForm] = useState(0)

  const onDecrease = () => {
    if (hoursAddressForm === 0) {
      return
    }
    setHoursAddressForm((hoursAddressForm) => hoursAddressForm - 1)
  }
  const onIncrease = () => {
    setHoursAddressForm((hoursAddressForm) => hoursAddressForm + 1)
  }

  //   React.useEffect(() => {
  //     if (hoursState !== 0) {
  //       setHourly(true)
  //       setHoursAddressForm(parseInt(hoursState))
  //     }
  //   }, [hoursState])

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
      // style={{ marginTop: "-4px" }}
      className={styles.hoursCounterWrapper}
      style={{
        opacity: hourlyAndSeatsRedux ? "1" : "0.5",
        cursor: hourlyAndSeatsRedux ? "auto" : "no-drop",
      }}
    >
      <div className={styles.hoursCounterIconAndTitleContainer}>
        {/* <div container direction="row" alignItems="center"> */}
        {/* <HourlyIcon color={fontColor} /> */}

        {/* <span className={styles.hoursCounterIcon}></span> */}
        <h3
          // style={{ color: "white", fontSize: "14px", marginTop: "4px" }}
          className={styles.hoursCounterTitle}
          style={{ color: fontColor }}
        >
          Hours
        </h3>
        {/* </div> */}
      </div>
      <div className={styles.hoursCounterPlusMinusContainer}>
        {/* <div
          // container
          // direction="row"
          // justify="space-around"
          // alignItems="center"
          // className={classes.mainPlusMinusContainer}
          className={styles.hoursCounterPlusMinus}
          // style={{
          //   // background: "#282828",
          //   // height: "35px",
          //   // borderRadius: "5px",
          //   height: "34px",
          //   // paddingTop: "-4px",
          // }}
        > */}
        {/* <div className={styles.hoursCounterMinusContainer}>
          <button
            onClick={onDecrease}
            className={styles.hoursCounterMinus}
            style={{
              background: backAndNextButtonsColor,
              border: `1px solid ${borderColorForInnerElements}`,
            }}
            type="button"
            // style={{ marginRight: "5px" }}
          >
            <MinusIcon color={fontColor} />
          </button>
        </div> */}
        <div
          // item
          // style={{
          //   textAlign: "center",
          //   // borderBottom: "2px solid #AC8159",
          //   // marginTop: "6px",
          //   // paddingBottom: "2px",
          //   // borderBottom: "2px solid #AC8159",
          //   // height: "105%",
          // }}
          className={styles.hoursCounterInputContainer}
          style={{ border: redBorderOnSubmitForHours ? `1px solid red` : null }}
        >
          <input
            ref={register}
            name="hours"
            // className="passenger"

            onClick={(event) => {
              event.currentTarget.type = "text"
              const { value } = event.target
              const position = value.length
              event.target.setSelectionRange(position, position)
              // event.currentTarget.type = "number"
            }}
            onChange={(e) => {
              setHoursAddressForm(e.target.value)
              setHoursRedux(e.target.value)
            }}
            onFocus={(e) => {
              hoursCount == 0 && setHoursRedux("")
            }}
            onBlur={() => {
              hoursCount == "" && setHoursRedux(0)
            }}
            disabled={hourlyAndSeatsRedux ? false : true}
            value={hoursCount}
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
            className={styles.hoursCounterInput}
          />
        </div>
        {/* <div className={styles.hoursCounterPlusContainer}>
          <button
            className={styles.hoursCounterPlus}
            onClick={onIncrease}
            style={{
              background: backAndNextButtonsColor,
              border: `1px solid ${borderColorForInnerElements}`,
            }}
            type="button"
            // style={{ marginLeft: "4px" }}
          >
            <PlusIcon color={fontColor} />
          </button>
          
        </div> */}
      </div>
    </div>
  )
}

export default Hours
