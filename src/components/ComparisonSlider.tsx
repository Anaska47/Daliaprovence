
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComparisonSliderProps {
  before: string;
  after: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) handleMove(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => { handleMove(e.touches[0].clientX); };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none border-4 border-white shadow-2xl"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
    >
      {/* After Image (Background) */}
      <img src={after} alt="Après" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      
      {/* Before Image (Clipped Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden comparison-before"
        style={{ "--clip-pos": `${100 - sliderPosition}%` } as React.CSSProperties}
      >
        <img src={before} alt="Avant" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-6 left-6 bg-stone-900/80 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/20">
          Avant l'intervention
        </div>
      </div>

      {/* After Label */}
      <div className="absolute top-6 right-6 bg-emerald-600/90 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/20">
        Résultat après
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-xl cursor-ew-resize comparison-handle-pos"
        style={{ "--handle-pos": `${sliderPosition}%` } as React.CSSProperties}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-stone-300 rounded-full"></div>
            <div className="w-1 h-3 bg-stone-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
