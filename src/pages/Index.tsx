import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Services } from '@/components/sections/Services';

const Index = () => {
  return (
    <div className='min-h-screen bg-background'>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
