import { useMediaQuery } from "@material-ui/core"
import React, { useContext } from "react"
import { AspectRatio } from "react-aspect-ratio"
import Carousel, { consts } from "react-material-ui-carousel"
import { BackArrowIcon, ForwardArrowIcon } from "../../../../assets/icons"
import Directions from "../../../GoogleMap/Directions/Directions"
import styles from "./Preview.module.scss"
import { Modal } from "../../../Helpers/Modal/Modal"
import ThemeContext from "../../../../context"
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../FleetForm/FleetForm.css"
import PreviewReusableUIComponent from "./PreviewReusableUIComponent"

const PreviewUIComponent = ({
  carId,
  cars,
  formData,
  next,
  back,
  setNoteRedux,
  setOrderSum,
  hourlyAndSeatsRedux,
  gateMeeting,
  selectedCar,
  note,
  setNote,
  distance,
  setDistance,
  sendNote,
  handleChange,
  carCard,
  setCarCard,
  carModal,
  setCarModal,
  open,
  setOpen,
  handleClickOpen,
  handleClickClose,
  handleClick,
  round,
  showCarAmount,
  show,
  setShow,
}) => {
  console.log(formData.orderStartDateTime)

  const {
    ThemeProviderAppBackgroundColor,
    fontColor,
    borderRadiuses,
    carsTypeColor,
    hoverColor,
    iconsColor,
    backAndNextButtonsColor,
    backAndNextButtonsFontColor,
    innerTextOnHover,
    inputsFontColor,
    borderRadiusesForInnerElements,
    borderRadiusesForWholeApp,
    borderColorForInnerElements,
    borderColorForOuterApp,
  } = useContext(ThemeContext)

  return (
    <div
      className={styles.previewWrapper}
      style={{ background: ThemeProviderAppBackgroundColor }}
    >
      <div className={styles.previewTitleContainer}>
        <span className={styles.previewTitleSelf} style={{ color: fontColor }}>
          Preview
        </span>
      </div>
      <div className={styles.previewRowPos}>
        <div className={styles.directionsContainer}>
          <div
            className={styles.directionsSelf}
            style={{
              border: `1px solid  ${fontColor}`,
              borderRadius: borderRadiusesForInnerElements,
            }}
          >
            <Directions
              destinations={formData.orderAddressDetails}
              setDistance={setDistance}
            />
          </div>
        </div>
        <div
          className={styles.reservationDetailsWrapper}
          style={{
            border: `1px solid ${fontColor}`,
            borderRadius: borderRadiusesForInnerElements,
          }}
        >
          <PreviewReusableUIComponent
            carId={carId}
            cars={cars}
            formData={formData}
            next={next}
            back={back}
            setNoteRedux={setNoteRedux}
            setOrderSum={setOrderSum}
            hourlyAndSeatsRedux={hourlyAndSeatsRedux}
            gateMeeting={gateMeeting}
            selectedCar={selectedCar}
            note={note}
            setNote={setNote}
            distance={distance}
            setDistance={setDistance}
            sendNote={sendNote}
            handleChange={handleChange}
            carCard={carCard}
            setCarCard={setCarCard}
            carModal={carModal}
            setCarModal={setCarModal}
            open={open}
            setOpen={setOpen}
            handleClickOpen={handleClickOpen}
            handleClickClose={handleClickClose}
            handleClick={handleClick}
            round={round}
            showCarAmount={showCarAmount}
            show={show}
            setShow={setShow}
          />
        </div>
      </div>
      <div className={styles.buttonGroupBlock}>
        <div className={styles.buttonGroupBlockContainer}>
          <button
            variant="contained"
            color="primary"
            fullWidth
            onClick={back}
            startIcon={<BackArrowIcon />}
            className={styles.buttonBackSelf}
            style={{
              background: backAndNextButtonsColor,
              color: backAndNextButtonsFontColor,
              border: `1px solid ${borderColorForInnerElements}`,
              borderRadius: borderRadiusesForInnerElements,
            }}
          >
            Back
          </button>
          <button
            variant="contained"
            fullWidth
            onClick={() => {
              next()
              sendNote(note)
              setOrderSum(selectedCar.price)
            }}
            color="primary"
            endIcon={<ForwardArrowIcon />}
            className={styles.buttonNextSelf}
            style={{
              background: backAndNextButtonsColor,
              color: backAndNextButtonsFontColor,
              border: `1px solid ${borderColorForInnerElements}`,
              borderRadius: borderRadiusesForInnerElements,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreviewUIComponent
