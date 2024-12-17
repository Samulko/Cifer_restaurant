import ImageScroll from '../components/ImageScroll';
import SmoothScroll from '../components/SmoothScroll';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <SmoothScroll>
        <section className="smooth-scroll-section">
          <div className="overlay-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Welcome to Cifer
          </div>
          <ImageScroll src="/images/hero.jpg" alt="Cifer Restaurant Hero" />
        </section>

        <section className="smooth-scroll-section">
          <div className="overlay-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Fine Dining Experience
          </div>
          <ImageScroll src="/images/dining.jpg" alt="Dining Experience" />
        </section>

        <section className="smooth-scroll-section">
          <div className="overlay-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Culinary Excellence
          </div>
          <ImageScroll src="/images/food.jpg" alt="Culinary Dishes" />
        </section>
      </SmoothScroll>
    </main>
  );
}
