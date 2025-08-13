import { Button } from "@/components/ui/button";
import { Play, Star, Users, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              Confiança de mais de 50.000 estudantes
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforme o Seu Futuro com
              <span className="block text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                Cursos de Especialistas
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              Junte-se a milhares de criadores, empreendedores e estudantes que dominam novas competências através dos nossos cursos digitais abrangentes. Aprenda com especialistas da indústria e faça crescer a sua carreira.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-hero">
                <Play className="w-5 h-5 mr-2" />
                Comece a Aprender Hoje
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explorar Cursos
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Cursos Especializados</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-blue-200 text-sm">Estudantes Ativos</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-blue-200 text-sm">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Video Preview */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-hero bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Assista Histórias de Sucesso</h3>
                  <p className="text-blue-200">Veja como os nossos estudantes transformaram as suas carreiras</p>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-card animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">2,847</div>
                    <div className="text-xs text-gray-500">Estudantes Inscritos</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-card animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">4.9/5</div>
                    <div className="text-xs text-gray-500">Avaliação do Curso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;