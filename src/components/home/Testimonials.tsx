import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Luan Aires",
      role: "Digital Entrepreneur",
      company: "TechStart Angola",
      content: "EduFlow transformed my business approach. The digital marketing course helped me scale my startup from 0 to 100K+ revenue in just 8 months. The instructors are world-class!",
      rating: 5,
      avatar: "LA",
    },
    {
      id: 2,
      name: "Patricia Moreira",
      role: "Software Developer",
      company: "InnovTech Mozambique",
      content: "The web development bootcamp was incredibly comprehensive. I went from zero coding knowledge to landing my dream job as a full-stack developer. Worth every penny!",
      rating: 5,
      avatar: "PM",
    },
    {
      id: 3,
      name: "Miguel Santos",
      role: "Creative Director",
      company: "Design Studio Cabo Verde",
      content: "Amazing platform with high-quality content. The photography course elevated my skills tremendously. Now I'm running my own creative agency with confidence.",
      rating: 5,
      avatar: "MS",
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Success Stories from Our Students
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers and achieved their goals through our courses.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-6 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>
              
              {/* Content */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;