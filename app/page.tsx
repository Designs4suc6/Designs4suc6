import Banner from "./components/Banner";
import Features from "./components/Work";
import Expert from "./components/Expert";
import Newsletter from "./components/Newsletter/Newsletter";

export default function Home() {
  return (
    <main>
      {/* Banner section */}
      <Banner />

      {/* Work / Features section */}
      <Features />

      {/* Optional Expert section (currently disabled) */}
      {/* <Expert /> */}

      {/* Newsletter or contact footer section */}
      <Newsletter />
    </main>
  );
}
