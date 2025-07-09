import React from "react";

const steps = [
  {
    number: "01",
    title: "Choose Your Service",
    description:
      "Browse our catalog of tech support services and select the one that matches your needs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Book an Appointment",
    description:
      "Select a date and time that works best for you, and we will schedule a tech expert to help.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get Expert Help",
    description:
      "Our qualified technician will arrive at your location to solve your tech problems.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Problem Solved",
    description:
      "Enjoy your properly working tech with the peace of mind of our satisfaction guarantee.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#F9F6EF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00704A] mb-3 inline-block">
            How It Works
            <span className="block w-20 h-1 bg-gradient-to-r from-[#CBA258] to-[#00704A] rounded-full mx-auto mt-3" />
          </h2>
          <p className="text-lg md:text-xl text-[#CBA258] font-semibold mb-2">
            Simple. Fast. Reliable.
          </p>
          <p className="text-base text-[#1E3932] max-w-xl mx-auto">
            We make getting tech support simple and stress-free. Our process is
            designed to get your tech problems solved quickly and effectively.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center bg-white border-2 border-[#E8F5E9] rounded-2xl shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#CBA258] group"
            >
              {/* Step number in solid green circle */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#00704A] text-white text-xl font-bold shadow-lg border-4 border-white">
                  {step.number}
                </div>
              </div>
              {/* Icon in solid green circle */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#00704A] text-white mb-6 mt-6 shadow group-hover:shadow-lg transition-all">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#00704A] mb-2 mt-2">
                {step.title}
              </h3>
              <p className="text-[#1E3932]">{step.description}</p>
              {/* Connector line (except for last item) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 right-0 w-8 h-1 bg-gradient-to-r from-[#E8F5E9] to-[#CBA258] opacity-70 z-0"
                  style={{ transform: "translateY(-50%)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
