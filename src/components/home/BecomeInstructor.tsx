import { Button } from "@/components/ui/button";
import { Users, DollarSign, BookOpen, TrendingUp } from "lucide-react";

const BecomeInstructor = () => {
  const benefits = [
    {
      icon: Users,
      title: "Alcance Estudantes Globais",
      description: "Conecte-se com estudantes de países africanos de língua portuguesa e não só.",
    },
    {
      icon: DollarSign,
      title: "Ganhe Receita",
      description: "Seja pago por partilhar a sua experiência com partilha de receita competitiva.",
    },
    {
      icon: BookOpen,
      title: "Criação Fácil de Cursos",
      description: "Ferramentas fáceis de usar para criar cursos em vídeo envolventes, questionários e materiais.",
    },
    {
      icon: TrendingUp,
      title: "Faça Crescer a Sua Marca",
      description: "Construa a sua reputação como especialista e expanda a sua rede profissional.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-hero text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Torne-se Instrutor e Inspire Milhões
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Partilhe o seu conhecimento e experiência com estudantes de todo o mundo. Junte-se à nossa comunidade de 
              instrutores especialistas e comece a construir o seu negócio de ensino online hoje.
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
                Comece a Ensinar Hoje
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Saber Mais
              </Button>
            </div>
          </div>
          
          {/* Stats/Visual */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Estatísticas de Sucesso dos Instrutores</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">₹50K+</div>
                  <div className="text-blue-200 text-sm">Ganhos Mensais Médios</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1M+</div>
                  <div className="text-blue-200 text-sm">Estudantes Alcançados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-blue-200 text-sm">Avaliação Média dos Cursos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-200 text-sm">Suporte Disponível</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-lg text-center">
                <p className="text-sm text-blue-100">
                  "Ensinar no EduFlow mudou a minha vida. Agora ganho mais com os meus cursos do que no meu emprego!" 
                  <span className="block font-semibold mt-1">- Sarah M., Instrutora de Topo</span>
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