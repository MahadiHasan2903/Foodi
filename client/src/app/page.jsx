import Categories from "@/lib/components/Home/Categories";
import Banner from "@/lib/components/Hero/Banner";
import Testimonials from "@/lib/components/Home/Testimonials";
import OurServices from "@/lib/components/Home/OurServices";
import Reviews from "@/lib/components/Home/Reviews";
import SpecialDishes from "@/lib/components/Home/SpecialDishes";

const Home = async () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <OurServices />
      <Reviews />
    </div>
  );
};

export default Home;
