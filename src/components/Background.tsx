import React from 'react';
import CommandPrompt from './PrompField';

import CreditsScreen from './CreditsScreen';
import Starburst from './Starbust';

interface GridBackgroundProps {
  children?: React.ReactNode;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full bg-[#FFCFB0]"> {/* Cream background */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      {children}
    </div>
  );
};

export default GridBackground;

// Example usage:
export const ExamplePage: React.FC = () => {
  return (
    <GridBackground>
      
      <div className="p-8 relative"> {/* Add relative positioning here */}
        <CommandPrompt />
      </div>
      
      <Starburst 
        className="absolute bottom-[-30px] left-[820px] transform -translate-x-1/2 z-10" // Center it and set z-index
      /> 
      <Starburst 
        className="absolute top-[-650px] left-[1060px] transform -translate-x-1/2 z-100" // Center it and set z-index
      /> 
      <CreditsScreen />
    </GridBackground>
  );
};