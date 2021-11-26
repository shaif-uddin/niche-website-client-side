import React from "react";
import Banner from "../Banner/Banner";
import ExploreInHomePage from "../ExploreInHomePage/ExploreInHomePage";
import FAQ from "../FAQ/FAQ";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import OurServices from "../OurServices/OurServices";
import Reviews from "../Reviews/Reviews";
const Home = () => {
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <ExploreInHomePage></ExploreInHomePage>
      {/* <OurServices></OurServices> */}
      <FAQ></FAQ>
      <Reviews></Reviews>
      <Footer></Footer>
    </>
  )
};

export default Home;
