import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedMenu } from "@/components/home/featured-menu";
import { PizzaCategories } from "@/components/home/pizza-categories";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HowItWorks } from "@/components/home/how-it-works";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner Section */}
      <HeroBanner />

      {/* 2. Dynamic Section 1: Featured Menu Items */}
      <FeaturedMenu />

      {/* 3. Dynamic Section 2: Pizza Categories Exploration */}
      <PizzaCategories />

      {/* 4. Extra Section 1: Why Choose PizzaHub (Required) */}
      <WhyChooseUs />

      {/* 5. Extra Section 2: How PizzaHub Works (Choice) */}
      <HowItWorks />
    </div>
  );
}
