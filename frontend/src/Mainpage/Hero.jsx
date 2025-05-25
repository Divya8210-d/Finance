import Auth from '../auth';
import bull from '../Images/bull.png';

export default function Hero() {
  return (
    <div className="bg-orange-500 min-h-[700px] flex justify-center px-8 pt-2 relative overflow-hidden">
      {/* Bull image in background */}
      <img
        src={bull}
        alt="Bull"
        className="absolute top-0 left-[380px] transform -translate-x-1/2 w-[640px] blur-[1px] opacity-40 z-0 pointer-events-none object-contain"
      />

      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-11 relative z-10">
        
        {/* Left Text Section */}
        <div className="flex-1 text-center lg:text-left space-y-4 pt-40">
          <h1 className="text-[80px] font-bold text-white">Finanlytic</h1>
          <p className="text-white text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, sed.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="flex-1 max-w-md w-full relative z-10">
          {/* Blurred background text */}
     <span className="absolute top-20 left-1/2 transform -translate-x-1/2 text-[100px] font-bold text-white select-none pointer-events-none z-0
  opacity-20 blur-sm">
  Finance
</span>

          {/* Auth Form */}
          <div className="relative z-10">
            <Auth />
          </div>
        </div>
        
      </div>
    </div>
  );
}
