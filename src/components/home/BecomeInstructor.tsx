import { Button } from "@/components/ui/button";
import { Users, DollarSign, BookOpen, TrendingUp } from "lucide-react";

const BecomeInstructor = () => {
  const benefits = [
    {
      icon: Users,
      title: "Reach Global Students",
      description: "Connect with learners from Portuguese-speaking African countries and beyond.",
    },
    {
      icon: DollarSign,
      title: "Earn Revenue",
      description: "Get paid for sharing your expertise with competitive revenue sharing.",
    },
    {
      icon: BookOpen,
      title: "Easy Course Creation",
      description: "User-friendly tools to create engaging video courses, quizzes, and materials.",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Brand",
      description: "Build your reputation as an expert and expand your professional network.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-hero text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Become an Instructor and Inspire Millions
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Share your knowledge and expertise with students worldwide. Join our community of 
              expert instructors and start building your online teaching business today.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-blue-100">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Teaching Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Stats/Visual */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Instructor Success Stats</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">₹50K+</div>
                  <div className="text-blue-200 text-sm">Avg. Monthly Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1M+</div>
                  <div className="text-blue-200 text-sm">Students Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-blue-200 text-sm">Avg. Course Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-200 text-sm">Support Available</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-lg text-center">
                <p className="text-sm text-blue-100">
                  "Teaching on EduFlow changed my life. I now earn more from my courses than my day job!" 
                  <span className="block font-semibold mt-1">- Sarah M., Top Instructor</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;