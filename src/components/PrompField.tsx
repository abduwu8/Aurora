import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import '../index.css';


// TypeScript interface for API response
interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>; 
}

const AIIcebreakerGenerator: React.FC = () => {
  // State management
  const [icebreaker, setIcebreaker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('casual');
  const [previousIcebreakers, setPreviousIcebreakers] = useState<string[]>([]);

  // Response categories
  const categories = {
    Dare: 'Give a one liner dare. Should be funny and sometimes related to the social media. Response should be less than 25 words. Don\'t mention here\'s another one',
    Icebreaker: 'Generate a icebreaker question. Response should be less than 25 words. Don\'t mention here\'s another one',
    Joke: 'Generate a joke. Response should be less than 25 words. Don\'t mention here\'s another one',
    ThisThat: 'Generate a this or that question. Response should be less than 25 words, Don\'t mention this or that in the response'
  };

  // Groq API configuration
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  
  // Generate Icebreaker
  const generateIcebreaker = async () => {
    // Validate API key
    if (!GROQ_API_KEY) {
      setError('Groq API key is missing. Please set VITE_GROQ_API_KEY in your environment.');
      return;
    }

    // Reset previous states
    setLoading(true);
    setError(null);

    try {
      // API request configuration
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `${categories[selectedCategory as keyof typeof categories]}. Max words: 20`
            },
            {
              role: 'user',
              content: `Generate a unique response. Previously used responses: ${previousIcebreakers.join(', ')}`
            }
          ],
          model: 'llama3-8b-8192'
        })
      });

      // Handle API response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Something went wrong');
      }

      const data: ChatResponse = await response.json();
      
      // Extract and set the response
      const generatedIcebreaker = data.choices[0]?.message?.content.trim() || 'No icebreaker generated';
      
      // Prevent duplicate icebreakers
      if (previousIcebreakers.includes(generatedIcebreaker)) {
        throw new Error('Duplicate icebreaker generated');
      }

      setIcebreaker(generatedIcebreaker);
      setPreviousIcebreakers(prev => [...prev, generatedIcebreaker].slice(-10)); // Keep last 10 icebreakers
    } catch (err) {
      // Error handling
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('API call error:', err);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <motion.div 
        className="h-[600px] w-[800px] bg-[#120904] flex flex-col items-center justify-center p-4 relative"
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        
        {/* Top bar with close icon */}
        <div className="absolute top-0 right-0 left-0 w-full h-[20px] bg-[#e8a179] flex items-center px-4">
          <div className="ml-auto cursor-pointer" onClick={() => {
            setIcebreaker('');
            
          }}>
            <X size={15} onClick={() => {
              setIcebreaker('');
            }}/>

            
          </div>
          <div className="absolute top-0 text-sm right-0 left-0 w-full h-[20px] bg-[#e8a179] flex items-center px-4" style={{ fontFamily: 'Fh Total' }}>
              <p >click on the spark button to generate response</p>
            </div>
        </div>

        {/* Generate Icon */}
        <div 
          onClick={generateIcebreaker}
          className="cursor-pointer mb-4 hover:scale-110 transition-transform"
        >
          <Sparkles 
            size={38} 
            color="#e8a179" 
            className={`${loading ? 'animate-pulse' : ''}`}
          />
        </div>

        {/* Display Icebreaker */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="w-3/4 max-h-[200px] overflow-auto">
          <p 
            className="text-[#e8a179] text-center text-4xl break-words" 
            style={{ fontFamily: 'Fh Total' }}
          >
            {icebreaker}
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="h-[500px] w-[350px] bg-[#120904] flex flex-col items-center justify-center left-[100px] p-4 relative font-[Fh Total]"
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Top bar with close icon */}
        <div className="absolute top-0 right-0 left-0 h-[20px] bg-[#e8a179] flex items-center px-4">
        </div>

        {/* Response Category Buttons */}
        <div className="flex flex-col space-y-2 font-[Fh Total]">
          {Object.keys(categories).map((category) => (
            <button 
            key={category} 
            className={`px-6 py-3 rounded-lg font-bold text-3xl transition-all duration-300 ease-in-out ${
              selectedCategory === category
                ? 'bg-[#e8a179] text-[#120904]' // Selected button color
                : 'bg-[#f5f5dc] text-[#333]' // Default cream button color
            } hover:bg-[#e8a179] hover:text-[#120904] shadow-lg focus:outline-none`}
            onClick={() => setSelectedCategory(category)}
            style={{ fontFamily: 'Fh Total' }}
          >
            {category}
          </button>
          
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AIIcebreakerGenerator;