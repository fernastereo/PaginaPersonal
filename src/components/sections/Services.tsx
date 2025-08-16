import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Server, Layers } from "lucide-react";

export const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Code,
      title: t('services.frontend.title'),
      description: t('services.frontend.description'),
      features: ['React/Vue.js', 'TypeScript', 'Responsive Design', 'Performance Optimization']
    },
    {
      icon: Server,
      title: t('services.backend.title'),
      description: t('services.backend.description'),
      features: ['Node.js/Express', 'Database Design', 'API Development', 'Cloud Deployment']
    },
    {
      icon: Layers,
      title: t('services.fullstack.title'),
      description: t('services.fullstack.description'),
      features: ['End-to-end Development', 'Modern Tech Stack', 'DevOps', 'Maintenance']
    }
  ];

  return (
    <section id="services" className="section-padding bg-secondary/50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-2 card-gradient group border-gray-200 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-gradient">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="text-sm text-foreground/80 flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};