import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { placesApi } from "../../../../api/api"
import { getCarsByType, getCompanyCars } from "../../../../Redux/car-reducer"
import Carousel, { consts } from "react-elastic-carousel"
// import {
//   LeftArrowForAdressForm,
//   RightArrowForAdressForm,
// } from "../../../../assets/icons"
// import Button from "@material-ui/core/Button"
import { useStyles } from "./AdressFormStyles"
// import { useMediaQuery } from "@material-ui/core"
import { connect } from "react-redux"
import {
  setBoosterSeatCount,
  setDateForDefaultValue,
  setFormData,
  setHoursRedux,
  setPassengersQuantityForBackStep,
  setSafetySeatCount,
  setShowCarsWithSafetySeat,
  setTimeForDefaultValue,
  setTimeForDefaultValueAlignment,
  setTimeForDefaultValueAMPM,
} from "../../../../Redux/form-reducer"

import { setHourlyRedux } from "../../../../Redux/hourly-reducer"
import { setGateMeetingRedux } from "../../../../Redux/gate-meeting-reducer"
// import { AdressFormHelpers } from "./adressFormHelpers"
import AdressFormUIComponent from "./AdressFormUIComponent"
import styles from "./AdressFormStyles/AdressForm.module.scss"
import * as yup from "yup"
import ThemeContext from "../../../../context"
import styled from "styled-components"

