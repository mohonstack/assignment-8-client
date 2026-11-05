import Image from "next/image";
import Banner from "./components/Banner";
import PlatformFeatures from "./components/Platformdetails";
import UpcomingEvents from "./components/UpcomingEvents";
import VisualsStorySection from "./components/VisualsStorySection";
import NewsLetterForm from "./components/NewsLetterForm";

export default function Home() {
  return (
    <div>
      <Banner />
      <PlatformFeatures />
    <UpcomingEvents />
    <VisualsStorySection />
    <NewsLetterForm />
    </div>
  );
}
