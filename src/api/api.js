import * as axios from "axios"

const jwtToken = localStorage.getItem("Authorization")

console.log(window)

const accessKeyFromWinow = window.accessKeyForBookinglane

const axiosInstance = axios.create({
  baseURL: `https://api.bookinglane.com/api/`,
  headers: {
    "App-Version": "1.2.36",
  },
})

export const authApi = {
  getToken() {
    // const company0Key = '14862f6b-0e7a-47d0-810a-06a348fd9ec1'
    // return axios
    //   .post(
    //     'https://api.bookinglane.com/api/companywidget/company-widget-auth',
    //     {
    //       accessKey: 'bdbfac5b-4b1a-4109-8ab5-01cabebe26e3',
    //     }
    //   )
    //   .then((response) => {
    //     return response
    //   })
  },

  getCompanyProfile() {
    const headers = {
      "App-Version": "1.2.36",
    }
    const friendlyKey = window.location.pathname
    return axiosInstance
      .get(`widget/company-profile${friendlyKey}`, {
        headers: headers,
      })
      .then((response) => {
        window.localStorage.setItem("Authorization", response.data.accessKey)
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response.status
        }
      })
  },
}

export const fleetApi = {
  // getCarsByType(carType, pageSize) {
  //   return axiosInstance
  //     .get(`car/company-cars?typeId=${carType}&page=${pageSize}`)
  //     .then((response) => {
  //       return response.data
  //     })
  // },

  // getCompanyCars(dataForm) {
  //   const accessKey = localStorage.getItem("Authorization")
  //   return axiosInstance
  //     .post(
  //       `widget/cars-with-price/${accessKey}`,
  //       { ...dataForm },
  //       {
  //         headers: {
  //           "App-Version": "1.2.29",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data)
  //       return response
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         return error.response
  //       }
  //     })
  // },
  getCompanyCarsWithRecaptchaToken(dataForm) {
    const accessKey = localStorage.getItem("Authorization")
    const recaptchaToken = localStorage.getItem("captcha")
    return axiosInstance
      .post(
        `widget/cars-with-price/${accessKey}`,
        { ...dataForm },
        {
          headers: {
            "App-Version": "1.2.36",
            captcha: `${recaptchaToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      })
  },
}

export const placesApi = {
  getStates() {
    return axiosInstance.get(`place/states`).then((response) => {
      return response.data
    })
  },

  getCities(id) {
    return axiosInstance.get(`place/cities/${id}`).then((response) => {
      return response.data
    })
  },

  getAirlines() {
    return axiosInstance.get(`place/airlines`).then((response) => {
      return response.data
    })
  },
}

export const formApi = {
  createReservation(form) {
    const accessKey = localStorage.getItem("Authorization")
    return axiosInstance
      .post(
        `reservation/web/${accessKey}`,
        { ...form },
        {
          headers: {
            "App-Version": "1.2.36",
          },
        }
      )
      .then((response) => {
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      })
  },
}

// export const termsApi = {
//   getTermOfUse() {
//     return axiosInstance.get(`home/term-of-use`).then((response) => {
//       return response.data
//     })
//   },
//   getPrivacyPolicy() {
//     return axiosInstance.get(`home/privacy-policy`).then((response) => {
//       return response.data
//     })
//   },
// }
