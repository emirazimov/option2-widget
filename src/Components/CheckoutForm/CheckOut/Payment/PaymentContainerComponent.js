import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { FormProvider, useForm } from "react-hook-form"
// import {
//   CustomFormInput,
//   CustomFormInputForPayment,
//   CustomMaskInput,
// } from "../CustomFormInput/CustomFormInput"
// import { makeStyles } from "@material-ui/core/styles"
// import { BackArrowIcon } from "../../../../assets/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
// import Autocomplete from "@material-ui/lab/Autocomplete"
// import Button from "@material-ui/core/Button"
// import Checkbox from "@material-ui/core/Checkbox"
// import Switch from "@material-ui/core/Switch"
// import { Link } from "@material-ui/core"
import { placesApi } from "../../../../api/api"
// import TextField from "@material-ui/core/TextField"
import {
  // createReservation,
  setPaymentForm,
} from "../../../../Redux/form-reducer"
// import PrivacyPolicy from "../../../TermsOfUse/PrivacyPolicy/PrivacyPolicy"
// // import TermsOfUse from "../../../TermsOfUse/TermOfUse/TermOfUse"
// import { withStyles } from "@material-ui/styles"
// import { Number, Cvc, Expiration } from "react-credit-card-primitives"

// import Cleave from "cleave.js/react"
import "./PaymentStyles.css"
// import { AntSwitch } from "../AdressForm/AdressFormStyles"
import PaymentUIComponent from "./PaymentUIComponent"

