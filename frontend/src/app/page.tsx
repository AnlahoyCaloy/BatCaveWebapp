// import RandomNumber from "../components/RandomNumber";
import Link from "next/link";
import CarouselContainer from "../components/Carousel/CarouselContainer";
import NewBrewsSection from "../components/NewBrewsComp/NewBrewsSection";
import HomeSearch from "../components/SearchBar/HomeSearch";
import Section from "../components/Section";
import Footer from "../components/Footer/Footer";
import { Variants } from "motion";
import HomePage from "../components/Home/HomePage";

   //  animation variants
 const animationVariant : Variants = {
    hidden : {
      y : -200, opacity : 0
    },
    scrollView : {
      y : 0, opacity : 1,
      transition : { duration : 0.8 , ease : "easeInOut" }
    }
  }

  
export default function Home() {

  return (
    <div className="home flex justify-center items-center w-full flex-col gap-4"> 
      <HomePage />

      {/* 2nd section */}
      <Section isAnimated={true} animationVariant={animationVariant} color="var(--color-silk-cream)" 
        style={{
          fontFamily: "var(--font-Cinzel)",
          alignItems: "center",
          gap: "60px",
        }} className="mask-div">

        <NewBrewsSection />

        <Link href={"/menu"}><h1 className="text-[35px]" style={{ color : "var(--color-coffee-medium)" }}>See all Drinks</h1></Link>
      </Section>
    </div>
  )
}
