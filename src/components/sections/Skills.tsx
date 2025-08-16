import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.frontend'),
      skills: [
        'Javascript',
        'TypeScript', 
        'Vue.js',
        'React',
        'Next.js',
        'Nuxt.js',
        'Tailwind CSS',
        'HTML/CSS'
      ]
    },
    {
      title: t('skills.backend'),
      skills: [
        'PHP',
        'Laravel',
        'Symfony',
        '.NET',
        '.Net Framework',
        'C#',
        'Node.js',
        'Express.js',
        'MySQL',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'API REST',
        'GraphQL',
      ]
    },
    {
      title: t('skills.tools'),
      skills: [
        'Git',
        'Docker',
        'AWS',
        'Azure',
        'Google Cloud',
        'TDD',
        'CI/CD',
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-custom-lg transition-all duration-300 card-gradient border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-center text-xl font-semibold text-gradient">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                        viewport={{ once: true }}
                      >
                        <span className="inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};