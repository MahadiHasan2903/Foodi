import Categories from "@/lib/components/Home/Categories";
import Banner from "@/lib/components/Hero/Banner";
import Testimonials from "@/lib/components/Home/Testimonials";
import OurServices from "@/lib/components/Home/OurServices";
import Reviews from "@/lib/components/Home/Reviews";
import SpecialDishes from "@/lib/components/Home/SpecialDishes";
import api from "@/lib/api";

const Home = async () => {
  const foodItems = await api.foodItems.getAllfoodItems();
  return (
    <div className="relative">
      <Banner />
      <Categories />
      <SpecialDishes foodItems={foodItems} />
      <Testimonials />
      <OurServices />
      <Reviews />
    </div>
  );
};

export default Home;
