/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SLIDES, Slide, AwardSlide, PhaseSlide, GridSlide, RoadmapSlide, RecapSlide, OrgSlide, TableSlide } from './data/slides';
import { SlideControls, ProgressBar, KeyboardInstructions, AmbientGradients } from './components/PresentationUI';
import { LayoutGrid, Timer, Rocket, BrainCircuit, Users, Award as AwardIcon, Globe } from 'lucide-react';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [revealStage, setRevealStage] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentSlide = SLIDES[currentSlideIndex];
  const maxStages = currentSlide.type === 'award' ? 3 : 1;

  const navigateNext = useCallback(() => {
    if (revealStage < maxStages) {
      setRevealStage(prev => prev + 1);
    } else if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setRevealStage(1);
    }
  }, [revealStage, maxStages, currentSlideIndex]);

  const navigatePrev = useCallback(() => {
    if (revealStage > 1) {
      setRevealStage(prev => prev - 1);
    } else if (currentSlideIndex > 0) {
      const prevSlide = SLIDES[currentSlideIndex - 1];
      setCurrentSlideIndex(prev => prev - 1);
      setRevealStage(prevSlide.type === 'award' ? 3 : 1);
    }
  }, [revealStage, currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') navigateNext();
      if (e.key === 'ArrowLeft') navigatePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateNext, navigatePrev]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-center"
        >
          <div className="w-12 h-12 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <h1 className="text-2xl font-display font-medium tracking-tight text-slate-400">Preparing...</h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-white select-none overflow-hidden">
      <AmbientGradients />
      <ProgressBar progress={((currentSlideIndex + (revealStage / maxStages)) / SLIDES.length) * 100} />
      
      <KeyboardInstructions show={showInstructions} onDismiss={() => setShowInstructions(false)} />

      {currentSlide.watermark && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`watermark-${currentSlide.watermark}`}
          className="fixed top-20 left-20 text-[9px] font-bold text-slate-100 uppercase tracking-[0.8em] pointer-events-none z-40"
        >
          {currentSlide.watermark}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={currentSlide.id}
          initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full flex items-center justify-center px-12 md:px-24 xl:px-48"
        >
          {currentSlide.type === 'hero' && <HeroView slide={currentSlide} />}
          {currentSlide.type === 'award' && <AwardView slide={currentSlide} stage={revealStage} />}
          {currentSlide.type === 'grid' && <GridView slide={currentSlide} />}
          {currentSlide.type === 'image' && <ImageView slide={currentSlide} />}
          {currentSlide.type === 'table' && <TableView slide={currentSlide} />}
          {currentSlide.type === 'list' && <ListView slide={currentSlide} />}
          {currentSlide.type === 'org' && <OrgView slide={currentSlide} />}
          {currentSlide.type === 'recap' && <RecapView slide={currentSlide} />}
          {currentSlide.type === 'roadmap' && <RoadmapOverview slide={currentSlide} />}
          {currentSlide.type === 'phase' && <PhaseView slide={currentSlide} />}
          {currentSlide.type === 'closing' && <ClosingView slide={currentSlide} />}
        </motion.main>
      </AnimatePresence>

      <SlideControls 
        currentSlide={currentSlideIndex} 
        totalSlides={SLIDES.length}
        onNext={navigateNext}
        onPrev={navigatePrev}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}

function HeroView({ slide }: { slide: Slide & { type: 'hero' } }) {
  const isQ2 = slide.id.includes('q2');
  const isDemo = slide.id.includes('demo');

  return (
    <div className="text-center space-y-16 max-w-5xl">
      <div className="space-y-6">
        {slide.id !== 'welcome' && !isDemo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="text-sm font-bold tracking-[0.4em] text-slate-400 uppercase"
          >
            {isQ2 ? 'Q2 2026' : 'Q1 2026'}
          </motion.div>
        )}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className={`font-display font-medium tracking-tighter leading-[0.95] whitespace-pre-line ${
            slide.title.length > 20 ? 'text-7xl md:text-8xl' : 'text-8xl md:text-[10rem]'
          }`}
        >
          {slide.title === 'Q2 2026 Roadmap' ? (
            <div className="flex flex-col items-center">
              <span>Q2 2026</span>
              <span className="text-5xl md:text-6xl mt-4 font-light opacity-30 tracking-normal italic">Roadmap</span>
            </div>
          ) : slide.title}
        </motion.h1>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="space-y-12"
      >
        <p className="text-2xl md:text-3xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          {slide.subtitle}
        </p>
        <div className="flex flex-col items-center gap-4">
           <div className="h-[1px] w-24 bg-slate-200" />
           <p className="text-lg text-slate-400 uppercase tracking-widest">{slide.dateLocation}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed bottom-12 w-full left-0 px-12 flex justify-between text-xs font-medium text-slate-300 uppercase tracking-widest"
      >
        <span>{slide.tagline}</span>
        <span>{slide.url}</span>
      </motion.div>
    </div>
  );
}

