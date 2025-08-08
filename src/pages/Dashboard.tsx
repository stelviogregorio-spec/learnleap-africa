import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Award, 
  TrendingUp,
  Users,
  Settings,
  Plus,
  Star
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Enrollment {
  id: string;
  progress: number;
  enrolled_at: string;
  completed_at: string | null;
  course: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    duration: number;
    level: string;
  };
}

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  is_instructor: boolean;
}

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      setProfile(profileData);

      // Fetch enrollments with course data
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses:course_id (
            id,
            title,
            description,
            image_url,
            duration,
            level
          )
        `)
        .eq('user_id', user?.id)
        .order('enrolled_at', { ascending: false });

      if (enrollmentError) throw enrollmentError;
      
      // Transform the data to match our interface
      const transformedEnrollments = enrollmentData?.map(enrollment => ({
        ...enrollment,
        course: enrollment.courses
      })) || [];

      setEnrollments(transformedEnrollments);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar seus dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration: number) => {
    if (duration < 60) return `${duration}min`;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  };

  const completedCourses = enrollments.filter(e => e.completed_at);
  const inProgressCourses = enrollments.filter(e => !e.completed_at);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Olá, {profile?.full_name || user?.email?.split('@')[0] || 'Estudante'}!
              </h1>
              <p className="text-muted-foreground">
                Continue sua jornada de aprendizado
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Perfil
                </Button>
              </Link>
              {profile?.is_instructor && (
                <Link to="/instructor/courses">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Curso
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cursos Inscritos
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollments.length}</div>
              <p className="text-xs text-muted-foreground">
                {inProgressCourses.length} em progresso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cursos Concluídos
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                {enrollments.length > 0 ? Math.round((completedCourses.length / enrollments.length) * 100) : 0}% de conclusão
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Horas de Estudo
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(enrollments.reduce((total, e) => total + (e.course?.duration || 0) * (e.progress / 100), 0) / 60)}h
              </div>
              <p className="text-xs text-muted-foreground">
                Tempo investido
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList>
            <TabsTrigger value="current">Cursos Atuais</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="all">Todos os Cursos</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {inProgressCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {inProgressCourses.map((enrollment) => (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      {enrollment.course?.image_url ? (
                        <img
                          src={enrollment.course.image_url}
                          alt={enrollment.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">
                          {enrollment.course?.level || "Não definido"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {enrollment.progress}% concluído
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {enrollment.course?.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {enrollment.course?.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="w-full" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {enrollment.course?.duration ? formatDuration(enrollment.course.duration) : "Não informado"}
                          </span>
                        </div>
                      </div>

                      <Link to={`/course/${enrollment.course?.id}`}>
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Continuar
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhum curso em progresso
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explore nossos cursos e comece a aprender algo novo!
                </p>
                <Link to="/courses">
                  <Button>
                    Explorar Cursos
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {completedCourses.map((enrollment) => (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      {enrollment.course?.image_url ? (
                        <img
                          src={enrollment.course.image_url}
                          alt={enrollment.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Concluído
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {enrollment.course?.title}
                      </CardTitle>
                      <CardDescription>
                        Concluído em {new Date(enrollment.completed_at!).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <Link to={`/course/${enrollment.course?.id}`}>
                        <Button variant="outline" className="w-full">
                          Ver Certificado
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhum curso concluído ainda
                </h3>
                <p className="text-muted-foreground">
                  Complete seus cursos para ganhar certificados!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {enrollments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      {enrollment.course?.image_url ? (
                        <img
                          src={enrollment.course.image_url}
                          alt={enrollment.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={enrollment.completed_at ? "default" : "secondary"}>
                          {enrollment.completed_at ? "Concluído" : enrollment.course?.level || "Não definido"}
                        </Badge>
                        {!enrollment.completed_at && (
                          <span className="text-sm text-muted-foreground">
                            {enrollment.progress}%
                          </span>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">
                        {enrollment.course?.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {enrollment.course?.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {!enrollment.completed_at && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} className="w-full" />
                        </div>
                      )}

                      <Link to={`/course/${enrollment.course?.id}`}>
                        <Button className="w-full">
                          {enrollment.completed_at ? "Ver Certificado" : "Continuar"}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Você ainda não se inscreveu em nenhum curso
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explore nossos cursos e comece sua jornada de aprendizado!
                </p>
                <Link to="/courses">
                  <Button>
                    Explorar Cursos
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}