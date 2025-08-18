import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import projects from './data/projects.json';

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-2 card-gradient group overflow-hidden border-gray-200 dark:border-gray-700">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gradient">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t('projects.viewProject')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:text-primary-foreground"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      {t('projects.viewCode')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}