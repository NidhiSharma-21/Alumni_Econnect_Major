import React from 'react';
import event1 from '../../assets/event1.png';
import event from '../../assets/event2.jpg';
import upevent from '../../assets/upcommingevent.png';
import EventCart from '../../components/EventComponent/EventCart';

const Event = () => {
  return (
    <section className="mt-12 py-8">
      <div className="landingpage">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar (Sticky) */}
          <div className="lg:w-[40%] w-full h-auto lg:h-screen flex justify-center items-start lg:items-center ">
            <div className="text-center m-6 lg:m-10">
              <h1 className="text-3xl lg:text-4xl px-4 lg:px-8 font-bold text-[#2d545e] mb-6">Events</h1>
              <ul className="space-y-4 p-6 lg:p-8">
                <li className="hover:text-[#d27511] text-xl lg:text-3xl">Create New Event →</li>
                <li className="hover:text-[#d27511] text-xl lg:text-3xl">Upcoming Events →</li>
                <li className="hover:text-[#d27511] text-xl lg:text-3xl">View All Events →</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[60%]">
            <div className="block mx-4 lg:mx-8 py-4">
              <img src={event1} alt="Event" className="w-full object-cover" />
            </div>
            <div className="heading block items-center mx-4 lg:mx-8">
              <h6 className="text-3xl lg:text-5xl font-extrabold text-[#2d545e] mb-6">You're Invited!</h6>
              <p className="text-base lg:text-lg leading-relaxed text-gray-700">
                From regional club events to Tech Reunions to volunteer gatherings, the Gyan Ganga Alumni Association offers a host of events—and endless ways to engage.
              </p>
            </div>
            <hr className="bg-gray-900 mx-4 lg:mx-8 my-6 rounded" />

            {/* Event Cards */}
            <div className="EventDetails grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 mx-4 lg:mx-8">
              <div className="py-8">
                <EventCart
                  image={upevent}
                  heading="All Upcoming Events →"
                  paragraph="Check out the Association's full listing of in-person and online events. There's something for everyone!"
                />
              </div>
              <div className="py-8">
                <EventCart
                  image={event}
                  heading="All Current Events →"
                  paragraph="Check out the Association's full listing of in-person and online events. There's something for everyone!"
                />
              </div>
              <div className="py-8">
                <EventCart
                  image={event}
                  heading="Create New Events →"
                  paragraph="Check out the Association's full listing of in-person and online events. There's something for everyone!"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
