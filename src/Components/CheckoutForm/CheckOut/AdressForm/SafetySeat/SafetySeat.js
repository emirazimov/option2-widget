import { makeStyles, useMediaQuery } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import ThemeContext from '../../../../../context'
import {
  MinusIcon,
  // NumberOfPassengers,
  // NumberOfPassengersIcon,
  PlusIcon,
} from '../../../../../assets/icons'
import '../../index.css'
import styles from './SafetySeat.module.scss'

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: '34px',
    borderBottom: '2px solid #AC8159',
    transition: '200ms',
    '&:hover': { borderBottom: '2px solid white', transition: '200ms' },
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
  const isMobile = useMediaQuery('(max-width:340px)')
  const shouldSafetySeatBeColumnDirection = useMediaQuery('(max-width:420px)')

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
      // direction={shouldSafetySeatBeColumnDirection ? "column" : "row"}
      // justify="space-between"
      // alignItems={shouldSafetySeatBeColumnDirection ? "flex-start" : "center"}
      // style={{ paddingLeft: "9px" }}
      className={styles.safetySeatRow}
      style={{
        opacity: safetySeat ? '1' : '0.5',
        cursor: safetySeat ? 'auto' : 'no-drop',
      }}
    >
      {isBoosterSeatExistOnBackend && (
        // <Grid
        //   item
        //   style={{
        //     width: "100%",
        //   }}
        // >
        //   <Grid
        //     container
        //     direction="row"
        //     justify="space-between"
        //     alignItems="center"
        //     style={{
        //       marginTop: "6px",
        //       marginBottom: "15px",
        //       // width: isBoosterSeatExistOnBackend && "100%",
        //     }}
        //   >
        //     <Grid item>
        //       <Grid container direction="row">
        //         {/* <NumberOfPassengersIcon
        //     style={{ paddingLeft: "30px" }}
        //   ></NumberOfPassengersIcon> */}
        //         <Typography
        //           style={{
        //             color: "white",
        //             fontSize: "12px",
        //             wordWrap: "break-word",
        //             marginBottom: isBoosterSeatExistOnBackend ? "2" : "8px",
        //             width: isMobile ? "130px" : "none",
        //           }}
        //         >
        //           Youth Booster Seat
        //         </Typography>
        //       </Grid>
        //     </Grid>
        //     <Grid item>
        //       <Grid
        //         container
        //         direction="row"
        //         justify="space-around"
        //         alignItems="center"
        //         className={classes.mainPlusMinusContainer}
        //         // style={{
        //         //   // background: "#282828",
        //         //   // height: "35px",
        //         //   // borderRadius: "5px",
        //         //   height: "34px",
        //         //   // paddingTop: "-4px",
        //         // }}
        //       >
        //         <Grid item>
        //           <span
        //             onClick={onDecreaseBoosterSeat}
        //             style={
        //               {
        //                 // marginRight: "5px",
        //               }
        //             }
        //           >
        //             <MinusIcon />
        //           </span>
        //         </Grid>
        //         <Grid
        //           item
        //           style={{
        //             textAlign: "center",
        //             // borderBottom: "2px solid #AC8159",
        //             // marginTop: "6px",
        //             // paddingBottom: "2px",
        //             // borderBottom: "2px solid #AC8159",
        //             // height: "105%",
        //           }}
        //         >
        //           <input
        //             ref={register}
        //             name="Youth Booster Seat"
        //             onChange={(e) => {
        //               setBoosterSeat(e.target.value)
        //             }}
        //             className="passenger"
        //             value={boosterSeat}
        //             size="1"
        //             style={{
        //               // pointerEvents: "none",
        //               minWidth: "34px",
        //               maxWidth: "34px",
        //               // marginLeft: "2px",
        //               // marginRight: "2.5px",
        //               // marginBottom: "4px",
        //               backgroundColor: "transparent",
        //               border: "none",
        //               color: "white",
        //               textAlign: "center",
        //               fontFamily: "Roboto",
        //               textTransform: "none",
        //               fontWeight: "400",
        //               fontSize: "14px",
        //               height: "100%",
        //             }}
        //             type="number"
        //           />
        //         </Grid>
        //         <Grid item>
        //           <span
        //             onClick={onIncreaseBoosterSeat}
        //             // style={{ marginLeft: "4px" }}
        //           >
        //             <PlusIcon />
        //           </span>
        //         </Grid>
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
          className={styles.boosterSeatCounterWrapper}
        >
          <div
            // item
            className={styles.boosterSeatCounterIconAndTitleContainer}
          >
            {/* <div container direction="row"> */}
            {/* <NumberOfboosterSeatsIcon
          style={{ paddingLeft: "30px" }}
        ></NumberOfboosterSeatsIcon> */}

            <span
              // style={{
              //   color: "white",
              //   fontSize: "14px",
              //   wordWrap: "break-word",

              //   width: isMobile ? "130px" : "none",
              // }}
              className={styles.boosterSeatCounterTitle}
              style={{ color: fontColor }}
            >
              Youth Booster Seat
            </span>
            {/* </div> */}
          </div>
          <div
            // item
            className={styles.boosterSeatCounterContainer}
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
              className={styles.boosterSeatCounterMinusContainer}
              // style={{
              //   borderBottom: "2px solid #AC8159",
              //   "&:hover": { borderBottom: "2px solid white" },
              // }}
            >
              <button
                onClick={onDecreaseBoosterSeat}
                // style={
                //   {
                //     // marginRight: "5px",
                //   }
                // }
                className={styles.boosterSeatCounterMinusSelf}
                style={{
                  background: backAndNextButtonsColor,
                  border: `1px solid ${borderColorForInnerElements}`,
                }}
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
              className={styles.boosterSeatCounterInputContainer}
            >
              <input
                ref={register}
                name='Youth Booster Seat'
                onClick={(event) => {
                  event.currentTarget.type = 'text'
                  const { value } = event.target
                  const position = value.length
                  event.target.setSelectionRange(position, position)
                  event.currentTarget.type = 'number'
                }}
                onChange={(e) => {
                  setBoosterSeat(e.target.value)
                }}
                onFocus={(e) => {
                  boosterSeat == 0 && setBoosterSeat('')
                }}
                onBlur={() => {
                  boosterSeat == '' && setBoosterSeat(0)
                }}
                disabled={safetySeat ? false : true}
                // className="boosterSeat"
                value={boosterSeat}
                size='1'
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
                type='number'
                className={styles.boosterSeatCounterInputSelf}
                style={{
                  background: backAndNextButtonsColor,
                  // border: `1px solid ${borderColorForInnerElements}`,
                  // borderBottom: `1px solid ${borderColorForInnerElements}`,
                  color: inputsFontColor,
                }}
              />
            </div>
            {/* <div
              // item
              className={styles.boosterSeatCounterPlusContainer}
            >
              <button
                onClick={onIncreaseBoosterSeat}
                // style={{ marginLeft: "4px" }}
                className={styles.boosterSeatCounterPlusSelf}
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
      )}
      {isSafetySeatExistOnBackend && (
        <div
          // container
          // direction="row"
          // justify="space-between"
          // alignItems="center"
          // style={{ marginTop: "13px" }}
          className={styles.safetySeatCounterWrapper}
        >
          <div
            // item
            className={styles.safetySeatCounterIconAndTitleContainer}
          >
            {/* <div container direction="row"> */}
            {/* <NumberOfsafetySeatsIcon
          style={{ paddingLeft: "30px" }}
        ></NumberOfsafetySeatsIcon> */}

            <span
              // style={{
              //   color: "white",
              //   fontSize: "14px",
              //   wordWrap: "break-word",

              //   width: isMobile ? "130px" : "none",
              // }}
              className={styles.safetySeatCounterTitle}
              style={{ color: fontColor }}
            >
              {'Infant & Child Safety Seat'}
            </span>
            {/* </div> */}
          </div>
          <div
            // item
            className={styles.safetySeatCounterContainer}
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
              className={styles.safetySeatCounterMinusContainer}
              // style={{
              //   borderBottom: "2px solid #AC8159",
              //   "&:hover": { borderBottom: "2px solid white" },
              // }}
            >
              <button
                onClick={onDecreaseChildSafetySeat}
                // style={
                //   {
                //     // marginRight: "5px",
                //   }
                // }
                className={styles.safetySeatCounterMinusSelf}
                style={{
                  background: backAndNextButtonsColor,
                  border: `1px solid ${borderColorForInnerElements}`,
                }}
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
              className={styles.safetySeatCounterInputContainer}
            >
              <input
                ref={register}
                name={`Infant & Child Safety Seat`}
                onClick={(event) => {
                  event.currentTarget.type = 'text'
                  const { value } = event.target
                  const position = value.length
                  event.target.setSelectionRange(position, position)
                  event.currentTarget.type = 'number'
                }}
                onChange={(e) => {
                  setChildSafetySeat(e.target.value)
                }}
                onFocus={(e) => {
                  childSafetySeat == 0 && setChildSafetySeat('')
                }}
                onBlur={() => {
                  childSafetySeat == '' && setChildSafetySeat(0)
                }}
                disabled={safetySeat ? false : true}
                // className="passenger"
                value={childSafetySeat}
                size='1'
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
                type='number'
                className={styles.safetySeatCounterInputSelf}
                style={{
                  background: backAndNextButtonsColor,
                  // border: `1px solid ${borderColorForInnerElements}`,
                  // borderBottom: `1px solid ${borderColorForInnerElements}`,
                  color: inputsFontColor,
                }}
              />
            </div>
            {/* <div
              // item
              className={styles.safetySeatCounterPlusContainer}
            >
              <button
                onClick={onIncreaseChildSafetySeat}
                // style={{ marginLeft: "4px" }}
                className={styles.safetySeatCounterPlusSelf}
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
      )}
    </div>
  )
})