function AwardView({ slide, stage }: { slide: AwardSlide; stage: number }) {
  const Icon = slide.categoryIcon;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full max-w-7xl">
      <div className="space-y-16">
        {/* Stage 1: Title & Icon */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-800"
          >
            <Icon className="w-10 h-10 stroke-[1.5px]" />
          </motion.div>
          
          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-display font-medium tracking-tight"
            >
              {slide.title}
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              className="h-[2px] bg-slate-900"
            />
          </div>
        </div>

        {/* Stage 2: Subtitle, Description, Quote */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold text-slate-400">{slide.subtitle}</h3>
              <p className="text-xl text-slate-600 leading-relaxed font-normal">
                {slide.description}
              </p>
              <div className="pl-6 border-l-2 border-slate-100 italic text-2xl text-slate-500 font-normal">
                {slide.quote}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stage 3: Winner */}
      <div className="relative flex flex-col justify-center h-full min-h-[400px]">
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-bold text-slate-400 uppercase tracking-[0.5em]"
              >
                And the award goes to
              </motion.div>
              
              <div className="space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ 
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    delay: 0.4 
                  }}
                  className="text-6xl md:text-8xl font-display font-medium tracking-tighter whitespace-nowrap"
                >
                  {slide.winner}
                </motion.h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RecapView({ slide }: { slide: RecapSlide }) {
  const isQ1Programs = slide.id === 'q1-recap-programs';
  const hasManyItems = slide.items.length > 4;

  return (
    <div className={`w-full max-w-6xl mx-auto ${hasManyItems ? 'space-y-12' : 'space-y-24'}`}>
      <div className="space-y-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-display font-medium tracking-tighter text-slate-900"
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-[1px] w-24 bg-slate-100 mx-auto"
        />
      </div>

      <div className={`relative grid grid-cols-1 md:grid-cols-2 ${hasManyItems ? 'gap-x-16 gap-y-12' : 'gap-x-32 gap-y-24'} px-6 md:px-12 pb-12`}>
        {slide.items.map((item, index) => {
          const isObject = typeof item === 'object';
          const name = isObject ? item.name : item;
          const dim = isObject ? item.dim : false;
          
          // Zig-zag offset logic for the specific Q1 slide
          const isEven = index % 2 !== 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`flex items-start gap-8 md:gap-12 ${
                (isQ1Programs && isEven) ? 'md:mt-32' : ''
              } ${isQ1Programs && index === 1 ? 'md:-translate-x-12' : ''} ${dim ? 'opacity-40' : 'opacity-100'}`}
            >
              <div className="text-5xl md:text-7xl font-display font-extralight text-slate-200 shrink-0 leading-none select-none tabular-nums">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <div className="space-y-4 pt-1 max-w-xl">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "48px" }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: "circOut" }}
                  className={`h-[1.5px] origin-left ${dim ? 'bg-slate-300' : 'bg-slate-900'}`}
                />
                <p className={`text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight ${
                  dim ? 'font-light italic text-slate-400' : 'font-light text-slate-800'
                } ${isQ1Programs ? 'whitespace-nowrap' : ''}`}>
                  {name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TableView({ slide }: { slide: TableSlide }) {
  const isLargeTable = slide.rows.length > 10;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-display font-medium tracking-tight text-center"
      >
        {slide.title}
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-[2rem] overflow-hidden shadow-xl"
      >
        <div className="overflow-y-auto max-h-[60vh] scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 sticky top-0 z-10 backdrop-blur-md">
                {slide.headers.map((header: string, i: number) => (
                  <th key={i} className={`px-6 ${isLargeTable ? 'py-3' : 'py-5'} text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100/50`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.rows.map((row: string[], idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/40 transition-colors group">
                  {row.map((cell, i) => (
                    <td key={i} className={`px-6 ${isLargeTable ? 'py-2.5 text-sm' : 'py-4 text-base'} font-light text-slate-700 border-b border-slate-100/50 last:border-b-0`}>
                      {cell.includes('--') ? (
                        <span className="text-slate-400 font-normal bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {cell.replace('--', '').replace('--', '').trim()}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function ListView({ slide }: { slide: any }) {
  return (
    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
      <div className="space-y-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-7xl font-display font-medium tracking-tight"
        >
          {slide.title}
        </motion.h2>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="space-y-12"
        >
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Objective</h3>
            <p className="text-3xl font-light text-slate-900">{slide.objective}</p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Core Products</h3>
              <ul className="space-y-3">
                {slide.coreProducts.map((p: string, i: number) => (
                   <li key={i} className="text-xl font-light text-slate-600 flex items-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                     {p}
                   </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shared Products</h3>
              <ul className="space-y-3">
                {slide.sharedProducts.map((p: string, i: number) => (
                   <li key={i} className="text-xl font-light text-slate-600 flex items-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                     {p}
                   </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="glass p-12 rounded-[2.5rem] shadow-2xl space-y-8"
      >
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-6 text-center">
          Team Members
        </h3>
        <div className="space-y-4">
          {slide.members.map((member: string, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (i * 0.05) }}
              className="flex items-center justify-between group"
            >
              <span className={`text-2xl ${member.startsWith('--') ? 'text-slate-400 font-normal bg-slate-50 px-3 py-0.5 rounded border border-slate-100 text-lg' : i === 0 ? 'text-slate-900 font-medium' : 'text-slate-600 font-light'}`}>
                {member.startsWith('--') ? member.replace('--', '').replace('--', '').trim() : member}
              </span>
              {i === 0 && !member.startsWith('--') && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Lead</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function OrgView({ slide }: { slide: OrgSlide }) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-display font-medium tracking-tight text-slate-900"
        >
          {slide.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 font-light italic"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      <div className={`grid gap-6 ${slide.members.length > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'}`}>
        {slide.members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="group"
          >
            <div className="glass p-8 rounded-[2rem] flex flex-col justify-between h-full border border-white/80 hover:border-slate-200 transition-all duration-500 hover:shadow-xl group-hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                {member.designation && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block leading-none">Designation</span>
                    <h3 className="text-xl font-light text-slate-600 leading-tight">{member.designation}</h3>
                  </div>
                )}
                <div className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                  member.role.toLowerCase().includes('lead') 
                    ? 'bg-slate-900 text-white ml-auto' 
                    : 'bg-slate-100 text-slate-500 ml-auto'
                }`}>
                  {member.role}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block leading-none">Employee</span>
                <p className={`text-4xl font-display font-medium tracking-tight h-10 flex items-end ${
                  member.employee.startsWith('--') ? 'text-slate-200 italic' : 'text-slate-900'
                }`}>
                  {member.employee.startsWith('--') ? member.employee.replace('--', '').replace('--', '').trim() : member.employee}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ImageView({ slide }: { slide: Slide & { type: 'image' } }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-8 max-w-7xl px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${slide.title === 'Demo' ? 'text-sm font-bold uppercase tracking-[0.4em] text-slate-400 mb-8' : 'text-4xl font-display font-medium tracking-tight text-center'}`}
      >
        {slide.title}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white"
      >
        <img 
          src={slide.imageUrl} 
          alt={slide.title}
          className="w-full h-full object-contain max-h-[70vh]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback for missing images
            e.currentTarget.src = 'https://placehold.co/1200x800?text=Upload+Screenshot+to+assets/timelines/';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}

function GridView({ slide }: { slide: GridSlide }) {
  return (
    <div className="w-full max-w-7xl space-y-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-display font-medium tracking-tight text-center"
      >
        {slide.title}
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {slide.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass p-8 rounded-2xl space-y-4 border-slate-100/50"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.title}</p>
            <p className="text-xl font-medium tracking-tight">{item.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RoadmapOverview({ slide }: { slide: RoadmapSlide }) {
  const phaseColors = [
    'bg-[#376e6f]', // Starter (Teal)
    'bg-[#5249cf]', // Growth (Purple)
    'bg-[#cf9e42]', // Scale (Yellow)
    'bg-[#1a2333]'  // Expansion (Dark Blue)
  ];

  return (
    <div className="w-full max-w-7xl space-y-16">
      <div className="space-y-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-6xl font-display font-medium tracking-tight text-slate-900"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-slate-400 font-light"
        >
          2026 - Three phases, one direction
        </motion.p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-${slide.phases.length} gap-8 relative max-w-6xl mx-auto`}>
        {/* Timeline connector line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 hidden md:block -translate-y-1/2 z-0" />
        
        {slide.phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group relative z-10 hover:shadow-xl transition-all duration-500"
          >
            <div className={`${phaseColors[index % phaseColors.length]} py-3 text-center`}>
               <span className="text-[9px] font-bold text-white uppercase tracking-[0.3em] font-sans">
                 {phase.title}
               </span>
            </div>
            
            <div className="p-10 space-y-8 flex flex-col items-center">
              <div className="text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-50/50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-7xl font-display font-medium text-slate-900 tracking-tighter leading-none">
                  {phase.date.split(' ')[0]}
                </h3>
                <p className="text-sm text-slate-400 font-medium tracking-[0.2em] mt-1">{phase.date.split(' ')[1] || '2026'}</p>
              </div>

              <div className="flex flex-col items-center gap-1.5 w-full">
                <div className="h-px w-8 bg-slate-100" />
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                  {index === 0 ? 'Jan — Apr' : index === 1 ? 'May — Aug' : index === 2 ? 'Sep — Dec' : 'Jan — Apr'}
                </p>
                <div className="h-px w-8 bg-slate-100" />
              </div>

              <div className="pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900/10 group-hover:bg-slate-900 transition-colors duration-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PhaseView({ slide }: { slide: PhaseSlide }) {
  return (
    <div className="w-full max-w-7xl space-y-20">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-display font-medium tracking-tight text-slate-900"
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          className="h-[2px] bg-slate-900 mx-auto mt-8"
        />
      </div>

      <div className={`grid grid-cols-1 ${slide.sections.length === 1 ? 'max-w-3xl mx-auto' : 'md:grid-cols-2 gap-px bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl'}`}>
        {slide.sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className={`bg-white p-16 space-y-12 group hover:bg-slate-50/50 transition-colors ${slide.sections.length === 1 ? 'rounded-[3rem] border border-slate-100 shadow-2xl' : ''}`}
          >
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-8">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-[0.2em]">
                {section.title}
              </h3>
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Q2 Roadmap</div>
            </div>
            <ul className="space-y-6">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-6 group/item">
                  <span className="text-xs font-bold text-slate-200 mt-1.5 group-hover/item:text-slate-900 transition-colors shrink-0">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-2xl text-slate-600 font-light leading-snug group-hover/item:text-slate-900 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ClosingView({ slide }: { slide: Slide & { type: 'closing' } }) {
  return (
    <div className="text-center space-y-16 max-w-4xl">
      <div className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-display font-medium tracking-tight"
        >
          {slide.content.header} <br />
          <span className="text-slate-400">{slide.content.team}</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-slate-500 font-light leading-relaxed"
        >
          {slide.content.paragraph} <br />
          {slide.content.belief}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-12"
      >
        <div className="h-[1px] w-24 bg-slate-100 mx-auto" />
        <div className="space-y-4">
          <p className="text-lg font-medium tracking-widest uppercase">{slide.content.tagline}</p>
          <p className="text-sm font-bold text-slate-300 tracking-[0.2em]">{slide.content.url}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-12 w-full left-0 text-center px-12"
      >
        <p className="text-xs text-slate-300 uppercase tracking-widest">{slide.content.footer}</p>
      </motion.div>
    </div>
  );
}