const AdressFormContainerComponent = ({
  next,
  carTypes,
  pageSize,
  getCompanyCars,
  setFormData,
  formData,
  setHourlyRedux,
  setGateMeetingRedux,
  gateMeeting,
  hourlyAndSeatsRedux,
  setSafetySeatCount,
  setBoosterSeatCount,
  backgroundScrollStopForTimePicker,
  setBackgroundScrollStopForTimePicker,
  resetInputs,
  setDateForDefaultValue,
  setTimeForDefaultValue,
  setTimeForDefaultValueAMPM,
  setTimeForDefaultValueAlignment,
  setPassengersQuantityForBackStep,
  isBoosterSeatExistOnBackend,
  isSafetySeatExistOnBackend,
  setShowCarsWithSafetySeat,
  setHoursRedux,
  hoursCount,
}) => {
  // const classes = useStyles()

  const [destinations, setDestinations] = useState([
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
  ])

  const [carSelectionID, setCarSelectionID] = useState(0)
  const [bookingType, setBookingType] = useState(1)
  const [passengers, setPassengers] = useState(0)
  const [hoursAddressForm, setHoursAddressForm] = useState(0)
  const [disableHourly, setDisableHourly] = useState(false)
  const [hourly, setHourly] = useState(false)

  const [isGateMeeting, setIsGateMeeting] = useState(false)
  const [isAirline, setIsAirline] = useState(false)
  const [airlineId, setAirlineId] = useState(0)
  const [airlines, setAirlines] = useState([])
  const [airlineName, setAirlineNAme] = useState([])
  const [timePickerOpened, setTimePickerOpened] = useState(false)

  const [selectedDate, handleDateChange] = useState(null)
  const [selectedTime, handleTimeChange] = useState(null)

  const [redBorderOnSubmit, setRedBorderOnSubmit] = useState(false)
  const [redBorderOnSubmit2, setRedBorderOnSubmit2] = useState(false)
  const [redBorderOnSubmitForDate, setRedBorderOnSubmitForDate] =
    useState(false)
  const [redBorderOnSubmitForTime, setRedBorderOnSubmitForTime] =
    useState(false)
  const [redBorderOnSubmitForTime2, setRedBorderOnSubmitForTime2] =
    useState(false)
  const [redBorderOnSubmitForTime3, setRedBorderOnSubmitForTime3] =
    useState(false)
  const [redBorderOnSubmitForTime4, setRedBorderOnSubmitForTime4] =
    useState(false)
  const [redBorderOnSubmitForTime5, setRedBorderOnSubmitForTime5] =
    useState(false)
  const [redBorderOnSubmitForTime6, setRedBorderOnSubmitForTime6] =
    useState(false)
  const [redBorderOnSubmitForCarType, setRedBorderOnSubmitForCarType] =
    useState(false)
  const [redBorderOnSubmitForPassengers, setRedBorderOnSubmitForPassengers] =
    useState(false)
  const [redBorderOnAirlines, setRedBorderOnAirlines] = useState(false)
  const [redBorderOnSubmitForHours, setRedBorderOnSubmitForHours] =
    useState(false)
  const [
    isAirportPickupIncludedLocalState,
    setIsAirportPickupIncludedLocalState,
  ] = useState(false)

  const [time, setTime] = useState("")
  const startsWithTwo = time[0] === "2"

  const [timeMask, setTimeMask] = useState(false)

  const [date, setDate] = React.useState(null)

  const [show, setShow] = useState(false)

  const [showRecaptcha, setShowRecaptcha] = useState(false)

  const extractAirlineId = (name) => {
    const res = airlines.find((element, index, array) => {
      return element.name == name
    })
    res ? setAirlineId(res.id) : setAirlineId(null)
    setAirlineNAme(name)
    console.log(res)
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    ...methods
  } = useForm({})

  const handleClick = (id) => {
    setCarSelectionID(id)
  }

  const isHourlyEnabled = () => {
    if (hourly || hourlyAndSeatsRedux) {
      if (hoursCount) return true
      else return false
    } else {
      return true
    }
  }

  let firstAirline =
    destinations[0]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/)

  const fetchAirlines = async () => {
    const data = await placesApi.getAirlines()
    const res = data.map((airline) => {
      return {
        id: `${airline.id}`,
        name: `${airline.code} ` + `${airline.name}`,
      }
    })
    setAirlines(res)
  }

  const [flightNumber, setFlightNumber] = useState(null)

  const {
    ThemeProviderAppBackgroundColor,
    fontColor,
    borderRadiuses,
    carsTypeColor,
    hoverColor,
    iconsColor,
    backAndNextButtonsColor,
    innerTextOnHover,
    borderRadiusesForInnerElements,
    borderRadiusesForWholeApp,
    borderColorForInnerElements,
    borderColorForOuterApp,
  } = useContext(ThemeContext)
  const [fontColorState, setFontColorState] = useState(fontColor)
  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? "<" : ">"
    // console.log(isEdge)

    return (
      <Button
        onClick={() => {
          onClick()
          console.log(type)
        }}
        disabled={isEdge}
        isEdge={isEdge}
        backAndNextButtonsColor={backAndNextButtonsColor}
        borderColorForInnerElements={borderColorForInnerElements}
        borderRadiusesForInnerElements={borderRadiusesForInnerElements}
        fontColor={fontColor}
      >
        {pointer}
      </Button>
    )
  }
  const [safetySeat, setSafetySeat] = useState(false)

  const [boosterSeat, setBoosterSeat] = useState(0)
  const [childSafetySeat, setChildSafetySeat] = useState(0)

  const [alignment, setAlignment] = React.useState("web")
  const [AMPM, setAMPM] = React.useState("")

  const handleChangeAMPM = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
      setTimeForDefaultValueAMPM(event.target.textContent)
    }
    setAMPM(event.target.textContent)

    setTimeForDefaultValueAMPM(event.target.textContent)
    console.log(event.target.textContent)
  }
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px #282828 inset",
    height: "0px",
  }

  const [luggage, setLuggage] = useState(0)

  const onSubmit2 = (data) => {
    const timeNumberAfterColon = time
      .split("")
      .splice(-2)
      // .map((number) => {
      //   return Number(`${number}`)
      // })
      .join("")
    const timeNumberAfterColonRedux = formData.timeForDefaultValue
      .split("")
      .splice(-2)
      // .map((number) => {
      //   return Number(`${number}`)
      // })
      .join("")
    const timeNumberLength = time.split("")
    const timeNumberLengthredux = formData.timeForDefaultValue.split("")
    var timeNumberIsFullZero = time.replace(/[:]/g, "")
    var timeNumberIsFullZeroRedux = formData.timeForDefaultValue.replace(
      /[:]/g,
      ""
    )

    console.log(localStorage.getItem("captcha"))
    if (
      destinations[0].rideCheckPoint &&
      destinations[1].rideCheckPoint &&
      (date || formData.dateForDefaultValue) &&
      (time || formData.timeForDefaultValue) &&
      Number(`${timeNumberAfterColon || timeNumberAfterColonRedux}`) < 60 &&
      (timeNumberLength.length || timeNumberLengthredux.length > 3) &&
      timeNumberIsFullZero !== "0000" &&
      timeNumberIsFullZero !== "000" &&
      timeNumberIsFullZeroRedux !== "0000" &&
      timeNumberIsFullZeroRedux !== "000" &&
      carSelectionID &&
      (passengers || formData.passengersQuantityForBackStep) &&
      (AMPM || formData?.timeForDefaultValueAMPM?.ampm) &&
      isHourlyEnabled()
    ) {
      if (isAirline) {
        if (!airlineId) {
          setRedBorderOnAirlines(true)
        } else {
          setRedBorderOnAirlines(false)
          return true
        }
      } else {
        return true
      }
    } else {
      if (!destinations[0].rideCheckPoint) {
        setRedBorderOnSubmit(true)
      } else {
        setRedBorderOnSubmit(false)
      }
      if (!destinations[1].rideCheckPoint) {
        setRedBorderOnSubmit2(true)
      } else {
        setRedBorderOnSubmit2(false)
      }
      if (
        !new Date(data.orderStartDate).toLocaleDateString("en-GB") ||
        !formData.dateForDefaultValue
      ) {
        setRedBorderOnSubmitForDate(true)
      } else {
        setRedBorderOnSubmitForDate(false)
      }
      if (timeNumberLength.length <= 3) {
        setRedBorderOnSubmitForTime2(true)
        // console.log("WOOOOOOOOOOOW")
      } else {
        setRedBorderOnSubmitForTime2(false)
      }
      if (!hoursAddressForm) {
        setRedBorderOnSubmitForHours(true)
        // console.log("WOOOOOOOOOOOW")
      } else {
        setRedBorderOnSubmitForHours(false)
      }
      if (Number(`${timeNumberAfterColon}`) > 60) {
        setRedBorderOnSubmitForTime3(true)
      } else {
        setRedBorderOnSubmitForTime3(false)
      }

      if (
        timeNumberIsFullZero == "0000" ||
        timeNumberIsFullZeroRedux == "0000" ||
        timeNumberIsFullZero == "000" ||
        timeNumberIsFullZeroRedux == "000"
      ) {
        setRedBorderOnSubmitForTime4(true)
      } else {
        setRedBorderOnSubmitForTime4(false)
      }
      if (!AMPM && !formData?.timeForDefaultValueAMPM?.ampm) {
        setRedBorderOnSubmitForTime(true)
      } else {
        setRedBorderOnSubmitForTime(false)
      }
      if (carSelectionID) {
        setRedBorderOnSubmitForCarType(false)
      } else {
        setRedBorderOnSubmitForCarType(true)
      }
      if (formData.passengersQuantityForBackStep) {
        setRedBorderOnSubmitForPassengers(false)
      } else {
        setRedBorderOnSubmitForPassengers(true)
      }
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    // console.log(data.orderStartDate, data.orderStartTime)

    // if (
    //   destinations[0].rideCheckPoint &&
    //   destinations[1].rideCheckPoint &&
    //   data.orderStartDate &&
    //   data.orderStartTime &&
    //   carSelectionID &&
    //   passengers
    // ) {

    if (onSubmit2(data)) {
      if (Boolean(localStorage.getItem("captcha")) == false) {
        // Boolean(localStorage.getItem("captcha")) !== true &&
        setShowRecaptcha(true)
      } else {
        getCompanyCars({
          hours: hourly ? hoursAddressForm : 0,
          isGateMeeting: isGateMeeting,
          airlines: { id: airlineId },
          orderAddressDetails: [...destinations],
          flightNumber: data.flightNumber,
          page: pageSize,
          typeId: carSelectionID,
          bookingType: bookingType,
          passengersQuantity: formData.passengersQuantityForBackStep,
          isAirportPickupIncluded: isAirportPickupIncludedLocalState,
          boosterSeatCount: boosterSeat,
          safetySeatCount: childSafetySeat,
          luggageCount: luggage,
        })
        setSafetySeatCount(childSafetySeat)
        setBoosterSeatCount(boosterSeat)
        setDateForDefaultValue(date?.toLocaleDateString("en-US"))

        const forRes = date?.toLocaleDateString("en-US")
        const forRes2 = time + ` ${AMPM}`
        // console.log(
        //   event.target.value.match(/\d+/),
        //   event.target.value.substr(event.target.value.indexOf(":")).match(/\d+/)
        // )

        // ._d.toLocaleTimeString("en-US", {
        //   hour: "numeric",
        //   minute: "numeric",
        // })

        // + ` ${AMPM}`
        const resData = {
          orderStartDate: `${forRes}`,
          orderStartTime: `${forRes2}`,
        }
        const resData2 = {
          orderStartDateTime: `${forRes} ` + `${forRes2}`,
        }

        if (date) {
          setFormData(resData2)
        }

        console.log(
          destinations[0].rideCheckPoint,
          destinations[1].rideCheckPoint,
          data?.orderStartDate,
          data?.orderStartTime + ` ${AMPM}`,
          {
            hours: hourly ? hoursAddressForm : 0,
            isGateMeeting: isGateMeeting,
            airlines: { id: airlineId },
            orderAddressDetails: [...destinations],
            flightNumber: data.flightNumber,
            page: pageSize,
            typeId: carSelectionID,
            bookingType: bookingType,
            passengersQuantity: passengers,
            boosterSeatCount: boosterSeat,
          }
        )

        next()
      }
    }
  }

  React.useEffect(() => {
    if (firstAirline) {
      setIsAirline(true)
      setBookingType(3)
      // fetchAirlines()
      // setDisableHourly(true)
    } else {
      setIsAirline(false)
      setDisableHourly(false)
    }
  }, [firstAirline])
  React.useEffect(() => {
    if (hourly) {
      if (firstAirline) {
        setBookingType(3)
      } else {
        setBookingType(2)
      }

      // setDisableHourly(true)
    } else {
      if (firstAirline) {
        setBookingType(3)
      } else {
        setBookingType(1)
      }
    }
  })

  return (
    <AdressFormUIComponent
      carTypes={carTypes}
      formData={formData}
      hourlyAndSeatsRedux={hourlyAndSeatsRedux}
      setHourlyRedux={setHourlyRedux}
      isGateMeeting={isGateMeeting}
      setGateMeetingRedux={setGateMeetingRedux}
      gateMeeting={gateMeeting}
      resetInputs={resetInputs}
      setPassengersQuantityForBackStep={setPassengersQuantityForBackStep}
      isBoosterSeatExistOnBackend={isBoosterSeatExistOnBackend}
      isSafetySeatExistOnBackend={isSafetySeatExistOnBackend}
      airlines={airlines}
      alignment={alignment}
      bookingType={bookingType}
      boosterSeat={boosterSeat}
      carSelectionID={carSelectionID}
      childSafetySeat={childSafetySeat}
      destinations={destinations}
      flightNumber={flightNumber}
      handleChangeAMPM={handleChangeAMPM}
      handleClick={handleClick}
      // handleInput={handleInput}
      handleSubmit={handleSubmit}
      hourly={hourly}
      hoursAddressForm={hoursAddressForm}
      hoursCount={hoursCount}
      redBorderOnSubmitForHours={redBorderOnSubmitForHours}
      isAirline={isAirline}
      luggage={luggage}
      methods={methods}
      register={register}
      myArrow={myArrow}
      onSubmit={onSubmit}
      passengers={passengers}
      redBorderOnAirlines={redBorderOnAirlines}
      redBorderOnSubmit={redBorderOnSubmit}
      redBorderOnSubmit2={redBorderOnSubmit2}
      redBorderOnSubmitForCarType={redBorderOnSubmitForCarType}
      redBorderOnSubmitForDate={redBorderOnSubmitForDate}
      redBorderOnSubmitForPassengers={redBorderOnSubmitForPassengers}
      redBorderOnSubmitForTime={redBorderOnSubmitForTime}
      redBorderOnSubmitForTime2={redBorderOnSubmitForTime2}
      redBorderOnSubmitForTime3={redBorderOnSubmitForTime3}
      redBorderOnSubmitForTime4={redBorderOnSubmitForTime4}
      redBorderOnSubmitForTime5={redBorderOnSubmitForTime5}
      redBorderOnSubmitForTime6={redBorderOnSubmitForTime6}
      safetySeat={safetySeat}
      setAirlineId={setAirlineId}
      setBoosterSeat={setBoosterSeat}
      setChildSafetySeat={setChildSafetySeat}
      setDestinations={setDestinations}
      setFlightNumber={setFlightNumber}
      setHourly={setHourly}
      setHoursAddressForm={setHoursAddressForm}
      setHoursRedux={setHoursRedux}
      setIsAirportPickupIncludedLocalState={
        setIsAirportPickupIncludedLocalState
      }
      setIsGateMeeting={setIsGateMeeting}
      setLuggage={setLuggage}
      setPassengers={setPassengers}
      setSafetySeat={setSafetySeat}
      // setValue={setValue}
      date={date}
      setDate={setDate}
      show={show}
      setShow={setShow}
      showRecaptcha={showRecaptcha}
      setShowRecaptcha={setShowRecaptcha}
      AMPM={AMPM}
      setDateForDefaultValue={setDateForDefaultValue}
      control={control}
      fetchAirlines={fetchAirlines}
      extractAirlineId={extractAirlineId}
      airlineName={airlineName}
      time={time}
      setTime={setTime}
      setTimeForDefaultValue={setTimeForDefaultValue}
      setShowCarsWithSafetySeat={setShowCarsWithSafetySeat}
      setSafetySeatCount={setSafetySeatCount}
      setBoosterSeatCount={setBoosterSeatCount}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    carTypes: state.companyProfile.profile.carTypes,
    pageSize: state.cars.pageSize,
    formData: state.formData,
    resetInputs: state.resetWidgetInputs.resetInputs,
    gateMeeting: state.gateMeeting.isGateMeeting,
    hourlyAndSeatsRedux: state.hourlyAndSeatsRedux.hourlyRedux,
    hoursCount: state.formData.hours,
    isBoosterSeatExistOnBackend:
      state.companyProfile.isBoosterSeatExistOnBackend,
    isSafetySeatExistOnBackend: state.companyProfile.isSafetySeatExistOnBackend,
  }
}

export default connect(mapStateToProps, {
  getCarsByType,
  getCompanyCars,
  setFormData,
  setHourlyRedux,
  setGateMeetingRedux,
  setSafetySeatCount,
  setBoosterSeatCount,
  setDateForDefaultValue,
  setTimeForDefaultValue,
  setTimeForDefaultValueAMPM,
  setTimeForDefaultValueAlignment,
  setPassengersQuantityForBackStep,
  setShowCarsWithSafetySeat,
  setHoursRedux,
})(AdressFormContainerComponent)

const Button = styled.button`
  width: 30px;
  height: 100%;
  background: transparent;
  /* color: $font-color; */
  border: none;
  font-size: 19px;
  /* border-radius: $inputs-border-radius; */
  /* border: 1px solid ${(props) => props.borderColorForInnerElements}; */
  border-radius: ${(props) => props.borderRadiusesForInnerElements};
  cursor: pointer;
  transition: 0.2s;
  color: ${(props) => props.fontColor};
  &:hover {
    background: $hover-color;
    color: $inner-text-on-hover;
    transition: 0.2s;
  }
`
