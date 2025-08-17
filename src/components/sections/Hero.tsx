import { ArrowDown, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import fernaStereoPhoto from '@/assets/me-TO-r.jpg';
import heroBg from '@/assets/hero-bg.jpg';
import linkedinIcon from '@/assets/linkedin-icon.svg';
import githubIcon from '@/assets/github-icon.svg';
import upworkIcon from '@/assets/upwork.png';
import downloadIcon from '@/assets/downloads.png';

export const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='hero'
      className='py-16 md:py-0 min-h-screen flex items-center justify-center relative overflow-hidden'
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
      {/* Overlay */}
      <div className='absolute inset-0 bg-white/70 dark:bg-black/80'></div>

      <div className='container-custom relative z-10'>
        <div className='grid lg:grid-cols-2 gap-8 md:gap-12 items-center'>
          <motion.div
            className='text-center lg:text-left'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <motion.p
              className='text-xl text-muted-foreground mb-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}>
              {t('hero.greeting')}
            </motion.p>
            <motion.h1
              className='text-4xl md:text-6xl font-bold mb-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}>
              <span className='text-gradient'>Fernando Cueto</span>
            </motion.h1>
            <motion.h2
              className='text-2xl md:text-3xl font-semibold text-foreground/90 mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}>
              {t('hero.role')}
            </motion.h2>
            <motion.p
              className='text-lg text-muted-foreground mb-8 max-w-xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}>
              {t('hero.description')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 mb-6 md:mb-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}>
              <Button
                size='lg'
                className='bg-gradient-primary hover:opacity-90 transition-all duration-300 glow-effect'
                onClick={() => scrollToSection('#projects')}>
                {t('hero.viewProjects')}
                <ArrowDown className='ml-2 h-4 w-4' />
              </Button>

              <Button
                size='lg'
                className='text-primary bg-primary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300'
                onClick={() => scrollToSection('#contact')}>
                {t('hero.getInTouch')}
                <Mail className='ml-2 h-4 w-4' />
              </Button>
            </motion.div>

            <motion.div
              className='flex justify-center lg:justify-start space-x-4 gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}>
              <a
                className='px-3 py-3 rounded-full hover:scale-105 hover:bg-primary/30 hover:shadow-md transition-all duration-300'
                title='LinkedIn'
                href='https://www.linkedin.com/in/fernando-cueto/'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src={linkedinIcon}
                  alt='LinkedIn'
                  className='h-6 w-6'
                />
              </a>
              <a
                className='px-3 py-3 rounded-full hover:scale-105 hover:bg-primary/30 hover:shadow-md transition-all duration-300'
                title='GitHub'
                href='https://www.github.com/fernastereo'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src={githubIcon}
                  alt='LinkedIn'
                  className='h-6 w-6'
                />
              </a>
              <a
                className='px-3 py-3 rounded-full hover:scale-105 hover:bg-primary/30 hover:shadow-md transition-all duration-300'
                title='Upwork'
                href='https://www.upwork.com/freelancers/~017634675ca5b18ef3'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src={upworkIcon}
                  alt='LinkedIn'
                  className='h-6 w-6'
                />
              </a>
              <a
                className='px-3 py-3 rounded-full hover:scale-105 hover:bg-primary/30 hover:shadow-md transition-all duration-300'
                title='Download Resume'
                href='https://fernandocueto.com/fernandocueto.pdf'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  src={downloadIcon}
                  alt='LinkedIn'
                  className='h-6 w-6'
                />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className='flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <motion.div
              className='relative'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}>
              <div className='w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-custom-lg'>
                <img
                  src={fernaStereoPhoto}
                  alt='Fernando Cueto - Full Stack Developer'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-pulse'></div>
              <div
                className='absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-full opacity-30 animate-pulse'
                style={{ animationDelay: '1s' }}></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className='hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}>
        <motion.div
          className='w-6 h-10 border-2 border-primary rounded-full flex justify-center'
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>
          <motion.div
            className='w-1 h-2 bg-primary rounded-full mt-2'
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
