import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Luan Aires",
      role: "Empreendedor Digital",
      company: "TechStart Angola",
      content: "O EduFlow transformou a minha abordagem de negócios. O curso de marketing digital ajudou-me a escalar a minha startup de 0 para mais de 100 mil em receita em apenas 8 meses. Os instrutores são de classe mundial!",
      rating: 5,
      avatar: "LA",
    },
    {
      id: 2,
      name: "Patricia Moreira",
      role: "Programadora",
      company: "InnovTech Mozambique",
      content: "O bootcamp de desenvolvimento web foi incrivelmente abrangente. Passei de zero conhecimento de programação para conseguir o meu emprego dos sonhos como programadora full-stack. Valeu cada cêntimo!",
      rating: 5,
      avatar: "PM",
    },
    {
      id: 3,
      name: "Miguel Santos",
      role: "Diretor Criativo",
      company: "Design Studio Cabo Verde",
      content: "Plataforma incrível com conteúdo de alta qualidade. O curso de fotografia elevou tremendamente as minhas competências. Agora dirijo a minha própria agência criativa com confiança.",
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
            Histórias de Sucesso dos Nossos Estudantes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que transformaram as suas carreiras e alcançaram os seus objetivos através dos nossos cursos.
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