
// import RandomNumber from "../components/RandomNumber";
import CarouselContainer from "../components/Carousel/CarouselContainer";
import HomeSearch from "../components/SearchBar/HomeSearch";


export default function Home() {

  return (
    <div className="home flex justify-center items-center w-full flex-col gap-4"> 
      <HomeSearch /> 
      <h1 style={{
        fontFamily : 'var(--font-Cinzel)',
        fontSize : '35px'
      }}>Explore Drinks</h1>
      <CarouselContainer />
    </div>
  )
}
