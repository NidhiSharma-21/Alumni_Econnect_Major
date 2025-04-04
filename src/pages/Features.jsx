import {
  UsersIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  ArrowPathIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Global Alumni Network",
    description: "Connect with graduates worldwide across industries and generations.",
    icon: UsersIcon,
  },
  {
    name: "Real-time Updates",
    description: "Instant notifications for events, news, and community activities.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Enterprise Security",
    description: "End-to-end encrypted platform protecting your data and privacy.",
    icon: FingerPrintIcon,
  },
  {
    name: "Career Tracker",
    description: "Visualize your professional journey and milestones over time.",
    icon: ArrowPathIcon,
  },
  {
    name: "Verified Profiles",
    description: "Authenticated alumni profiles ensuring genuine connections.",
    icon: AcademicCapIcon,
  },
  {
    name: "Smart Networking",
    description: "AI-powered suggestions for relevant connections and opportunities.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Exclusive Job Board",
    description: "Curated career opportunities shared by fellow alumni.",
    icon: BriefcaseIcon,
  },
  {
    name: "Advanced Directory",
    description: "Filter alumni by industry, location, skills, and graduation year.",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Success Stories",
    description: "Featured alumni achievements to inspire the community.",
    icon: ArrowPathIcon,
  },
  {
    name: "Virtual Events",
    description: "Global reunions, workshops, and networking sessions.",
    icon: CalendarIcon,
  },
  {
    name: "Direct Messaging",
    description: "Secure 1:1 and group conversations with alumni worldwide.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Admin Dashboard",
    description: "Comprehensive tools for alumni association management.",
    icon: ClipboardDocumentCheckIcon,
  },
];

export default function AlumniFeatures() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#f0f4f8] text-[#2d545e] mb-4">
            Alumni Ecosystem
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your <span className="text-[#2d545e]">Lifelong</span> Network
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A premium platform designed to maintain and strengthen your academic connections throughout your career.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div 
              key={feature.name}
              className="group relative rounded-xl p-6 transition-all duration-300 hover:bg-[#f8fafc] hover:shadow-lg border border-gray-100"
            >
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#2d545e] to-[#d27511] opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#f0f4f8] flex items-center justify-center group-hover:bg-[#2d545e] group-hover:text-white transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-[#2d545e] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-sm font-medium text-[#2d545e] group-hover:text-[#d27511] transition-colors duration-300">
                    Learn more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-[#2d545e] to-[#d27511] text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Explore All Features
          </button>
        </div>
      </div>
    </div>
  );
}