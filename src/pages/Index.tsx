import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';

const Index = () => {
  return (
    <div className='min-h-screen bg-background'>
      <NavBar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
