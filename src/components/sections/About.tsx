import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, Code } from 'lucide-react';
import { CardAbout } from '../custom-ui/CardAbout';

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Code,
      value: '30+',
      label: t('about.stats.projects'),
    },
    {
      icon: Users,
      value: '20+',
      label: t('about.stats.clients'),
    },
    {
      icon: Calendar,
      value: '10+',
      label: t('about.stats.experience'),
    },
    {
      icon: Award,
      value: '20+',
      label: t('about.stats.technologies'),
    },
  ];

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
              <Trans
                i18nKey="about.description1"
                components={{
                  bold: <span className="font-semibold" />,
                }}
              />
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              {t('about.description2')}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <CardAbout
                key={index}
                index={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
