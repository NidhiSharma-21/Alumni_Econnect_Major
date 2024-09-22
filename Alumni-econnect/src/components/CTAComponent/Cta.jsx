export default function CTA() {
    return (
      <div className="bg-white">
        <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Join the Alumni Econnect.
              <br />
              Stay connected with your peers.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Sign up now and be part of an exclusive network of alumni. Stay updated with the latest events and opportunities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#d27511] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-[#2d545e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d27511]"
              >
                Join now
              </a>
              <a href="#" className="text-base font-semibold leading-7 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  