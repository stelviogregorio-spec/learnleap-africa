import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Play } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    duration: string;
    studentCount: number;
    level: string;
    category: string;
    thumbnail: string;
    isBestseller?: boolean;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-card flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">{course.title}</p>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isBestseller && (
            <Badge className="bg-warning text-warning-foreground">Bestseller</Badge>
          )}
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        
        {/* Preview Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-4 h-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs text-primary font-medium">{course.category}</div>
        
        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        {/* Instructor */}
        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{course.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({course.reviewCount})</span>
        </div>
        
        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {course.studentCount.toLocaleString()} students
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(course.price)}
            </span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>
          <Button size="sm" className="bg-gradient-button shadow-button">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;