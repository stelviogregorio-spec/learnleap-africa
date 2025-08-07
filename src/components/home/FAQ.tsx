import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      id: "1",
      question: "How do I enroll in a course?",
      answer: "Simply browse our course catalog, select the course you want, and click 'Enroll Now'. You can pay using PayPal, Stripe, or Multicaixa Express. Once payment is confirmed, you'll have immediate access to all course materials."
    },
    {
      id: "2",
      question: "Can I access courses on mobile devices?",
      answer: "Yes! EduFlow is fully responsive and works perfectly on smartphones, tablets, and desktops. You can learn anywhere, anytime, and your progress is automatically synced across all devices."
    },
    {
      id: "3",
      question: "Do I receive a certificate upon completion?",
      answer: "Absolutely! Upon completing a course and passing all assessments, you'll receive a verified digital certificate that you can share on LinkedIn, add to your resume, or download as a PDF."
    },
    {
      id: "4",
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including PayPal, Stripe (credit/debit cards), and Multicaixa Express for our students in Portuguese-speaking African countries. All transactions are secure and encrypted."
    },
    {
      id: "5",
      question: "How do I become an instructor?",
      answer: "Click on 'Become an Instructor', fill out our application form, and submit a sample lesson. Our team will review your application and guide you through the onboarding process. We provide full support to help you create amazing courses."
    },
    {
      id: "6",
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with a course, you can request a full refund within 30 days of purchase, no questions asked."
    },
    {
      id: "7",
      question: "Can I download course materials?",
      answer: "Yes, most course materials including PDFs, slides, and additional resources are downloadable. Video content is available for offline viewing through our mobile app."
    },
    {
      id: "8",
      question: "Do you offer courses in Portuguese?",
      answer: "Yes! We have courses available in both English and Portuguese. You can filter courses by language and our platform interface is available in both languages to serve our African community better."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our courses, platform, and services.
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
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contact Support
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a 
              href="/help" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;