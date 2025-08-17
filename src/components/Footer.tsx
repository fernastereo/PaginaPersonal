import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import linkedinIcon from '@/assets/linkedin-icon.svg';
import githubIcon from '@/assets/github-icon.svg';
import upworkIcon from '@/assets/upwork.png';

export const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: linkedinIcon,
      href: 'https://www.linkedin.com/in/fernando-cueto/',
      label: 'LinkedIn',
    },
    {
      icon: githubIcon,
      href: 'https://www.github.com/fernastereo',
      label: 'GitHub',
    },
    {
      icon: upworkIcon,
      href: 'https://www.upwork.com/freelancers/~017634675ca5b18ef3',
      label: 'Upwork',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">
              Fernando Cueto
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('footer.passionate')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                className="px-3 py-3 rounded-full hover:scale-105 hover:bg-primary/30 hover:shadow-md transition-all duration-300"
                title={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={social.icon} alt={social.label} className="h-6 w-6" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <Button
              variant="ghost"
              onClick={scrollToTop}
              className="text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
            >
              ↑ {t('footer.scrollTop')}
            </Button>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-end">
              © 2025 {t('footer.madeWith')}{' '}
              <Heart className="h-4 w-4 mx-1 text-red-500" />{' '}
              {t('footer.madeBy')} Fernando Cueto
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
