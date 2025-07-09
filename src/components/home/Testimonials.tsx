import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { testimonialsData, Testimonial } from "@/utils/testimonialsData";

function getRandomTestimonials(arr: Testimonial[], n: number) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const Testimonials = () => {
  const testimonials = getRandomTestimonials(testimonialsData, 6);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 mr-0.5 ${
          i < rating ? "fill-[#CBA258] text-[#CBA258]" : "text-[#E8F5E9]"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-[#00704A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3 inline-block">
            What Our Customers Say
            <span className="block w-20 h-1 bg-gradient-to-r from-[#CBA258] to-white rounded-full mx-auto mt-3" />
          </h2>
          <p className="text-lg md:text-xl text-[#CBA258] font-semibold mb-2">
            Real Stories. Real Satisfaction.
          </p>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Don't just take our word for it. Here's what real customers say
            about their OnAssist experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white border-2 border-[#E8F5E9] rounded-2xl shadow-xl hover:shadow-[0_0_24px_4px_#CBA25855] hover:border-[#CBA258] transition-all duration-300 flex flex-col"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full border-4 border-[#CBA258] shadow-lg overflow-hidden flex items-center justify-center bg-white mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#00704A] text-lg mb-0.5">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#6B7280]">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-[#1E3932] mb-4 italic relative pl-6">
                  <span className="absolute left-0 top-0 text-[#CBA258] text-2xl font-bold">
                    “
                  </span>
                  {testimonial.text}
                  <span className="text-[#CBA258] text-2xl font-bold align-bottom">
                    ”
                  </span>
                </p>

                <div className="mt-auto">
                  <span className="inline-block bg-[#CBA258] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {testimonial.service}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
