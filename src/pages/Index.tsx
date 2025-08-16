import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';

const Index = () => {
  return (
    <div className='min-h-screen bg-background'>
      <NavBar />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
