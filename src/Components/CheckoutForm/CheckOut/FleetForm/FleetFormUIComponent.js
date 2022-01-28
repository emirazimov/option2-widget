import React, { useContext } from "react"
import Carousel from "react-material-ui-carousel"
import { Preloader } from "../../../Helpers/Preloader/Preloader"
import { AppBar, useMediaQuery } from "@material-ui/core"
import { AspectRatio } from "react-aspect-ratio"
import "./FleetForm.css"
import IncorrectAddressError from "../../IncorrectAdressError/IncorrectAddressError"
import styles from "./FleetForm.module.scss"
import { Modal } from "../../../Helpers/Modal/Modal"
import ThemeContext from "../../../../context"

const FleetForm = ({
  cars,
  isFetching,
  back,
  next,
  setCarId,
  gateMeeting,
  setGateMeetingRedux,
  error,
  setActiveStep,
  setResetWidgetInputs,
  setIsAirportPickupIncluded,
  carCard,
  handleClickOpen,
  handleClickClose,
  handleClick,
  result,
  round,
  show,
  showSafetySeatIsNotAvailable,
  setShowSafetySeatIsNotAvailable,
  formData,
}) => {
  const isMobile = useMediaQuery("(max-width:500px)")
  const isiPad = useMediaQuery("(max-width:1024px)")

  const carTextColor = "white"
  const car = [cars[0], cars[1]]

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
    borderRadiusesForInnerElements,
    borderRadiusesForWholeApp,
    borderColorForInnerElements,
    borderColorForOuterApp,
  } = useContext(ThemeContext)

  const ifThereisError = () => {
    if (error) {
      return (
        <IncorrectAddressError
          errorMessage={error}
          setActiveStep={setActiveStep}
        />
      )
    } else {
      if (!isFetching) {
        return (
          <div
            className={styles.mainWrapperFleet}
            style={{ background: ThemeProviderAppBackgroundColor }}
          >
            <div className={styles.contentContainer}>
              {showSafetySeatIsNotAvailable && (
                <div
                  className={styles.showSafetySeatIsNotAvailable}
                  style={{ background: ThemeProviderAppBackgroundColor }}
                >
                  <span
                    style={{
                      width: "100%",
                      color: fontColor,
                      textAlign: "center",
                      marginTop: "30px",
                      marginBottom: " 45px",
                    }}
                  >
                    Safety Seat is Not Available
                  </span>
                  <button
                    type="button"
                    style={{
                      width: "100%",
                      color: fontColor,
                      background: ThemeProviderAppBackgroundColor,
                      border: "none",
                      borderTop: `1px solid ${fontColor}`,
                      cursor: "pointer",
                      paddingTop: "18px",
                      paddingBottom: "18px",
                    }}
                    onClick={() => {
                      setShowSafetySeatIsNotAvailable(false)
                    }}
                  >
                    OK
                  </button>
                </div>
              )}
              <div className={styles.pageTitleContainer}>
                <span className={styles.pageTitle}>Select vehicle</span>
              </div>
              <div className={styles.carListContainer}>
                {console.log(typeof cars)}
                {cars.map((car, index) => (
                  <div
                    onClick={(event) => {
                      if (
                        car.isBoosterSeatsExist == false &&
                        car.isBoosterSeatsExist == false &&
                        formData.showCarsWithSafetySeat == true
                      ) {
                        setShowSafetySeatIsNotAvailable(true)
                      } else {
                        handleClick(car?.id)
                      }
                    }}
                    className={
                      car?.id === carCard
                        ? styles.carContainerSelected
                        : styles.carContainer
                    }
                    key={`${car?.id}${car?.name}`}
                    style={{
                      background: `${backAndNextButtonsColor}`,
                      border: `1px solid ${borderColorForInnerElements}`,
                    }}
                  >
                    <div className={styles.carImageBlock}>
                      {car.isBoosterSeatsExist == false &&
                        car.isBoosterSeatsExist == false &&
                        formData.showCarsWithSafetySeat == true && (
                          <span className={styles.safetySeatNotAvailable}>
                            Safety Seat N/A
                          </span>
                        )}
                      <Carousel
                        autoPlay={false}
                        animation="slide"
                        className={styles.carImageSelf}
                        style={{ width: "100%" }}
                        navButtonsProps={{
                          style: {
                            width: "13px",
                            height: "13px",
                            marginTop: "8px",
                            zIndex: "20",
                          },
                        }}
                        indicatorIconButtonProps={{
                          style: {
                            "&:hover": {
                              "&$button": {
                                backgroundColor: "#10B7EC",
                                filter: "brightness(120%)",
                                opacity: "0.4",
                              },
                            },
                            width: "5px",
                            height: "5px",
                            color: "grey",
                            margin: "auto 4px",
                          },
                        }}
                        activeIndicatorIconButtonProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        indicatorContainerProps={{
                          style: {
                            bottom: "5px",
                            position: "absolute",
                            zIndex: "10",
                            justifyContent: "center",
                            paddingTop: "45px",
                          },
                        }}
                      >
                        {car?.imageUrls?.length !== 0 ? (
                          car?.imageUrls?.map((url) => (
                            <>
                              <div
                                className={styles.orSimiliar}
                                style={{
                                  background: backAndNextButtonsColor,
                                  color: fontColor,
                                }}
                              >
                                or similar
                              </div>
                              <img
                                src={url?.path}
                                key={url?.id}
                                alt="car"
                                className={styles.carImageSelf}
                                onClick={(event) => {
                                  handleClickOpen(car?.id)
                                }}
                              />
                            </>
                          ))
                        ) : (
                          <>
                            <span
                              className={styles.orSimiliar}
                              style={{
                                background: backAndNextButtonsColor,
                                color: fontColor,
                              }}
                            >
                              or similar
                            </span>

                            <img
                              src={
                                "https://fl-1.cdn.flockler.com/embed/not-found.png"
                              }
                              className={styles.carImageSelf}
                              alt="car"
                            />
                          </>
                        )}
                      </Carousel>
                    </div>
                    <div className={styles.carDescriptionTextBlock}>
                      <div className={styles.carDescriptionTextContainer}>
                        <span
                          className={styles.carModel}
                          style={{
                            color: fontColor,
                          }}
                        >
                          {car?.make} {car?.model}
                        </span>
                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Type
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                color: fontColor,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={styles.detailedDescriptionValueSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              {car?.type}
                            </span>
                          </div>
                        </div>

                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Capacity
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                color: fontColor,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={styles.detailedDescriptionValueSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              {car?.capacity}
                            </span>
                          </div>
                        </div>

                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Color
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                color: fontColor,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={styles.detailedDescriptionValueSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              {car?.color}
                            </span>
                          </div>
                        </div>

                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Amount
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                color: fontColor,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={
                                styles.detailedDescriptionValueAmountSelf
                              }
                              style={{
                                color: fontColor,
                              }}
                            >
                              {gateMeeting
                                ? `$${round(car?.price, 2)}`
                                : `$${round(car?.price, 2)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Modal onClose={() => handleClickClose()} show={show}>
                  <Carousel
                    autoPlay={false}
                    animation="slide"
                    swipe={true}
                    navButtonsAlwaysVisible={true}
                    navButtonsProps={{
                      style: {
                        width: "1em",
                        height: "1em",
                      },
                    }}
                    indicatorIconButtonProps={{
                      style: {
                        "&:hover": {
                          "& $button": {
                            backgroundColor: "#10B7EC",
                            filter: "brightness(120%)",
                            opacity: "0.4",
                          },
                        },
                        width: "15px",
                        height: "15px",
                        margin: "auto 4px",
                      },
                    }}
                    activeIndicatorIconButtonProps={{
                      style: {
                        color: "white",
                        border: "1px solid grey",
                        padding: "0",
                      },
                    }}
                    indicatorContainerProps={{
                      style: { bottom: "10px", position: "absolute" },
                    }}
                  >
                    {result?.imageUrls?.map((url) => (
                      <AspectRatio
                        ratio="4/3"
                        style={{
                          width: !isMobile ? "550px" : "239px",
                          height: !isMobile ? "400px" : "170px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={url?.path}
                          style={{
                            borderRadius: "8px",
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                          alt="car"
                          key={`${url?.id}${url?.path}`}
                        />
                      </AspectRatio>
                    ))}
                  </Carousel>
                </Modal>
                {Object.keys(cars).length === 0 && (
                  <div
                    style={{
                      color: fontColor,
                    }}
                  >
                    No cars
                  </div>
                )}
              </div>
            </div>
            <div
              className={styles.fleetButtonGroupForPositioning}
              style={{ background: ThemeProviderAppBackgroundColor }}
            >
              <div className={styles.fleetButtonGroupBlockContainer}>
                <button
                  onClick={() => {
                    back()
                    setGateMeetingRedux(false)
                    setResetWidgetInputs(false)
                    setIsAirportPickupIncluded(false)
                  }}
                  className={styles.buttonBackSelf}
                  style={{
                    background: backAndNextButtonsColor,
                    color: fontColor,
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    next()
                    setCarId(carCard)
                  }}
                  disabled={carCard ? false : true}
                  className={styles.buttonNextSelf}
                  style={{
                    opacity: carCard ? "1" : "0.5",
                    background: backAndNextButtonsColor,
                    color: fontColor,
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  return <>{isFetching ? <Preloader /> : ifThereisError()}</>
}

const FleetFormUIComponent = React.memo(FleetForm)

export default FleetFormUIComponent
