import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedMenu } from "@/components/home/featured-menu";
import { PizzaCategories } from "@/components/home/pizza-categories";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner Section */}
      <HeroBanner />

      {/* 2. Dynamic Section 1: Featured Menu Items */}
      <FeaturedMenu />

      {/* 3. Dynamic Section 2: Pizza Categories */}
      <PizzaCategories />
    </div>
  );
}
