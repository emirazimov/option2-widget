import { makeStyles, useMediaQuery } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import ThemeContext from "../../../../../context"
import {
  MinusIcon,
  // NumberOfPassengers,
  // NumberOfPassengersIcon,
  PlusIcon,
} from "../../../../../assets/icons"
import "../../index.css"
import styles from "./SafetySeat.module.scss"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",
    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

export default React.memo(function SafetySeat({
  setBoosterSeat,
  setChildSafetySeat,
  boosterSeat,
  childSafetySeat,
  isBoosterSeatExistOnBackend,
  isSafetySeatExistOnBackend,
  safetySeat,
  showCarsWithSafetySeat,
  setSafetySeatCount,
  setBoosterSeatCount,
  safetySeatCountRedux,
  boosterSeatCountRedux,
}) {
  const classes = useStyles()
  const { register } = useFormContext()

  const onDecreaseBoosterSeat = () => {
    if (boosterSeat === 0) {
      return
    }
    setBoosterSeat((boosterSeat) => boosterSeat - 1)
  }
  const onIncreaseBoosterSeat = () => {
    if (boosterSeat === 14) {
      return
    }
    setBoosterSeat((boosterSeat) => boosterSeat + 1)
  }

  const onDecreaseChildSafetySeat = () => {
    if (childSafetySeat === 0) {
      return
    }
    setChildSafetySeat((childSafetySeat) => childSafetySeat - 1)
  }
  const onIncreaseChildSafetySeat = () => {
    if (childSafetySeat === 14) {
      return
    }
    setChildSafetySeat((childSafetySeat) => childSafetySeat + 1)
  }

  //   React.useEffect(() => {
  //     setPassengers(parseInt(passengersqState))
  //   }, [passengersqState])
  const isMobile = useMediaQuery("(max-width:340px)")
  const shouldSafetySeatBeColumnDirection = useMediaQuery("(max-width:420px)")

  console.log(safetySeatCountRedux, boosterSeatCountRedux)

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
      className={styles.safetySeatRow}
      style={{
        opacity: showCarsWithSafetySeat ? "1" : "0.5",
        cursor: showCarsWithSafetySeat ? "auto" : "no-drop",
      }}
    >
      {isBoosterSeatExistOnBackend && (
        <div className={styles.boosterSeatCounterWrapper}>
          <div className={styles.boosterSeatCounterIconAndTitleContainer}>
            <span
              className={styles.boosterSeatCounterTitle}
              style={{ color: fontColor }}
            >
              Youth Booster Seat
            </span>
          </div>
          <div className={styles.boosterSeatCounterContainer}>
            <div className={styles.boosterSeatCounterInputContainer}>
              <input
                ref={register}
                name="Youth Booster Seat"
                onClick={(event) => {
                  event.currentTarget.type = "text"
                  const { value } = event.target
                  const position = value.length
                  event.target.setSelectionRange(position, position)
                  event.currentTarget.type = "number"
                }}
                onChange={(e) => {
                  setBoosterSeat(e.target.value)
                  setBoosterSeatCount(e.target.value)
                }}
                onFocus={(e) => {
                  boosterSeatCountRedux == 0 && setBoosterSeatCount("")
                  console.log(boosterSeatCountRedux == 0)
                }}
                onBlur={() => {
                  boosterSeatCountRedux == "" && setBoosterSeatCount(0)
                }}
                disabled={showCarsWithSafetySeat ? false : true}
                value={boosterSeatCountRedux}
                size="1"
                type="number"
                className={styles.boosterSeatCounterInputSelf}
                style={{
                  background: inputsBackground,
                  color: inputsFontColor,
                  borderRadius: borderRadiusesForInnerElements,
                  border: `1px solid ${borderColorForInnerElements}`,
                }}
              />
            </div>
          </div>
        </div>
      )}
      {isSafetySeatExistOnBackend && (
        <div className={styles.safetySeatCounterWrapper}>
          <div className={styles.safetySeatCounterIconAndTitleContainer}>
            <span
              className={styles.safetySeatCounterTitle}
              style={{ color: fontColor }}
            >
              {"Infant & Child Safety Seat"}
            </span>
          </div>
          <div className={styles.safetySeatCounterContainer}>
            <div className={styles.safetySeatCounterInputContainer}>
              <input
                ref={register}
                name={`Infant & Child Safety Seat`}
                onClick={(event) => {
                  event.currentTarget.type = "text"
                  const { value } = event.target
                  const position = value.length
                  event.target.setSelectionRange(position, position)
                  event.currentTarget.type = "number"
                }}
                onChange={(e) => {
                  setChildSafetySeat(e.target.value)
                  setSafetySeatCount(e.target.value)
                }}
                onFocus={(e) => {
                  safetySeatCountRedux == 0 && setSafetySeatCount("")
                }}
                onBlur={() => {
                  safetySeatCountRedux == "" && setSafetySeatCount(0)
                }}
                disabled={showCarsWithSafetySeat ? false : true}
                value={safetySeatCountRedux}
                size="1"
                type="number"
                className={styles.safetySeatCounterInputSelf}
                style={{
                  background: inputsBackground,
                  color: inputsFontColor,
                  borderRadius: borderRadiusesForInnerElements,
                  border: `1px solid ${borderColorForInnerElements}`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
