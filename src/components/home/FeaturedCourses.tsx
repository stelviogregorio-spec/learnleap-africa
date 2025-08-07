import { Button } from "@/components/ui/button";
import CourseCard from "@/components/courses/CourseCard";
import { ArrowRight } from "lucide-react";

const FeaturedCourses = () => {
  const featuredCourses = [
    {
      id: "1",
      title: "Digital Marketing Mastery: From Beginner to Expert",
      instructor: "Maria Santos",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviewCount: 2847,
      duration: "12.5 hours",
      studentCount: 15420,
      level: "Beginner",
      category: "Marketing",
      thumbnail: "",
      isBestseller: true,
    },
    {
      id: "2",
      title: "Complete Web Development Bootcamp 2024",
      instructor: "João Silva",
      price: 149.99,
      originalPrice: 299.99,
      rating: 4.9,
      reviewCount: 5234,
      duration: "45 hours",
      studentCount: 28150,
      level: "All Levels",
      category: "Development",
      thumbnail: "",
      isBestseller: true,
    },
    {
      id: "3",
      title: "Entrepreneurship in Africa: Building Successful Startups",
      instructor: "Carlos Mendes",
      price: 79.99,
      rating: 4.7,
      reviewCount: 1892,
      duration: "8 hours",
      studentCount: 9340,
      level: "Intermediate",
      category: "Business",
      thumbnail: "",
    },
    {
      id: "4",
      title: "Photography Fundamentals: Capture Stunning Images",
      instructor: "Ana Costa",
      price: 59.99,
      originalPrice: 119.99,
      rating: 4.6,
      reviewCount: 3421,
      duration: "6.5 hours",
      studentCount: 12890,
      level: "Beginner",
      category: "Creative",
      thumbnail: "",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular courses, carefully selected by our education experts 
            to help you achieve your learning goals.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="group">
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;