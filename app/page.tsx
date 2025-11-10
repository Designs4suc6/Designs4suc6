import Banner from './components/Banner/index';
import Features from './components/Work/index';
import Cook from './components/Cook/index';
import Expert from './components/Expert/index';
import Newsletter from './components/Newsletter/Newsletter';

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <div id="about-section">
        <Cook />
      </div>
      {/* <Expert /> */}
      <Newsletter />
    </main>
  );
}
