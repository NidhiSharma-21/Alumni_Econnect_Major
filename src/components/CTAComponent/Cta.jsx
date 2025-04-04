import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/userregistration');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="relative bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Background pattern (optional) */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Join <span className="text-[#2d545e] dark:text-[#4fd1c5]">Alumni Econnect</span>
            <br className="hidden sm:block" />
            Stay connected with your peers
          </h2>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sign up now and be part of an exclusive network of alumni. Stay updated with the latest events and opportunities.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleJoinNow}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#2d545e] to-[#3f7b88] text-white font-medium shadow-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1"
            >
              Join now
            </button>
            <button 
              onClick={handleLearnMore}
              className="group flex items-center text-gray-700 dark:text-gray-300 font-medium hover:text-[#2d545e] dark:hover:text-[#4fd1c5] transition-colors"
            >
              Learn more
              <svg 
                className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}