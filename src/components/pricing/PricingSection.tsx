import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Mais Popular
        </span>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Personalizado" && <span className="text-gray-400">/mês</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">
        Começar Trading
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  return (
    <section className="container px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Escolha Seu{" "}
          <span className="text-gradient font-medium">Plano de Trading</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Selecione o plano de trading perfeito com recursos avançados e taxas competitivas
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingTier
          name="Trader Básico"
          price="R$ 0"
          description="Perfeito para iniciantes começando sua jornada cripto"
          features={[
            "Trading spot básico",
            "Ordens de mercado e limite",
            "Análise básica de mercado",
            "Suporte por email"
          ]}
        />
        <PricingTier
          name="Trader Profissional"
          price="R$ 149"
          description="Recursos avançados para traders sérios"
          features={[
            "Ferramentas avançadas de trading",
            "Trading com margem até 10x",
            "Análise técnica avançada",
            "Suporte prioritário",
            "Acesso à API"
          ]}
          isPopular
        />
        <PricingTier
          name="Institucional"
          price="Personalizado"
          description="Soluções de nível corporativo para instituições"
          features={[
            "Soluções de trading personalizadas",
            "Volume de trading ilimitado",
            "Acesso ao balcão OTC",
            "Gerente de conta dedicado",
            "Integração de API personalizada",
            "Suporte prioritário 24/7"
          ]}
        />
      </div>
    </section>
  );
};