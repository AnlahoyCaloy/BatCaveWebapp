// import RandomNumber from "../components/RandomNumber";
import Link from "next/link";
import CarouselContainer from "../components/Carousel/CarouselContainer";
import NewBrewsSection from "../components/NewBrewsComp/NewBrewsSection";
import HomeSearch from "../components/SearchBar/HomeSearch";
import Section from "../components/Section";
import Footer from "../components/Footer/Footer";

export default function Home() {

  return (
    <div className="home flex justify-center items-center w-full flex-col gap-4"> 
      <Section isAnimated={false} navBarHeight={176} style={{ alignItems : "center", justifyContent : "center"}}> 
        {/* 175 is the height of the navbar */}
        <HomeSearch /> 
          <h1 style={{
            fontFamily : 'var(--font-Cinzel)',
            fontSize : '35px'
          }}>Explore Drinks</h1>
      

        <CarouselContainer />
      </Section>


      {/* 2nd section */}
      <Section isAnimated={true} color="var(--color-silk-cream)" 
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
