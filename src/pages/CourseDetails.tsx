import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Award,
  Target
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  level: string;
  rating: number;
  total_students: number;
  image_url: string;
  category_id: string;
  instructor_id: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  is_instructor: boolean;
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [instructor, setInstructor] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchCourse();
      if (user) {
        checkEnrollment();
      }
    }
  }, [id, user]);

  const fetchCourse = async () => {
    try {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch instructor profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', courseData.instructor_id)
        .single();

      if (profileError) throw profileError;
      setInstructor(profileData);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o curso",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!user || !id) return;

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', id)
        .single();

      if (data) {
        setIsEnrolled(true);
      }
    } catch (error) {
      // User is not enrolled, which is fine
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa fazer login para se inscrever no curso",
        variant: "destructive",
      });
      return;
    }

    setEnrolling(true);
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: id!,
          progress: 0
        });

      if (error) throw error;

      setIsEnrolled(true);
      toast({
        title: "Inscrição realizada!",
        description: "Você foi inscrito no curso com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Erro na inscrição",
        description: error.message || "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratuito";
    return `R$ ${price.toFixed(2)}`;
  };

  const formatDuration = (duration: number) => {
    if (duration < 60) return `${duration} minutos`;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours} horas`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando curso...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
          <Link to="/courses">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos cursos
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos cursos
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {course.level || "Não definido"}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {course.rating?.toFixed(1) || "0.0"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{course.total_students} alunos</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Sobre o Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Duração</p>
                      <p className="text-sm text-muted-foreground">
                        {course.duration ? formatDuration(course.duration) : "Não informado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Nível</p>
                      <p className="text-sm text-muted-foreground">
                        {course.level || "Não definido"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Criado em</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(course.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Alunos Inscritos</p>
                      <p className="text-sm text-muted-foreground">
                        {course.total_students} pessoas
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            {instructor && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Instrutor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={instructor.avatar_url} />
                      <AvatarFallback>
                        {instructor.full_name?.split(' ').map(n => n[0]).join('') || 'I'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {instructor.full_name || 'Instrutor'}
                      </h3>
                      {instructor.bio && (
                        <p className="text-muted-foreground">
                          {instructor.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatPrice(course.price)}
                  </div>
                  {course.price > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Pagamento único
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {isEnrolled ? (
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Você já está inscrito!</span>
                    </div>
                    <Button className="w-full" size="lg">
                      <Play className="h-4 w-4 mr-2" />
                      Continuar Curso
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? "Inscrevendo..." : "Inscrever-se Agora"}
                  </Button>
                )}

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Este curso inclui:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Acesso vitalício
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Certificado de conclusão
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Suporte do instrutor
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Acesso em dispositivos móveis
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}