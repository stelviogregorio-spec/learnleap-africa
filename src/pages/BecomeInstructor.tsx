import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  Download,
  Award,
  Globe,
  Target,
  Zap,
  Heart,
  Send,
  FileText,
  Video,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const BecomeInstructor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    expertise_area: "",
    experience_years: "",
    teaching_experience: "",
    course_idea: "",
    motivation: "",
    linkedin_profile: "",
    portfolio_url: ""
  });

  const benefits = [
    {
      icon: Users,
      title: "Alcance Estudantes Globais",
      description: "Conecte-se com milhares de estudantes em países africanos de língua portuguesa e além.",
      highlight: "50.000+ estudantes ativos"
    },
    {
      icon: DollarSign,
      title: "Ganhe Receita Passiva",
      description: "Receba até 70% das vendas dos seus cursos com pagamentos mensais garantidos.",
      highlight: "Até €3.000/mês em média"
    },
    {
      icon: BookOpen,
      title: "Ferramentas Profissionais",
      description: "Use nossas ferramentas avançadas para criar cursos envolventes com facilidade.",
      highlight: "Editor de vídeo incluído"
    },
    {
      icon: TrendingUp,
      title: "Cresça Sua Marca",
      description: "Construa sua reputação como especialista e expanda sua rede profissional.",
      highlight: "Marketing gratuito incluso"
    }
  ];

  const features = [
    "Editor de vídeo integrado",
    "Analytics detalhados",
    "Suporte 24/7",
    "Certificados automáticos",
    "Chat com estudantes",
    "Mobile app incluído"
  ];

  const successStories = [
    {
      name: "Maria Santos",
      specialty: "Marketing Digital",
      earnings: "€4.200/mês",
      students: "15.420",
      rating: 4.9,
      quote: "Transformei meu conhecimento em uma fonte de renda estável que me permite viajar e ensinar ao mesmo tempo."
    },
    {
      name: "João Silva",
      specialty: "Desenvolvimento Web",
      earnings: "€6.800/mês",
      students: "28.150",
      rating: 4.8,
      quote: "Em 6 meses consegui mais alunos aqui do que em 2 anos dando aulas presenciais."
    },
    {
      name: "Ana Costa",
      specialty: "Design Gráfico",
      earnings: "€2.900/mês",
      students: "12.890",
      rating: 4.7,
      quote: "A plataforma me deu a liberdade de ensinar no meu próprio ritmo e ainda ter tempo para projetos pessoais."
    }
  ];

  const requirements = [
    "Experiência comprovada na área de ensino",
    "Conhecimento especializado em um campo específico",
    "Capacidade de criar conteúdo educacional de qualidade",
    "Comunicação clara em português",
    "Compromisso com a excelência educacional"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para enviar sua candidatura",
        variant: "destructive",
      });
      return;
    }

    // Basic validation
    const requiredFields = ['full_name', 'email', 'expertise_area', 'experience_years', 'course_idea', 'motivation'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real application, you would save this to a database
      // For now, we'll just show a success message
      
      toast({
        title: "Candidatura enviada!",
        description: "Recebemos sua candidatura. Nossa equipe entrará em contato em até 48 horas.",
      });

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        expertise_area: "",
        experience_years: "",
        teaching_experience: "",
        course_idea: "",
        motivation: "",
        linkedin_profile: "",
        portfolio_url: ""
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-white py-20 lg:py-32">
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Torne-se Instrutor e 
                <span className="block text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                  Transforme Vidas
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Partilhe o seu conhecimento com estudantes de toda África e construa um negócio próspero ensinando o que ama
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-hero">
                  <Send className="w-5 h-5 mr-2" />
                  Candidatar-se Agora
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Play className="w-5 h-5 mr-2" />
                  Como Funciona
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">1.200+</div>
                  <div className="text-blue-200">Instrutores Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">€4.500</div>
                  <div className="text-blue-200">Ganho Médio Mensal</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-blue-200">Taxa de Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Por que Ensinar na EduFlow?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Oferecemos tudo o que precisa para criar, promover e vender os seus cursos online
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground mb-3">{benefit.description}</p>
                        <Badge variant="secondary" className="text-primary">
                          {benefit.highlight}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ferramentas Profissionais Incluídas</CardTitle>
                <CardDescription>
                  Tudo o que precisa para criar cursos de alta qualidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Histórias de Sucesso
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Veja como nossos instrutores transformaram suas carreiras
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-semibold text-lg">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.specialty}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{story.earnings}</div>
                        <div className="text-xs text-muted-foreground">Receita Mensal</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{story.students}</div>
                        <div className="text-xs text-muted-foreground">Estudantes</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm font-medium">{story.rating}</span>
                    </div>

                    <blockquote className="text-sm text-muted-foreground italic text-center">
                      "{story.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Requisitos para Instrutor
                </h2>
                <p className="text-lg text-muted-foreground">
                  Garantimos qualidade através de critérios rigorosos de seleção
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Requisitos Mínimos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Processo de Candidatura
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
                        <div>
                          <h4 className="font-medium">Envie sua candidatura</h4>
                          <p className="text-sm text-muted-foreground">Complete o formulário com suas informações</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
                        <div>
                          <h4 className="font-medium">Revisão da candidatura</h4>
                          <p className="text-sm text-muted-foreground">Nossa equipe analisa seu perfil em 48h</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
                        <div>
                          <h4 className="font-medium">Aula demonstrativa</h4>
                          <p className="text-sm text-muted-foreground">Grave uma aula de 10 minutos para avaliação</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full text-white text-xs flex items-center justify-center font-bold">✓</div>
                        <div>
                          <h4 className="font-medium">Aprovação e onboarding</h4>
                          <p className="text-sm text-muted-foreground">Comece a criar seus cursos!</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Candidatar-se a Instrutor
                </h2>
                <p className="text-muted-foreground">
                  Preencha o formulário abaixo para começar sua jornada como instrutor
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Formulário de Candidatura</CardTitle>
                  <CardDescription>
                    Todas as informações são confidenciais e seguras
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitApplication} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Informações Pessoais</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="full_name">Nome Completo *</Label>
                          <Input
                            id="full_name"
                            value={formData.full_name}
                            onChange={(e) => handleInputChange("full_name", e.target.value)}
                            placeholder="Seu nome completo"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="seu@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+244 123 456 789"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Informações Profissionais</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expertise_area">Área de Especialização *</Label>
                        <Input
                          id="expertise_area"
                          value={formData.expertise_area}
                          onChange={(e) => handleInputChange("expertise_area", e.target.value)}
                          placeholder="Ex: Marketing Digital, Programação, Design..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience_years">Anos de Experiência *</Label>
                        <Input
                          id="experience_years"
                          type="number"
                          min="1"
                          value={formData.experience_years}
                          onChange={(e) => handleInputChange("experience_years", e.target.value)}
                          placeholder="Quantos anos de experiência você tem?"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="teaching_experience">Experiência em Ensino</Label>
                        <Textarea
                          id="teaching_experience"
                          value={formData.teaching_experience}
                          onChange={(e) => handleInputChange("teaching_experience", e.target.value)}
                          placeholder="Descreva sua experiência anterior em ensino (formal ou informal)..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Course Ideas */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Sobre Seus Cursos</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="course_idea">Ideia de Curso *</Label>
                        <Textarea
                          id="course_idea"
                          value={formData.course_idea}
                          onChange={(e) => handleInputChange("course_idea", e.target.value)}
                          placeholder="Descreva o curso que gostaria de criar na nossa plataforma..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation">Por que Quer Ensinar? *</Label>
                        <Textarea
                          id="motivation"
                          value={formData.motivation}
                          onChange={(e) => handleInputChange("motivation", e.target.value)}
                          placeholder="Conte-nos sobre sua motivação para ensinar e como quer impactar seus estudantes..."
                          rows={4}
                          required
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Informações Adicionais</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="linkedin_profile">Perfil LinkedIn</Label>
                        <Input
                          id="linkedin_profile"
                          value={formData.linkedin_profile}
                          onChange={(e) => handleInputChange("linkedin_profile", e.target.value)}
                          placeholder="https://linkedin.com/in/seu-perfil"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolio_url">Portfolio/Website</Label>
                        <Input
                          id="portfolio_url"
                          value={formData.portfolio_url}
                          onChange={(e) => handleInputChange("portfolio_url", e.target.value)}
                          placeholder="https://seu-portfolio.com"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Enviando Candidatura..." : "Enviar Candidatura"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Ao enviar sua candidatura, você concorda com nossos termos de serviço e política de privacidade.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeInstructor;