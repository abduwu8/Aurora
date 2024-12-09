
import { motion } from 'framer-motion'
import { X } from 'lucide-react'


const handleRedirect = () => {
    window.location.href = "https://www.linkedin.com/in/abdullahkhannn/"; // Change to your LinkedIn profile URL
  };

const CreditsScreen = () => {
  return (
    <>
        <motion.div 
    className="h-[100px] w-[300px] bg-[#120904] flex flex-col items-center justify-center  absolute bottom-8 right-8"
    animate={{
        y: [0, 10, 0], // Vertical floating animation
        transition: {
        duration: 3, // Slower pace
        repeat: Infinity, // Continuous animation
        ease: "easeInOut" // Smooth transition
        },
    }} 
    > 
     <p className="text-[#e8a179] text-center text-xl absolute align-center justify-center" style={{ fontFamily: 'Fh Total' }}>
      crafted by{" "}
      <span
        className="cursor-pointer hover:text-white underline transition-colors"
        onClick={handleRedirect}
      >
        abdullah
      </span>
    </p>
    {/* Top bar with close icon */}
    <div className="absolute top-0 right-0 left-0 w-full h-[20px] bg-[#e8a179] flex items-cente">
        
        <X size={19} />
            </div>
    
        </motion.div>
    </>

    
  );
};

export default CreditsScreen;