const PaymentContainerComponent = ({
  next,
  back,
  total,
  formSummary,
  setPaymentForm,
  cars,
  formData,
  carId,
  hourlyAndSeatsRedux,
  gateMeeting,
}) => {
  const SignupSchema = yup.object().shape({
    // greetClientInfo: yup.object().shape({
    //     firstName: yup.string().required('Required'),
    //     phoneNumber: yup.number('Not a number').required('Required'),
    //     lastName: yup.string().required('Required'),
    //     email: yup.string().email('invalid email').required('Required'),
    // }),
    client: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      address: yup.string().required("Required"),
      zip: yup.number().required("Required").typeError("Not a number"),
      email: yup.string().email("invalid email").required("Required"),
      phoneNumber: yup.number().required("Required").typeError("Not a number"),
    }),
    paymentInfo: yup.object().shape({
      // cardNumber: yup.string().required("Required"),
      month: yup.string().required("Required"),
      cvc: yup.number().required("Required").typeError("Not a number"),
    }),
  })
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [statesId, setStatesId] = useState(0)
  const [citiesId, setCitiesId] = useState(0)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let componentMounted = true
    const fetchStates = async () => {
      const data = await placesApi.getStates()
      if (componentMounted) {
        setStates(data)
      }
    }
    fetchStates()
    return () => {
      componentMounted = false
    }
  }, [])

  useEffect(() => {
    let componentMounted = true
    const fetchCities = async (id) => {
      const data = await placesApi.getCities(id)
      if (componentMounted) {
        setCities(data)
      }
    }
    statesId ? fetchCities(statesId) : setCities([])
    return () => {
      componentMounted = false
    }
  }, [statesId])

  const {
    register,
    handleSubmit,
    formState: { errors },
    ...methods
  } = useForm({
    resolver: yupResolver(SignupSchema),
  })

  const [riderDetails, setRiderDetails] = React.useState(true)

  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px transparent inset",
    height: "0px",
    // width: "100%",
  }

  const [statesIdError, setStatesIdError] = React.useState(null)
  const [citiesIdError, setCitiesIdError] = React.useState(null)
  const [cardForPaymentSubmit, setCardForPaymentSubmit] = useState(null)
  const [cardForPaymentSubmitError, setCardForPaymentSubmitError] =
    useState(null)
  const [restrictAmex, setRestrictAmex] = React.useState(false)

  const onSubmit = (data) => {
    console.log(data)
    // event.preventDefault()

    const date = data.paymentInfo.month.split("/")
    if ((statesId, citiesId, cardForPaymentSubmit)) {
      setPaymentForm(
        { ...data },
        citiesId,
        statesId,
        date,
        cardForPaymentSubmit
      )
      next()
    } else {
      if (!statesId) {
        setStatesIdError(true)
      } else {
        setStatesIdError(false)
      }
      if (!citiesId) {
        setCitiesIdError(true)
      } else {
        setCitiesIdError(false)
      }
      if (!cardForPaymentSubmitError) {
        setCardForPaymentSubmitError(true)
      } else {
        setCardForPaymentSubmitError(false)
      }
    }
  }

  // const toggleAmex = () => setRestrictAmex(!restrictAmex)

  // This section for Preview Component

  const [carModal, setCarModal] = React.useState(null)
  const selectedCar = cars.find((car) => car.id === carId)
  const [distance, setDistance] = React.useState(0)
  const [show, setShow] = React.useState(false)
  const handleClickOpen = (id) => {
    setCarModal(true)
    setShow(true)
  }

  const handleClickClose = () => {
    setCarModal(null)
    setShow(false)
  }
  const round = (n, dp) => {
    const h = +"1".padEnd(dp + 1, "0") // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
  }

  const showCarAmount = () => {
    if (selectedCar.boosterSeatPrice || selectedCar.safetySeatPrice) {
      return `$${round(
        selectedCar.price -
          selectedCar.boosterSeatPrice -
          selectedCar.safetySeatPrice,
        2
      )}`
    } else {
      return `$${round(selectedCar.price, 2)} `
    }
  }

  // The end of the section

  const [cardType, setCardType] = useState("")

  const [creditCardNum, setCreditCardNum] = useState("#### #### #### ####")

  const handleNum = (e) => {
    setCreditCardNum(e.target.rawValue)
    setCardForPaymentSubmit(e.target.value)
    console.log(e.target.value)
    // console.log(e.target.value);
  }

  const handleType = (type) => {
    setCardType(type)
    console.log(type)
  }

  const [stateName, setStateName] = useState("")
  const [cityName, setCityName] = useState("")

  const extractStateId = (name) => {
    setStateName(name)
    const res = states.find((element, index, array) => {
      return element.name == name
    })
    res ? setStatesId(res.id) : setStatesId(null)
    console.log(res)
  }
  const extractCityId = (name) => {
    setCityName(name)
    const res = cities.find((element, index, array) => {
      return element.name == name
    })
    res ? setCitiesId(res.id) : setCitiesId(null)
    console.log(res)
  }

  return (
    <PaymentUIComponent
      next={next}
      back={back}
      total={total}
      formSummary={formSummary}
      setPaymentForm={setPaymentForm}
      SignupSchema={SignupSchema}
      states={states}
      setStates={setStates}
      cities={cities}
      setCities={setCities}
      statesId={statesId}
      setStatesId={setStatesId}
      citiesId={citiesId}
      setCitiesId={setCitiesId}
      checked={checked}
      setChecked={setChecked}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      methods={methods}
      riderDetails={riderDetails}
      setRiderDetails={setRiderDetails}
      statesIdError={statesIdError}
      setStatesIdError={setStatesIdError}
      citiesIdError={citiesIdError}
      setCitiesIdError={setCitiesIdError}
      cardForPaymentSubmit={cardForPaymentSubmit}
      setCardForPaymentSubmit={setCardForPaymentSubmit}
      cardForPaymentSubmitError={cardForPaymentSubmitError}
      setCardForPaymentSubmitError={setCardForPaymentSubmitError}
      restrictAmex={restrictAmex}
      setRestrictAmex={setRestrictAmex}
      onSubmit={onSubmit}
      cardType={cardType}
      setCardType={setCardType}
      creditCardNum={creditCardNum}
      setCreditCardNum={setCreditCardNum}
      handleNum={handleNum}
      handleType={handleType}
      extractStateId={extractStateId}
      extractCityId={extractCityId}
      stateName={stateName}
      cityName={cityName}
      formData={formData}
      hourlyAndSeatsRedux={hourlyAndSeatsRedux}
      gateMeeting={gateMeeting}
      selectedCar={selectedCar}
      distance={distance}
      handleClickOpen={handleClickOpen}
      handleClickClose={handleClickClose}
      round={round}
      showCarAmount={showCarAmount}
      show={show}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    total: state.formData.orderSum,
    formSummary: state.formData,
    cars: state.cars.cars,
    formData: state.formData,
    carId: state.formData.carInfo.id,
    hourlyAndSeatsRedux: state.hourlyAndSeatsRedux.hourlyRedux,
    gateMeeting: state.gateMeeting.isGateMeeting,
  }
}

export default connect(mapStateToProps, { setPaymentForm })(
  PaymentContainerComponent
)
