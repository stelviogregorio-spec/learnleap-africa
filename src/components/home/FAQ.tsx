import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      id: "1",
      question: "Como me inscrevo num curso?",
      answer: "Simplesmente navegue no nosso catálogo de cursos, selecione o curso que deseja e clique em 'Inscrever Agora'. Pode pagar usando PayPal, Stripe ou Multicaixa Express. Assim que o pagamento for confirmado, terá acesso imediato a todos os materiais do curso."
    },
    {
      id: "2",
      question: "Posso aceder aos cursos em dispositivos móveis?",
      answer: "Sim! O EduFlow é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Pode aprender em qualquer lugar, a qualquer hora, e o seu progresso é automaticamente sincronizado em todos os dispositivos."
    },
    {
      id: "3",
      question: "Recebo um certificado após a conclusão?",
      answer: "Absolutamente! Ao completar um curso e passar em todas as avaliações, receberá um certificado digital verificado que pode partilhar no LinkedIn, adicionar ao seu currículo ou descarregar como PDF."
    },
    {
      id: "4",
      question: "Que métodos de pagamento aceitam?",
      answer: "Aceitamos múltiplos métodos de pagamento incluindo PayPal, Stripe (cartões de crédito/débito) e Multicaixa Express para os nossos estudantes em países africanos de língua portuguesa. Todas as transações são seguras e encriptadas."
    },
    {
      id: "5",
      question: "Como me torno instrutor?",
      answer: "Clique em 'Tornar-se Instrutor', preencha o nosso formulário de candidatura e submeta uma aula de exemplo. A nossa equipa irá rever a sua candidatura e orientá-lo através do processo de integração. Fornecemos apoio completo para o ajudar a criar cursos incríveis."
    },
    {
      id: "6",
      question: "Há garantia de devolução do dinheiro?",
      answer: "Sim! Oferecemos uma garantia de devolução do dinheiro de 30 dias. Se não estiver satisfeito com um curso, pode solicitar um reembolso total dentro de 30 dias da compra, sem perguntas."
    },
    {
      id: "7",
      question: "Posso descarregar os materiais do curso?",
      answer: "Sim, a maioria dos materiais do curso incluindo PDFs, slides e recursos adicionais são descarregáveis. O conteúdo em vídeo está disponível para visualização offline através da nossa aplicação móvel."
    },
    {
      id: "8",
      question: "Oferecem cursos em português?",
      answer: "Sim! Temos cursos disponíveis tanto em inglês como em português. Pode filtrar cursos por idioma e a nossa interface da plataforma está disponível em ambos os idiomas para servir melhor a nossa comunidade africana."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas para perguntas comuns sobre os nossos cursos, plataforma e serviços.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="bg-card rounded-lg px-6 shadow-card hover:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ainda tem perguntas? Estamos aqui para ajudar!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contactar Suporte
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a 
              href="/help" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Centro de Ajuda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;