import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Fullscreen, Maximize, Keyboard } from 'lucide-react';

interface SlideControlsProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onToggleFullscreen: () => void;
}

export const SlideControls = ({ currentSlide, totalSlides, onNext, onPrev, onToggleFullscreen }: SlideControlsProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 glass rounded-full z-50 transition-opacity hover:opacity-100 opacity-30">
      <button 
        onClick={onPrev}
        disabled={currentSlide === 0}
        className="p-2 hover:bg-slate-100 rounded-full disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 font-display text-sm font-medium text-slate-400">
        <span className="text-slate-900">{String(currentSlide + 1).padStart(2, '0')}</span>
        <div className="w-8 h-[1px] bg-slate-200" />
        <span>{String(totalSlides).padStart(2, '0')}</span>
      </div>

      <button 
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="p-2 hover:bg-slate-100 rounded-full disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="w-[1px] h-4 bg-slate-200" />

      <button 
        onClick={onToggleFullscreen}
        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
      >
        <Maximize className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
    <motion.div 
      className="h-full bg-slate-900"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "circOut" }}
    />
  </div>
);

export const KeyboardInstructions = ({ show, onDismiss }: { show: boolean; onDismiss: () => void }) => (
  <AnimatePresence>
    {show && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-white/20 backdrop-blur-md flex items-center justify-center"
        onClick={onDismiss}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-3xl max-w-md text-center space-y-8"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Keyboard className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-3xl font-display font-medium tracking-tight">Controls</h2>
          <div className="grid grid-cols-2 gap-8 text-left">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Step</p>
              <p className="text-lg font-medium">Arrow Right / Space</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Previous Step</p>
              <p className="text-lg font-medium">Arrow Left</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Slide</p>
              <p className="text-lg font-medium">Auto after reveal</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exit</p>
              <p className="text-lg font-medium">Esc Key</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm italic">Click anywhere to continue</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const AmbientGradients = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 bg-white">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-slate-50 blur-[120px] opacity-50" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-slate-50 blur-[120px] opacity-50" />
  </div>
);
