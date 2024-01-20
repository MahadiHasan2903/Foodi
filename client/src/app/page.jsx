import Categories from "@/lib/components/Home/Categories";
import Banner from "@/lib/components/Hero/Banner";
import Testimonials from "@/lib/components/Home/Testimonials";
import OurServices from "@/lib/components/Home/OurServices";
import Reviews from "@/lib/components/Home/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Testimonials />
      <OurServices />
      <Reviews />
    </div>
  );
};

export default Home;
