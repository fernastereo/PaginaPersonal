import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Award, Users, Calendar, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Code,
      value: "50+",
      label: t('about.stats.projects')
    },
    {
      icon: Users,
      value: "30+",
      label: t('about.stats.clients')
    },
    {
      icon: Calendar,
      value: "10+",
      label: t('about.stats.experience')
    },
    {
      icon: Award,
      value: "15+",
      label: t('about.stats.technologies')
    }
  ]

  return (
    <section
      id='about'
      className='section-padding bg-secondary/50'>
      <div className='container-custom'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            {t('about.title')}
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12 items-center mb-16'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              {t('about.description')}
            </p>
          </motion.div>

          <motion.div
            className='grid grid-cols-2 gap-6'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}>
                <Card className='text-center hover:shadow-lg transition-all duration-300 card-gradient py-0 border-gray-200 dark:border-gray-700'>
                  <CardContent className='p-6'>
                    <div className='flex justify-center mb-4'>
                      <div className='w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center'>
                        <stat.icon className='h6 w-6 text-white' />
                      </div>
                    </div>
                    <div className='text-3xl font-bold text-gradient mb-2'>
                      {stat.value}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}