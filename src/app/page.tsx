import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HomeActivity } from "@/components/home/HomeActivity";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProjects />
      <HomeActivity />
    </>
  );
}
