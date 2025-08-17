import experience from "./data/experience.json";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import{ Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section
      id='experience'
      className='section-padding'>
      <div className='container-custom'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            {t('experience.title')}
          </h2>
          <p className='text-xl text-muted-foreground'>
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='relative'>
            <div className='absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary'></div>
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className='relative mb-12'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}>
                <div className='absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg'></div>

                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}>
                  <Card className='py-0 hover:shadow-custom-lg transition-all duration-300 card-gradient border-gray-200 dark:border-gray-700'>
                    <CardContent className='p-6'>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                        <Calendar className='h-4 w-4' />
                        <span className='w-24 flex-none'>{exp.period}</span>
                        <MapPin className='h-4 w-4' />
                        <span>{exp.location}</span>
                      </div>
                      <h3 className='text-xl font-semibold text-gradient mb-1'>
                        {exp.position}
                      </h3>
                      <h4 className='text-lg font-medium text-primary mb-4'>
                        {exp.company}
                      </h4>
                      <p className='text-muted-foreground mb-4 leading-relaxed text-sm'>
                        {exp.description}
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className='px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/20 
                                           hover:bg-primary/30 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1
                                           transition-all duration-300 cursor-pointer transform'>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}