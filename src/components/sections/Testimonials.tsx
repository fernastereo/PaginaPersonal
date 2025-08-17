import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "María García",
      position: "CEO, StartupTech",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "Fernando delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding. Highly recommended!"
    },
    {
      name: "John Smith",
      position: "CTO, Digital Solutions",
      avatar: "/placeholder.svg", 
      rating: 5,
      text: "Working with Fernando was a pleasure. He built our complex web application on time and within budget. His communication skills and problem-solving abilities are top-notch."
    },
    {
      name: "Laura Martínez",
      position: "Product Manager, InnovateCorp",
      avatar: "/placeholder.svg",
      rating: 5,
      text: "Fernando transformed our outdated website into a modern, responsive platform. The performance improvements were remarkable, and our users love the new interface."
    }
  ];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-2 card-gradient relative">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-6">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Quote className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center mb-4 mt-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className="h-5 w-5 text-yellow-400 fill-current" 
                      />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed text-center italic">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center justify-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-primary/20"
                    />
                    <div className="text-center">
                      <h4 className="font-semibold text-gradient">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position}
                      </p>
                    </div>
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