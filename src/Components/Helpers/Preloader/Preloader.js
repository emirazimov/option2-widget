// import { CircularProgress } from "@material-ui/core"
import React, { useContext } from "react"
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import styles from "./Preloader.module.scss"
import ThemeContext from "../../../context"

// const theme = createMuiTheme({
//   palette: {
//     secondary: {
//       main: "#4F4F4F",
//     },
//   },
// })

export const Preloader = () => {
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
  } = useContext(ThemeContext)

  return (
    <div
      // style={{
      //   margin: "0 auto",
      //   width: "100%",
      //   height: "90%",
      //   display: "flex",
      //   flexDirection: "row ",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   backgroundColor: "black",
      //   // marginTop: "40px",
      // }}
      class={styles.loaderContainer}
      style={{ background: ThemeProviderAppBackgroundColor }}
    >
      <div class={styles.loader}></div>
    </div>
  )
}

//#region styled-components

// const Container = styled.div`
//     margin: 0 auto;
//     width: 100%;
//     /* @media (max-width: 500px) {
//         width: 94%;
//     } */
// `;
