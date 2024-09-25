import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  UsersIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Connect with Alumni",
    description:
      "Easily find and connect with alumni from your school or university. Engage in meaningful conversations, share experiences, and expand your network.",
    icon: UsersIcon,
  },
  {
    name: "Real-time Updates",
    description:
      "Stay up-to-date with the latest news and updates from your alumni community. Receive notifications for important events and updates directly to your dashboard.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure Platform",
    description:
      "Your data is protected with state-of-the-art security measures. Enjoy peace of mind while connecting with alumni in a trusted environment.",
    icon: FingerPrintIcon,
  },
  {
    name: "Track Your Journey",
    description:
      "Keep track of your professional journey and milestones. Showcase your achievements and help inspire fellow alumni on the platform.",
    icon: ArrowPathIcon,
  },
  {
    name: "Alumni Registration",
    description:
      "Allow alumni to register, update their profiles, and connect with others on the platform.",
    icon: AcademicCapIcon,
  },
  {
    name: "Networking Hub",
    description:
      "Connect alumni based on shared interests, profession, or location.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Job Portal",
    description:
      "Provide job search and posting features for career advancement among alumni.",
    icon: BriefcaseIcon,
  },
  {
    name: "Alumni Directory",
    description:
      "Search and filter alumni by different criteria using the comprehensive directory.",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Success Story Tracking",
    description:
      "Showcase alumni achievements and inspire others with success stories.",
    icon: ArrowPathIcon,
  },
  {
    name: "Events and Reunions",
    description:
      "Announce and manage alumni events and reunions for easier networking.",
    icon: CalendarIcon,
  },
  {
    name: "Chat Section",
    description:
      "Enable real-time communication with a chat section for efficient alumni interaction.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Data Management",
    description:
      "Authority/College officials can manage user data efficiently on the platform.",
    icon: ClipboardDocumentCheckIcon,
  },
];

export default function AlumniFeatures() {
  return (
    <div className="bg-[#2d545e] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className=" text-md lg:text-2xl font-bold leading-7 text-[#d27511]">
            Unlock Opportunities Through Your Alumni Network.
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay connected, stay informed
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Join a thriving community of alumni, get updates, and track your
            journey in a secure, user-friendly platform.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 cursor-pointer">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative pl-16 flex items-center space-x-4"
              >
                <div className="absolute left-0 top-0 h-12 w-12 bg-[#d27511] flex items-center justify-center rounded-lg">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <dt className="text-base font-semibold text-white">
                    {feature.name}
                  </dt>
                  <dd className="text-sm text-gray-300">
                    {feature.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
