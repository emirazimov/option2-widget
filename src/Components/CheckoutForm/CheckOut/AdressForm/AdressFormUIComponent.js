import { ListItem, TextField, useMediaQuery } from "@material-ui/core"
import React, { useContext, useRef, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import GoogleMap from "../../../GoogleMap/GoogleMapContainer/GoogleMap"
import Hours from "./Hours/Hours"
import PassengerQuantity from "./PassengerQuantity/PassengerQuantity"
import Carousel, { consts } from "react-elastic-carousel"
import SafetySeat from "./SafetySeat/SafetySeat"
import Luggage from "./Luggage/Luggage"
import styles from "./AdressFormStyles/AdressForm.module.scss"
import "./AdressFormStyles/AdressFormDatePickerSeparatedStyles.scss"
import { Switch } from "../../../Helpers/Switch/Switch"
import "./AdressFormStyles/AdressFormCarousel.scss"
import CalendarPicker from "@mui/lab/CalendarPicker"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { Modal } from "../../../Helpers/Modal/Modal"
import ThemeContext from "../../../../context"
import {
  ClockIcon,
  DateIcon,
  HourlyIcon,
  MeetAndGreetIcon,
  MeetAndGreetIconWhite,
  PlaneIcon,
  SafetySeatIcon,
  Ticket,
} from "../../../../assets/icons"
import Autocomplete from "@mui/material/Autocomplete"
import styled from "styled-components"
import MapStyles from "../../../GoogleMap/mapStyles"
import { GoogleApiWrapper, Map, Marker } from "google-maps-react"
import ReCAPTCHA from "react-google-recaptcha"

{
  /*компонента перед экспортом обернута в react.memo*/
}

const AdressFormwithoutReactMemo = ({
  next,
  carTypes,
  pageSize,
  getCompanyCars,
  setFormData,
  formData,
  hourlyAndSeatsRedux,
  setHourlyRedux,
  setGateMeetingRedux,
  gateMeeting,
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
  airlines,
  alignment,
  bookingType,
  boosterSeat,
  carSelectionID,
  childSafetySeat,
  destinations,
  flightNumber,
  handleChangeAMPM,
  handleClick,
  handleSubmit,
  hourly,
  hoursAddressForm,
  isAirline,
  luggage,
  methods,
  myArrow,
  onSubmit,
  passengers,
  redBorderOnAirlines,
  redBorderOnSubmit,
  redBorderOnSubmit2,
  redBorderOnSubmitForCarType,
  redBorderOnSubmitForDate,
  redBorderOnSubmitForPassengers,
  redBorderOnSubmitForTime,
  redBorderOnSubmitForTime2,
  redBorderOnSubmitForTime3,
  redBorderOnSubmitForTime4,
  redBorderOnSubmitForTime5,
  redBorderOnSubmitForTime6,
  safetySeat,
  setAirlineId,
  setBoosterSeat,
  setChildSafetySeat,
  setDestinations,
  setFlightNumber,
  setHourly,
  setHoursAddressForm,
  setIsAirportPickupIncludedLocalState,
  setIsGateMeeting,
  setLuggage,
  setPassengers,
  setSafetySeat,
  date,
  setDate,
  show,
  setShow,
  AMPM,
  register,
  control,
  fetchAirlines,
  extractAirlineId,
  airlineName,
  time,
  setTime,
  setShowCarsWithSafetySeat,
  isGateMeeting,
  redBorderOnSubmitForHours,
  setHoursRedux,
  hoursCount,
  setSafetySeatCount,
  setBoosterSeatCount,
  showRecaptcha,
  setShowRecaptcha,
  ...props
}) => {
  const isMobile = useMediaQuery("(max-width:1024px)")

  const {
    ThemeProviderAppBackgroundColor,
    fontColor,
    borderRadiuses,
    carsTypeColor,
    hoverColor,
    iconsColor,
    backAndNextButtonsColor,
    backAndNextButtonsFontColor,
    backAndNextButtonsBorderColor,
    innerTextOnHover,
    inputsFontColor,
    inputsBackground,
    borderRadiusesForInnerElements,
    borderRadiusesForWholeApp,
    borderColorForInnerElements,
    borderColorForOuterApp,
    BackgroundImage,
    mapBackground,
  } = useContext(ThemeContext)

  const [card, setCard] = useState()
  const inputCard = useRef()
  const startsWithTwo = time[0] === "2"

  const handleChange = () => {
    const timeNumberAfterColon = ":"

    const setZeroOrNot = (timeValue1) => {
      if (timeValue1 > 1) {
        return 0
      }
      return timeValue1
    }
    const timeValue = inputCard.current.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})/)
    inputCard.current.value = timeValue[4]
      ? `${setZeroOrNot(timeValue[1])}${timeValue[2]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[3]}${timeValue[4]}`
      : `${timeValue[1]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[2]}${timeValue[3]}`

    setTime(inputCard.current.value)
    setTimeForDefaultValue(inputCard.current.value)
    console.log(timeValue)
  }

  const MeetAndGreetSwitchBlock = (
    <div className={styles.meetAndGreetRow}>
      <div className={styles.meetAndGreetWrapper}>
        <div className={styles.meetAndGreetContainer}>
          <div className={styles.meetAndGreetIconAndNameContainer}>
            {/* <MeetAndGreetIcon color={fontColor} /> */}
            <span
              className={styles.meetAndGreetIconAndNameTitle}
              style={{ color: fontColor }}
            >
              {"Meet & Greet/Luggage Assist"}
            </span>
          </div>

          <div className={styles.meetAndGreetSwitch}>
            <Switch
              checked={gateMeeting}
              onClick={() => {
                if (gateMeeting == false) {
                  setGateMeetingRedux(true)
                  setIsGateMeeting(true)
                  setIsAirportPickupIncludedLocalState(true)
                  console.log("true")
                } else {
                  setGateMeetingRedux(false)
                  setIsGateMeeting(false)
                  setIsAirportPickupIncludedLocalState(false)
                  console.log("false")
                }
              }}
              numberToIdentify={1}
            />
          </div>
        </div>
      </div>
      <div className={styles.luggageCounter}>
        <Luggage
          luggage={luggage}
          setLuggage={setLuggage}
          isGateMeeting={isGateMeeting}
        />
      </div>
    </div>
  )

  function onChange(value) {
    console.log("Captcha value:", value)
    window.localStorage.setItem("captcha", value)
    if (Boolean(localStorage.getItem("captcha")) == true) {
      setTimeout(() => setShowRecaptcha(false), 700)
    }
  }

  React.useEffect(() => {
    fetchAirlines()
  }, [])
  const [mapCenter, setMapCenter] = useState({
    lat: 33.1507,
    lng: -96.8236,
  })
  const [markers, setMarkers] = useState([])

  return (
    <div
      className={styles.mainWrapper}
      style={{
        background: ThemeProviderAppBackgroundColor,
      }}
    >
      <FormProvider {...methods} style={{ width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <div className={styles.adressFormWrapperToSetRowDirection}>
            <div
              // item
              className={styles.mapContainer}
            >
              <div
                className={styles.mapContainerForHideMapsTagsPositioning}
                style={{
                  border: `1px solid ${borderColorForInnerElements}`,
                  borderRadius: borderRadiusesForInnerElements,
                  background: mapBackground,
                }}
              >
                <div
                  className={styles.mapContainerForBorder}
                  style={{ borderRadius: borderRadiusesForInnerElements }}
                >
                  <Map
                    google={props.google}
                    disableDefaultUI={true}
                    initialCenter={{
                      lat: mapCenter.lat,
                      lng: mapCenter.lng,
                    }}
                    center={{
                      lat: mapCenter.lat,
                      lng: mapCenter.lng,
                    }}
                    style={{
                      borderRadius: `${borderRadiusesForInnerElements}`,
                    }}
                    styles={MapStyles}
                    zoom={12}
                  >
                    {markers.map((marker, id) => (
                      <Marker
                        key={`${id}${marker.lat}`}
                        lat={marker.lat}
                        lng={marker.lng}
                      />
                    ))}
                  </Map>
                  {/* <div
                    style={{
                      width: "100%",
                      height: "30px",
                      background: "black",
                      position: "absolute",
                      bottom: "-20px",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  ></div> */}
                </div>
              </div>
            </div>
            <div className={styles.inputsColumnWrapper}>
              {/* <div className={styles.mapAndDirectionsWrapper}> */}
              <GoogleMap
                setDestinations={setDestinations}
                destinations={destinations}
                orderAddressDetails={formData.orderAddressDetails}
                redBorderOnSubmit={redBorderOnSubmit}
                redBorderOnSubmit2={redBorderOnSubmit2}
                setMapCenter={setMapCenter}
                markers={markers}
                setMarkers={setMarkers}
              />
              {/* </div> */}
              <div className={styles.underMapOptionsWrapper}>
                <div className={styles.underMapOptionsContainer}>
                  {(isAirline || formData.isAirportPickupIncluded) &&
                    (formData.bookingType === 3 || bookingType === 3) && (
                      <div
                        className={styles.underMapOptionsContainerForAirlines}
                      >
                        <div className={styles.airlinesItem}>
                          {/* <PlaneIcon color={fontColor} /> */}
                          <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => {
                              newValue
                                ? extractAirlineId(newValue)
                                : setAirlineId(null)
                            }}
                            style={{ width: "100%" }}
                            options={airlines.map((airline) => airline.name)}
                            renderInput={(params) => (
                              <div
                                ref={params.InputProps.ref}
                                style={{ width: "100%", display: "flex" }}
                              >
                                <input
                                  type="text"
                                  {...params.inputProps}
                                  placeholder="Airlines"
                                  className={styles.airLinesInput}
                                  style={{
                                    width: "100%",
                                    color: inputsFontColor,
                                    border: `1px solid ${borderColorForInnerElements}`,
                                    background: inputsBackground,
                                    borderRadius:
                                      borderRadiusesForInnerElements,
                                  }}
                                />
                              </div>
                            )}
                          />
                        </div>
                        <div className={styles.flightNumberContainer}>
                          <div className={styles.flightNumberItem}>
                            {/* <Ticket color={fontColor} /> */}
                            <input
                              name="flightNumber"
                              placeholder="Flight number"
                              className={styles.flightNumberInput}
                              autoComplete="off"
                              style={{
                                color: inputsFontColor,
                                border: `1px solid ${borderColorForInnerElements}`,
                                borderRadius: borderRadiusesForInnerElements,
                                background: inputsBackground,
                              }}
                              defaultValue={null}
                              value={flightNumber}
                              onChange={(e) => setFlightNumber(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className={styles.dateTimeBlock}>
                    <div className={styles.dateTimeBlockContainer}>
                      <div className={styles.datePicker}>
                        {/* <DateIcon color={fontColor} /> */}
                        <div
                          onClick={() => setShow(true)}
                          className={
                            redBorderOnSubmitForDate
                              ? styles.datePickerOpenButtonWithRedBorder
                              : styles.datePickerOpenButton
                          }
                          placeholder="Pick up Date"
                          value={
                            formData.dateForDefaultValue && !resetInputs
                              ? formData.dateForDefaultValue
                              : date?.toLocaleDateString("en-US")
                          }
                          style={{
                            color: inputsFontColor,
                            border: !redBorderOnSubmitForDate
                              ? `1px solid ${borderColorForInnerElements}`
                              : `1px solid red`,
                            borderRadius: borderRadiusesForInnerElements,
                            background: inputsBackground,
                          }}
                        >
                          {formData.dateForDefaultValue && !resetInputs
                            ? formData.dateForDefaultValue
                            : date?.toLocaleDateString("en-US")}

                          {!formData.dateForDefaultValue ? (
                            <span style={{ color: "grey", paddingTop: "10px" }}>
                              Pick up Date
                            </span>
                          ) : null}
                        </div>

                        <Modal onClose={() => setShow(false)} show={show}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div>
                              <CalendarPicker
                                date={date}
                                onChange={(newDate) => {
                                  console.log(newDate)
                                  if (newDate instanceof Date) {
                                    setShow(false)
                                  }
                                  setDateForDefaultValue(
                                    newDate.toLocaleDateString("en-US")
                                  )
                                  setDate(newDate)
                                }}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </div>
                          </LocalizationProvider>
                        </Modal>
                      </div>
                      <div className={styles.timePicker}>
                        <div className={styles.timePickerContainer}>
                          {/* <ClockIcon color={fontColor} /> */}
                          <input
                            name="orderStartTime"
                            placeholder="hh:mm"
                            autoComplete="off"
                            className={styles.timePickerInput}
                            setTime={setTime}
                            ref={inputCard}
                            onClick={(event) => {
                              const { value } = event.target
                              const position = value.length
                              event.target.setSelectionRange(position, position)
                            }}
                            onChange={handleChange}
                            style={{
                              color: inputsFontColor,
                              border:
                                redBorderOnSubmitForTime ||
                                redBorderOnSubmitForTime2 ||
                                redBorderOnSubmitForTime3 ||
                                redBorderOnSubmitForTime4 ||
                                redBorderOnSubmitForTime5 ||
                                redBorderOnSubmitForTime6
                                  ? `1px solid red`
                                  : `1px solid ${borderColorForInnerElements}`,
                              borderRadius: borderRadiusesForInnerElements,
                              background: inputsBackground,
                              textAlign: "right",
                              paddingRight: "78px",
                            }}
                            value={
                              !resetInputs ? formData.timeForDefaultValue : null
                            }
                          />
                          <div className={styles.toggleButtonsContainer}>
                            <div
                              className={
                                AMPM == "AM"
                                  ? styles.toggleButtonAMSelected
                                  : styles.toggleButtonAMNotSelected
                              }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleChangeAMPM(e)
                              }}
                              style={{
                                color: AMPM == "AM" ? "white" : inputsFontColor,
                                background:
                                  AMPM == "AM"
                                    ? `${hoverColor}`
                                    : "transparent",
                                opacity: AMPM == "AM" ? "1" : "0.5",
                                borderRadius: borderRadiusesForInnerElements,
                              }}
                            >
                              AM
                            </div>
                            <div
                              className={
                                AMPM == "PM"
                                  ? styles.toggleButtonPMSelected
                                  : styles.toggleButtonPMNotSelected
                              }
                              onClick={(e) => {
                                e.stopPropagation()
                                handleChangeAMPM(e)
                              }}
                              style={{
                                color: AMPM == "PM" ? "white" : inputsFontColor,
                                background: "transparent",
                                background:
                                  AMPM == "PM"
                                    ? `${hoverColor}`
                                    : "transparent",
                                opacity: AMPM == "PM" ? "1" : "0.5",
                                borderRadius: borderRadiusesForInnerElements,
                              }}
                            >
                              PM
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ width: "100%" }}
                    className={styles.passengersQuantityBlock}
                  >
                    <div className={styles.passengersQuantityBlockContainer}>
                      <PassengerQuantity
                        passengersqState={formData.passengersQuantity}
                        setPassengers={setPassengers}
                        passengers={passengers}
                        setPassengersQuantityForBackStep={
                          setPassengersQuantityForBackStep
                        }
                        passengersQuantityForBackStep={
                          formData.passengersQuantityForBackStep
                        }
                        redBorderOnSubmitForPassengers={
                          redBorderOnSubmitForPassengers
                        }
                      />
                    </div>
                  </div>

                  {(isAirline || formData.isAirportPickupIncluded) &&
                    (formData.bookingType === 3 || bookingType === 3) &&
                    MeetAndGreetSwitchBlock}
                  {destinations[1]?.rideCheckPoint.match(
                    /(^|\W)Airport($|\W)/
                  ) && MeetAndGreetSwitchBlock}

                  <div className={styles.hourlyRow}>
                    <div className={styles.hourlyWrapper}>
                      <div className={styles.hourlyRowContainer}>
                        <div className={styles.hourlyIconAndNameContainer}>
                          {/* <HourlyIcon color={fontColor} /> */}
                          <span
                            className={styles.hourlyIconAndNameTitle}
                            style={{ color: fontColor }}
                          >
                            Hourly
                          </span>
                        </div>
                        <Switch
                          checked={hourlyAndSeatsRedux}
                          onClick={() => {
                            if (!hourlyAndSeatsRedux) {
                              setHourlyRedux(true)
                            } else {
                              setHourlyRedux(false)
                            }
                            setHourly(!hourly)
                          }}
                          numberToIdentify={3}
                        />
                      </div>
                    </div>
                    <div className={styles.hourlyCounter}>
                      {/* {hourlyAndSeatsRedux === true && (
                      
                    )} */}
                      <Hours
                        hoursState={formData.hours}
                        hourly={hourly}
                        hourlyAndSeatsRedux={hourlyAndSeatsRedux}
                        hoursAddressForm={hoursAddressForm}
                        setHoursAddressForm={setHoursAddressForm}
                        redBorderOnSubmitForHours={redBorderOnSubmitForHours}
                        setHoursRedux={setHoursRedux}
                        hoursCount={hoursCount}
                      />
                    </div>
                  </div>
                  <div className={styles.safetySeatRow}>
                    {(isBoosterSeatExistOnBackend ||
                      isSafetySeatExistOnBackend) && (
                      <div className={styles.safetySeatWrapper}>
                        <div className={styles.safetySeatContainer}>
                          <div
                            className={styles.safetySeatIconAndNameContainer}
                          >
                            {/* <SafetySeatIcon color={fontColor} /> */}
                            <span
                              className={styles.safetySeatIconAndNameTitle}
                              style={{ color: fontColor }}
                            >
                              Safety Seat
                            </span>
                          </div>
                          <Switch
                            checked={formData.showCarsWithSafetySeat}
                            onClick={() => {
                              setSafetySeat(!safetySeat)
                              setShowCarsWithSafetySeat(!safetySeat)
                            }}
                            numberToIdentify={2}
                          />
                        </div>
                      </div>
                    )}
                    <div className={styles.SafetySeatCounterWrapper}>
                      {/* {formData.showCarsWithSafetySeat === true && (
                      
                    )} */}
                      <div className={styles.SafetySeatCounterContainer}>
                        <SafetySeat
                          safetySeat={safetySeat}
                          setBoosterSeat={setBoosterSeat}
                          setChildSafetySeat={setChildSafetySeat}
                          boosterSeat={boosterSeat}
                          childSafetySeat={childSafetySeat}
                          isBoosterSeatExistOnBackend={
                            isBoosterSeatExistOnBackend
                          }
                          isSafetySeatExistOnBackend={
                            isSafetySeatExistOnBackend
                          }
                          showCarsWithSafetySeat={
                            formData.showCarsWithSafetySeat
                          }
                          setSafetySeatCount={setSafetySeatCount}
                          setBoosterSeatCount={setBoosterSeatCount}
                          safetySeatCountRedux={formData.safetySeatCount}
                          boosterSeatCountRedux={formData.boosterSeatCount}
                          showCarsWithSafetySeat={
                            formData.showCarsWithSafetySeat
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.preferencesWrapper}>
                    <div className={styles.preferencesTitleContainer}>
                      <span
                        className={styles.preferencesTitle}
                        style={{ color: fontColor }}
                      >
                        Preferences
                      </span>
                    </div>
                    <div
                      className={styles.preferencesCarsContainer}
                      style={{
                        borderRadius: `${borderRadiusesForInnerElements}`,
                        border: redBorderOnSubmitForCarType
                          ? "1px solid red"
                          : "1px solid transprent",
                      }}
                    >
                      <Carousel
                        renderArrow={myArrow}
                        itemsToShow={isMobile ? 3 : 4}
                        pagination={false}
                        transitionMs={300}
                      >
                        {carTypes.map((car, indexOfEachCar) => (
                          <CarItemContainer
                            hoverColor={hoverColor}
                            borderRadiusesForInnerElements={
                              borderRadiusesForInnerElements
                            }
                            carsTypeColor={carsTypeColor}
                            carSelected={car.id === carSelectionID}
                            fontColor={fontColor}
                            innerTextOnHover={innerTextOnHover}
                            onClick={() => handleClick(car.id)}
                            name="carsValidation"
                          >
                            <div className={styles.carItemTitleContainer}>
                              <span className={styles.carItemTitle}>
                                {car.name}
                              </span>
                            </div>
                            <div item className={styles.carImageContainer}>
                              <img
                                alt="carImage"
                                src={car.imageUrl}
                                className={
                                  indexOfEachCar == 2
                                    ? styles.carImageStylesForBiggerTypeOfImage
                                    : styles.carImage
                                }
                                item
                                className={styles.carImage}
                              />
                              {console.log(indexOfEachCar == 2)}
                            </div>
                          </CarItemContainer>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal onClose={() => setShowRecaptcha(false)} show={showRecaptcha}>
            <ReCAPTCHA
              sitekey="6LeuP3weAAAAAHoe3aaP27xmYorD1s1vXK7XdlPk"
              onChange={onChange}
            />
          </Modal>
          <div
            className={styles.buttonGroupBlockContainer}
            // onClick={(event) => {
            //   // event.stopPropagation()
            //   console.log(localStorage.getItem("captcha") !== true)
            //   Boolean(localStorage.getItem("captcha")) !== true &&
            //     setShowRecaptcha(true)
            // }}
          >
            <button
              type="submit"
              className={styles.buttonNextSelf}
              style={{
                background: backAndNextButtonsColor,
                color: backAndNextButtonsFontColor,
                border: `1px solid ${backAndNextButtonsBorderColor}`,
                borderRadius: borderRadiusesForInnerElements,
              }}
            >
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM",
//   libraries: ["places", "drawing", "geometry"],
// })(connect(mapStateToProps, {})(GoogleMap))

const AdressFormWithGoogleMap = GoogleApiWrapper({
  apiKey: "AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM",
  libraries: ["places", "drawing", "geometry"],
})(AdressFormwithoutReactMemo)

const AdressFormUIComponent = React.memo(AdressFormWithGoogleMap)

export default AdressFormUIComponent

const CarItemContainer = styled.div`
  width: 60px;
  height: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius:${(props) => props.borderRadiusesForInnerElements};
  padding: 3px;
  outline: none;
  background: ${(props) => {
    if (!props.carSelected) {
      return props.carsTypeColor
    } else {
      return props.hoverColor
    }
  }}} ;
  span{
    color:
    
    ${(props) => {
      if (props.carSelected) {
        return props.innerTextOnHover
      } else {
        return props.fontColor
      }
    }}};
  }

  transition: 0.1s;
  &:hover {
    background: ${(props) => props.hoverColor};
    cursor: pointer;
    transition: 0.1s;

    span{
    color:${(props) => props.innerTextOnHover} ;
  }
  }
`
