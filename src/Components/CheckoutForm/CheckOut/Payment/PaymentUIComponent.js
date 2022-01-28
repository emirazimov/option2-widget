import React, { useState, useEffect, useContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CustomMaskInput } from "../CustomFormInput/CustomFormInput"
import styled from "styled-components"
import PrivacyPolicy from "../../../TermsOfUse/PrivacyPolicy/PrivacyPolicy"
import TermsOfUse from "../../../TermsOfUse/TermOfUse/TermOfUse"
import Cleave from "cleave.js/react"
import "./PaymentStyles.css"
import styles from "./Payment.module.scss"
import { Switch } from "../../../Helpers/Switch/Switch"
import ThemeContext from "../../../../context"
import Autocomplete from "@mui/material/Autocomplete"

const PaymentUIComponent = ({
  next,
  back,
  total,
  formSummary,
  setPaymentForm,
  SignupSchema,
  states,
  setStates,
  cities,
  setCities,
  statesId,
  setStatesId,
  citiesId,
  setCitiesId,
  checked,
  setChecked,
  register,
  handleSubmit,
  formState,
  errors,
  methods,
  riderDetails,
  setRiderDetails,
  statesIdError,
  setStatesIdError,
  citiesIdError,
  setCitiesIdError,
  cardForPaymentSubmit,
  setCardForPaymentSubmit,
  cardForPaymentSubmitError,
  setCardForPaymentSubmitError,
  restrictAmex,
  setRestrictAmex,
  onSubmit,
  cardType,
  setCardType,
  creditCardNum,
  setCreditCardNum,
  handleNum,
  handleType,
  extractStateId,
  extractCityId,
  stateName,
  cityName,
}) => {
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px transparent inset",
    height: "0px",
  }

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
    inputsBackground,
  } = useContext(ThemeContext)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formWrapper}
        style={{ background: ThemeProviderAppBackgroundColor }}
      >
        <div className={styles.paymentWrapper}>
          <div className={styles.paymentContainer}>
            <div className={styles.paymentTitleContainer}>
              <span
                className={styles.paymentTitleSelf}
                style={{ color: fontColor }}
              >
                Payment
              </span>
            </div>
            <div className={styles.isPassengerCardholderContainer}>
              <div className={styles.isPassengerCardholderTitleContainer}>
                <span
                  className={
                    riderDetails
                      ? styles.isPassengerCardholderTitleWhiteSelf
                      : styles.isPassengerCardholderTitleGreySelf
                  }
                  style={{
                    color: fontColor,
                    opacity: riderDetails ? "1" : "0.3",
                  }}
                >
                  Is passenger a cardholder?
                </span>
              </div>
              <div className={styles.isPassengerCardholderSwitchContainer}>
                <Switch
                  checked={riderDetails}
                  onClick={() => setRiderDetails(!riderDetails)}
                  numberToIdentify={4}
                />
              </div>
            </div>
            {!riderDetails && (
              <div className={styles.passengerDetailWrapper}>
                <div className={styles.passengerDetailTitleContainer}>
                  <span
                    className={styles.passengerDetailTitleSelf}
                    style={{ color: fontColor }}
                  >
                    Passenger Detail
                  </span>
                </div>
                <div className={styles.cardholderInformationInputsWrapper}>
                  <div
                    className={
                      styles.cardholderInformationInputSelfContainerJustForFirstAndLastName
                    }
                  >
                    <input
                      name="greetClientInfo.firstName"
                      autoComplete="off"
                      placeholder="First Name"
                      defaultValue={formSummary.greetClientInfo.firstName}
                      className={styles.cardholderInformationInputSelfFirstName}
                      style={{
                        color: inputsFontColor,
                        border: `1px solid ${borderColorForInnerElements}`,
                        background: inputsBackground,
                      }}
                      ref={register}
                    />
                  </div>
                  <div
                    className={styles.cardholderInformationInputSelfContainer2}
                  >
                    <input
                      name="greetClientInfo.lastName"
                      autoComplete="off"
                      defaultValue={formSummary.greetClientInfo.lastName}
                      placeholder="Last Name"
                      className={styles.cardholderInformationInputSelfLastName}
                      style={{
                        color: inputsFontColor,
                        border: `1px solid ${borderColorForInnerElements}`,
                        background: inputsBackground,
                      }}
                      ref={register}
                    />
                  </div>
                </div>
                <div className={styles.cardholderInformationInputsWrapper}>
                  <div
                    className={styles.cardholderInformationInputSelfContainer1}
                  >
                    <input
                      name="greetClientInfo.email"
                      autoComplete="off"
                      placeholder="Email"
                      defaultValue={formSummary.greetClientInfo.email}
                      className={styles.cardholderInformationInputSelf}
                      style={{
                        color: inputsFontColor,
                        border: `1px solid ${borderColorForInnerElements}`,
                        background: inputsBackground,
                      }}
                      ref={register}
                    />
                  </div>
                  <div
                    className={styles.cardholderInformationInputSelfContainer2}
                  >
                    <input
                      name="greetClientInfo.phoneNumber"
                      autoComplete="off"
                      defaultValue={formSummary.greetClientInfo.phoneNumber}
                      placeholder="Phone Number"
                      className={styles.cardholderInformationInputSelf}
                      style={{
                        color: inputsFontColor,
                        border: `1px solid ${borderColorForInnerElements}`,
                        background: inputsBackground,
                      }}
                      ref={register}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className={styles.cardholderInformationWrapper}>
              <div className={styles.cardholderInformationTitleContainer}>
                <span
                  className={styles.cardholderInformationTitleSelf}
                  style={{ color: fontColor }}
                >
                  Cardholder Information
                </span>
              </div>
              <div className={styles.cardholderInformationInputsWrapper}>
                <div
                  className={styles.cardholderInformationInputSelfContainer}
                  style={{ width: "50%" }}
                >
                  <div
                    className={
                      styles.cardholderInformationInputSelfContainerJustForFirstAndLastName
                    }
                    style={{ width: "100%" }}
                  >
                    <input
                      name="client.firstName"
                      autoComplete="off"
                      defaultValue={formSummary.client.firstName}
                      placeholder="First Name"
                      error={errors.client?.firstName ? true : false}
                      className={styles.cardholderInformationInputSelfFirstName}
                      ref={register}
                      style={{
                        width: "100%",
                        color: inputsFontColor,
                        border: `1px solid ${borderColorForInnerElements}`,
                        background: inputsBackground,
                      }}
                    />
                  </div>
                  {errors.client?.firstName && (
                    <p className={styles.errorInputs}>
                      {errors.client?.firstName.message}
                    </p>
                  )}
                </div>
                <div
                  className={styles.cardholderInformationInputSelfContainer}
                  style={{ width: "50%" }}
                >
                  <input
                    name="client.lastName"
                    autoComplete="off"
                    placeholder="Last Name"
                    defaultValue={formSummary.client.lastName}
                    error={errors.client?.lastName ? true : false}
                    className={styles.cardholderInformationInputSelfLastName}
                    ref={register}
                    style={{
                      width: "100%",
                      color: inputsFontColor,
                      border: `1px solid ${borderColorForInnerElements}`,
                      background: inputsBackground,
                    }}
                  />
                  {errors.client?.lastName && (
                    <p className={styles.errorInputs}>
                      {errors.client?.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.cardholderInformationInputsWrapper}>
                <div
                  className={styles.cardholderInformationInputSelfContainer1}
                >
                  <input
                    name="client.email"
                    autoComplete="off"
                    placeholder="Email"
                    defaultValue={formSummary.client.email}
                    error={errors.client?.email ? true : false}
                    className={styles.cardholderInformationInputSelf}
                    style={{
                      color: inputsFontColor,
                      border: `1px solid ${borderColorForInnerElements}`,
                      background: inputsBackground,
                    }}
                    ref={register}
                  />
                  {errors.client?.email && (
                    <p className={styles.errorInputs}>
                      {errors.client?.email.message}
                    </p>
                  )}
                </div>
                <div
                  className={styles.cardholderInformationInputSelfContainer2}
                >
                  <input
                    name="client.phoneNumber"
                    autoComplete="off"
                    defaultValue={formSummary.client.phoneNumber}
                    placeholder="Phone Number"
                    error={errors.client?.phoneNumber ? true : false}
                    className={styles.cardholderInformationInputSelf}
                    style={{
                      color: inputsFontColor,
                      border: `1px solid ${borderColorForInnerElements}`,
                      background: inputsBackground,
                    }}
                    ref={register}
                  />
                  {errors.client?.phoneNumber && (
                    <p className={styles.errorInputs}>
                      {errors.client?.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.cardholderInformationInputsWrapper}>
                <div
                  className={
                    styles.cardholderInformationInputsContainerForPositionErrorMessage
                  }
                >
                  <input
                    name="client.address"
                    autoComplete="off"
                    placeholder="Address"
                    defaultValue={formSummary.client.address}
                    ref={register}
                    error={errors.client?.address ? true : false}
                    className={
                      styles.cardholderInformationInputWithFullWidthSelf
                    }
                    style={{
                      width: "100%",
                      paddingRight: "0",
                      color: inputsFontColor,
                      border: `1px solid ${borderColorForInnerElements}`,
                      background: inputsBackground,
                    }}
                  />
                  {errors.client?.address && (
                    <p className={styles.errorInputs}>
                      {errors.client?.address.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.cardholderInformationInputsWrapper}>
                <div
                  className={
                    styles.cardholderInformationInputsContainerForPositionErrorMessageState
                  }
                  style={{ color: inputsFontColor }}
                >
                  <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                      console.log(newValue)
                      newValue ? extractStateId(newValue) : setStatesId(null)
                    }}
                    options={states.map((state) => state.name)}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <input
                          type="text"
                          {...params.inputProps}
                          placeholder="State"
                          className={
                            styles.cardholderInformationInputWithFullWidthSelfState
                          }
                          style={{
                            width: "100%",
                            paddingRight: "0",
                            color: inputsFontColor,
                            border: `1px solid ${borderColorForInnerElements}`,
                            background: inputsBackground,
                          }}
                        />
                      </div>
                    )}
                  />

                  {statesIdError && (
                    <p className={styles.errorInputs}>Required</p>
                  )}
                </div>
              </div>
              <div className={styles.cardholderInformationInputsWrapper}>
                <div
                  className={
                    styles.cardholderInformationInputSelfContainer1City
                  }
                  style={{ color: inputsFontColor }}
                >
                  <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                      console.log(cities)
                      newValue ? extractCityId(newValue) : setCitiesId(null)
                    }}
                    options={cities.map((city) => city.name)}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <input
                          type="text"
                          {...params.inputProps}
                          className={styles.cardholderInformationInputSelf}
                          placeholder="City"
                          style={{
                            width: "100%",
                            paddingRight: "25px",
                            boxSizing: "border-box",
                            color: inputsFontColor,
                            border: `1px solid ${borderColorForInnerElements}`,
                            background: inputsBackground,
                          }}
                        />
                      </div>
                    )}
                  />

                  {citiesIdError && (
                    <p className={styles.errorInputs}>Required</p>
                  )}
                </div>
                <div
                  className={styles.cardholderInformationInputSelfContainer2}
                >
                  <input
                    name="client.zip"
                    autoComplete="off"
                    placeholder="ZIP"
                    ref={register}
                    defaultValue={formSummary.client.zip}
                    error={errors.client?.address ? true : false}
                    className={styles.cardholderInformationInputSelf}
                    style={{
                      color: inputsFontColor,
                      border: `1px solid ${borderColorForInnerElements}`,
                      background: inputsBackground,
                    }}
                  />
                  {errors.client?.zip && (
                    <p className={styles.errorInputs}>
                      {errors.client?.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.cardInformationWrapper}>
              <div className={styles.cardInformationTitleContainer}>
                <span
                  className={styles.cardInformationTitleSelf}
                  style={{ color: fontColor }}
                >
                  Card information
                </span>
              </div>
              <div className={styles.cardholderInformationInputsWrapper}>
                <div
                  className={
                    styles.cardholderInformationInputsContainerForPositionErrorMessage
                  }
                >
                  <Cleave
                    delimiter="-"
                    options={{
                      creditCard: true,
                      onCreditCardTypeChanged: handleType,
                    }}
                    name="paymentInfo.cardNumber"
                    error={errors.paymentInfo?.cardNumber ? true : false}
                    onChange={handleNum}
                    placeholder="Card number"
                    className="credit-card-input-by-bookinglane"
                    className={
                      styles.cardholderInformationInputWithFullWidthSelf
                    }
                    style={{
                      color: inputsFontColor,
                      border: `1px solid ${borderColorForInnerElements}`,
                      background: inputsBackground,
                    }}
                  />

                  {cardForPaymentSubmitError && (
                    <p className={styles.errorInputs}>Required</p>
                  )}
                </div>
              </div>
              <div className={styles.cardholderInformationInputsWrapper}>
                <div
                  className={styles.cardholderInformationInputSelfContainer1}
                >
                  <CustomMaskInput
                    name="paymentInfo.month"
                    ref={register}
                    mask="99/99"
                    autoComplete="off"
                    defaultValue={`${formSummary.paymentInfo.month}/${formSummary.paymentInfo.year}`}
                  >
                    {() => (
                      <input
                        placeholder="mm/yy"
                        autoComplete="off"
                        error={errors.paymentInfo?.month ? true : false}
                        className={styles.cardholderInformationInputSelf}
                        style={{
                          color: inputsFontColor,
                          border: `1px solid ${borderColorForInnerElements}`,
                          background: inputsBackground,
                        }}
                      />
                    )}
                  </CustomMaskInput>
                  {errors.paymentInfo?.month && (
                    <p className={styles.errorInputs}>
                      {errors.paymentInfo?.month.message}
                    </p>
                  )}
                </div>
                <div
                  className={styles.cardholderInformationInputSelfContainer2}
                >
                  <CustomMaskInput
                    name="paymentInfo.cvc"
                    ref={register}
                    mask={cardType == "amex" ? "9999" : "999"}
                    autoComplete="off"
                    defaultValue={formSummary.paymentInfo.cvc}
                  >
                    {() => (
                      <input
                        placeholder="CVV/CVC"
                        autoComplete="off"
                        error={errors.paymentInfo?.cvc ? true : false}
                        className={styles.cardholderInformationInputSelf}
                        style={{
                          color: inputsFontColor,
                          border: `1px solid ${borderColorForInnerElements}`,
                          background: inputsBackground,
                        }}
                      />
                    )}
                  </CustomMaskInput>
                  {errors.paymentInfo?.cvc && (
                    <p className={styles.errorInputs}>
                      {errors.paymentInfo?.cvc.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.checkboxWrapper}>
              <CheckboxLabel id="input">
                <CheckboxInput
                  type="checkbox"
                  onClick={() => setChecked(!checked)}
                  htmlFor="input"
                />
                <CheckboxSpan fontColor={fontColor}></CheckboxSpan>
              </CheckboxLabel>
              <TermsOfUse />
              <PrivacyPolicy />
            </div>
            <div className={styles.buttonGroupBlock}>
              <div className={styles.buttonGroupBlockContainer}>
                <button
                  variant="contained"
                  color="primary"
                  onClick={back}
                  className={styles.buttonBackSelf}
                  style={{
                    background: backAndNextButtonsColor,
                    color: fontColor,
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!checked}
                  className={styles.buttonNextSelf}
                  style={{
                    opacity: !checked ? "0.5" : "1",
                    background: backAndNextButtonsColor,
                    color: fontColor,
                  }}
                >
                  Pay ${total}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default PaymentUIComponent

const CheckboxLabel = styled.label`
  position: relative;
  // padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 40px;
  &:hover {
    span {
      -webkit-box-shadow: 0px 0px 5px -1px #ffffff;
      box-shadow: 0px 0px 5px -1px #ffffff;
    }
  }
  input:checked ~ span {
    background-color: transparent;
  }

  input:checked ~ span:after {
    display: block;
  }
`
const CheckboxSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: transparent;
  border: 1px solid ${(props) => props.fontColor};
  border-radius: 5px;
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
  &:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid ${(props) => props.fontColor};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + ${CheckboxSpan} {
    &:after {
      display: block;
    }
  }
  &:checked + ${CheckboxSpan} {
    background-color: transparent;
  }
`
