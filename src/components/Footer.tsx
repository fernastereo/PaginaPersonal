import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:alex@example.com", label: "Email" }
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
            <h3 className="text-xl font-bold text-gradient mb-2">Fernando Cueto</h3>
            <p className="text-muted-foreground text-sm">
              {t('footer.passionate')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10 transition-colors"
                asChild
              >
                <a 
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              </Button>
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
              © 2025 {t('footer.madeWith')} <Heart className="h-4 w-4 mx-1 text-red-500" /> {t('footer.madeBy')} Fernando Cueto
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};