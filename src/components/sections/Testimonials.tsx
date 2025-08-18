import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Quote } from 'lucide-react';
import testimonials from './data/testimonials.json';

export const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="section-padding bg-secondary/50">
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

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent className="px-3">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/3 py-6">
                  <Card className="h-full hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-2 card-gradient relative">
                    <CardContent className="px-6 py-1">
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
                      <a
                        href={testimonial.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-muted-foreground mb-6 leading-relaxed text-center italic">
                          "{testimonial.text}"
                        </p>
                      </a>

                      {/* Author Info */}
                      <div className="flex items-center justify-center">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};