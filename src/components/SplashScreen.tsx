import { useEffect } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit } from 'lucide-react';

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#BCDEEC] flex flex-col items-center justify-center z-[100]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <BrainCircuit className="text-[#BCDEEC] w-14 h-14" />
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tight">A level</h1>
        <p className="text-white/60 mt-2 font-medium text-center">Resources</p>
      </motion.div>
    </motion.div>
  );
};
