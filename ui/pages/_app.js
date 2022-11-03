import React from 'react'
import MyNavbar from '../component/navbar'
import "../public/styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <MyNavbar />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
