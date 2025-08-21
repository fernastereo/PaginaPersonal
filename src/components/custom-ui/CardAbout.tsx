import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export const CardAbout = ({ index, icon: Icon, value, label }: { index: number, icon: LucideIcon, value: string, label: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}>
      <Card className='text-center hover:shadow-lg transition-all duration-300 card-gradient py-0 border-gray-200 dark:border-gray-700'>
        <CardContent className='p-6'>
          <div className='flex justify-center mb-4'>
            <div className='w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center'>
              <Icon className='h-6 w-6 text-white' />
            </div>
          </div>
          <div className='text-3xl font-bold text-gradient mb-2'>
            {value}
          </div>
          <p className='text-sm text-muted-foreground'>
            {label}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}