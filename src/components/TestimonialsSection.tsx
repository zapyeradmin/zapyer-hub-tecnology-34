"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Trader Profissional",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "Os dados de mercado em tempo real e recursos avançados de trading melhoraram significativamente minha performance. As medidas de segurança da plataforma me dão tranquilidade."
  },
  {
    name: "Sarah Johnson",
    role: "Gestora de Fundo Cripto",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "As ferramentas de nível institucional da CryptoTrade transformaram nossa estratégia de trading. A integração de API e recursos automatizados nos economizaram inúmeras horas."
  },
  {
    name: "David Wilson",
    role: "Investidor Cripto Pioneiro",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "O suporte ao cliente é excepcional, e o design intuitivo da plataforma tornou o início no trading de cripto perfeito. Uma revolução tanto para iniciantes quanto para profissionais."
  },
  {
    name: "Emily Zhang",
    role: "Desenvolvedora DeFi",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "Vimos melhorias notáveis em nossa eficiência de trading desde que mudamos para a CryptoTrade. O roteamento inteligente de ordens e agregação de liquidez são particularmente impressionantes."
  },
  {
    name: "James Rodriguez",
    role: "Especialista em Segurança Cripto",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "Os recursos de segurança são robustos e as atualizações regulares nos mantêm à frente de ameaças emergentes. É exatamente o que a indústria cripto precisava."
  },
  {
    name: "Lisa Thompson",
    role: "Gestora de Portfólio",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "A capacidade da plataforma de lidar com estratégias de trading complexas mantendo simplicidade na interface é notável. Tem sido inestimável para nossa gestão de portfólio."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Confiável pelos Traders</h2>
          <p className="text-muted-foreground text-lg">
            Junte-se a milhares de traders satisfeitos na CryptoTrade
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;