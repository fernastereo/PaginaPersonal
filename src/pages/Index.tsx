import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';

const Index = () => {
  return (
    <div className='min-h-screen bg-background'>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
