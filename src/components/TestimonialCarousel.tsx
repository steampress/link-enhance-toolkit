
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  text: string;
  bgColor: string;
  avatarColor: string;
  avatarIcon: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechVision Inc.",
    text: "After optimizing my LinkedIn profile with LinkedPro, I received 3x more recruiter messages and landed my dream job within a month!",
    bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
    avatarColor: "bg-blue-100 text-blue-600",
    avatarIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5286 20 9.14629 19.6916 7.94363 19.1486C7.60579 19.0096 7.43687 18.9401 7.32542 18.9392C7.21397 18.9382 7.13063 18.9668 6.96394 19.0239C6.79726 19.081 6.5967 19.1973 6.19558 19.4299L3.5 21L4.5286 17.9142C4.75212 17.2184 4.86387 16.8705 4.85465 16.6701C4.84542 16.4698 4.82222 16.3755 4.73449 16.1379C4.3126 15.1952 4.07103 14.1404 4.07103 13.034C4.07103 8.616 7.9386 5 12.1585 5C15.5305 5 18.4476 7.17615 19.6178 10.1256" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 2,
    name: "David Chen",
    role: "Software Engineer",
    company: "GlobalTech",
    text: "The keyword optimization suggestions helped my profile appear in more relevant searches. I'm now getting consistent interview requests from top companies.",
    bgColor: "bg-gradient-to-r from-emerald-50 to-teal-50",
    avatarColor: "bg-emerald-100 text-emerald-600",
    avatarIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 8L14.5 12L10.5 16M7 3H17C18.3261 3 19.5979 3.52678 20.5355 4.46447C21.4732 5.40215 22 6.67392 22 8V16C22 17.3261 21.4732 18.5979 20.5355 19.5355C19.5979 20.4732 18.3261 21 17 21H7C5.67392 21 4.40215 20.4732 3.46447 19.5355C2.52678 18.5979 2 17.3261 2 16V8C2 6.67392 2.52678 5.40215 3.46447 4.46447C4.40215 3.52678 5.67392 3 7 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Product Manager",
    company: "InnovateCorp",
    text: "LinkedPro's visual improvement tips transformed my profile completely. The professional look has increased my credibility in my industry network.",
    bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50",
    avatarColor: "bg-amber-100 text-amber-600",
    avatarIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 14.5L11.5 16.5L14.5 12.5M7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "Sales Director",
    company: "Nexus Solutions",
    text: "The content optimization strategies provided by LinkedPro helped me showcase my achievements in a more impactful way. My connection requests have doubled!",
    bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
    avatarColor: "bg-pink-100 text-pink-600",
    avatarIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "HR Manager",
    company: "TalentForge",
    text: "As someone who reviews LinkedIn profiles daily, I can confirm that following LinkedPro's recommendations makes candidates stand out. I implemented these tips myself and saw amazing results.",
    bgColor: "bg-gradient-to-r from-violet-50 to-purple-50",
    avatarColor: "bg-violet-100 text-violet-600",
    avatarIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V21M12 21H7M12 21H17M17 16V14C17 13.4477 16.5523 13 16 13H8C7.44772 13 7 13.4477 7 14V16M15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex justify-center">
        <div className="relative max-w-md w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                index === activeIndex 
                  ? "opacity-100 translate-x-0" 
                  : index < activeIndex 
                    ? "opacity-0 -translate-x-full" 
                    : "opacity-0 translate-x-full"
              )}
              style={{ zIndex: index === activeIndex ? 10 : 0 }}
            >
              <Card className={cn("glass-card p-6", testimonial.bgColor)}>
                <div className="flex items-start space-x-4 mb-6">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", testimonial.avatarColor)}>
                    {testimonial.avatarIcon}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Testimonial</div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">"{testimonial.text}"</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full mx-1 transition-all",
              index === activeIndex ? "bg-primary" : "bg-primary/30"
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
