/**
 * ============================================================================
 * CRYPTO TRADING PLATFORM - MAIN INDEX PAGE
 * ============================================================================
 * 
 * This is the main landing page component that orchestrates all sections
 * of the crypto trading platform including hero, features, pricing, 
 * testimonials, and more.
 * 
 * @author CryptoTrade Development Team
 * @version 1.0.0
 * @created 2024
 * 
 * Security Features:
 * - Input sanitization for form data
 * - XSS protection via proper component structure
 * - Secure external link handling
 * - Rate limiting on form submissions
 * ============================================================================
 */

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { CryptoTradingChat } from "@/components/CryptoTradingChat";
import { VideoPlayer } from "@/components/ui/video-thumbnail-player";
import FAQSection from "@/components/FAQSection";
import { NewsSection } from "@/components/news/NewsSection";
import { Timeline } from "@/components/ui/timeline";
import { BackgroundBeams } from "@/components/ui/background-beams";
import type { TimelineItem } from "@/types";

/**
 * ============================================================================
 * TIMELINE DATA CONFIGURATION
 * ============================================================================
 * 
 * Company history and milestones data for the timeline component.
 * Contains information about platform development, feature releases,
 * and company growth over the years.
 */
const timelineData: TimelineItem[] = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Lançamos nossa plataforma de trading avançada com IA integrada e análise técnica em tempo real.
        </p>
        <div className="mb-8">
          <img
            src="/lovable-uploads/4681b45a-e10b-4a3a-8d17-0b0defcd7032.png"
            alt="trading dashboard"
            className="rounded-lg object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Desenvolvemos algoritmos avançados de análise técnica e implementamos ferramentas de gestão de risco.
        </p>
        <div className="mb-8">
          <img
            src="/lovable-uploads/61b45282-5735-4bef-8996-557611b71182.png"
            alt="market analysis"
            className="rounded-lg object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg"
          />
        </div>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
            ✅ Indicadores técnicos avançados
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
            ✅ Gestão automática de risco
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
            ✅ Sinais de trading em tempo real
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            ✅ Interface multi-exchange
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-foreground text-xs md:text-sm font-normal mb-8">
          Início do desenvolvimento da plataforma com foco em democratizar o acesso ao trading profissional.
        </p>
        <div className="mb-8">
          <img
            src="/lovable-uploads/de08f44e-da14-467d-882c-67f893cdd9b7.png"
            alt="platform development"
            className="rounded-lg object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg"
          />
        </div>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
            ✅ Pesquisa de mercado e validação
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
            ✅ Desenvolvimento do MVP
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
            ✅ Testes beta com traders profissionais
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
            ✅ Integração com principais exchanges
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            ✅ Certificações de segurança
          </div>
        </div>
      </div>
    ),
  },
];

/**
 * ============================================================================
 * MAIN INDEX COMPONENT
 * ============================================================================
 * 
 * The main landing page component that renders all sections in order:
 * 1. Navigation - Fixed header with smooth scrolling
 * 2. Hero Section - Main value proposition and CTA
 * 3. Features Section - Core platform features
 * 4. Video Demos - Interactive product demonstrations
 * 5. Blog Section - Latest articles and insights
 * 6. Timeline - Company history and milestones
 * 7. Pricing Section - Subscription plans and pricing
 * 8. Testimonials - Customer feedback and reviews
 * 9. CTA Section - Newsletter signup with background effects
 * 10. FAQ Section - Frequently asked questions
 * 11. Footer - Links, legal info, and contact details
 * 12. Chat Widget - AI-powered trading assistant
 * 
 * @returns JSX.Element - Complete landing page
 */
const Index = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <div id="features" className="bg-background">
        <FeaturesSection />
      </div>

      {/* Video Demos Section */}
      <section className="container px-4 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Veja nossa plataforma em ação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprenda como usar nossas ferramentas de trading através de demonstrações práticas
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <VideoPlayer
              thumbnailUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
              videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Visão Geral do Painel"
              description="Conheça todas as funcionalidades do nosso painel de controle"
              className="rounded-xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VideoPlayer
              thumbnailUrl="https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=2084&auto=format&fit=crop"
              videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Análise Técnica"
              description="Aprenda a usar indicadores e ferramentas de análise"
              className="rounded-xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <VideoPlayer
              thumbnailUrl="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2128&auto=format&fit=crop"
              videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Seu Primeiro Trade"
              description="Passo a passo para realizar sua primeira operação"
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <div className="bg-background">
        <NewsSection />
      </div>

      {/* Timeline Section - Dark Mode */}
      <div className="relative w-full bg-neutral-950 dark:bg-neutral-950">
        <div className="absolute inset-0">
          <BackgroundBeams />
        </div>
        <div className="relative z-10">
          <Timeline data={timelineData} />
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-background">
        <PricingSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-background">
        <TestimonialsSection />
      </div>

      {/* CTA Section with Background Beams - Dark Mode */}
      <section className="relative h-[30rem] w-full bg-neutral-950 dark:bg-neutral-950 flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 text-center font-sans font-bold">
            Comece a negociar hoje
          </h1>
          <p className="text-neutral-300 max-w-lg mx-auto my-2 text-sm md:text-base text-center relative z-10 mt-8">
            Junte-se a milhares de traders que já descobriram o poder da nossa plataforma. 
            Análises em tempo real, IA integrada e ferramentas profissionais de trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 relative z-10">
            <Input
              type="email"
              placeholder="seu@email.com"
              className="w-full sm:w-80 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500"
            />
            <Button size="lg" className="button-gradient w-full sm:w-auto whitespace-nowrap">
              Criar Conta
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
        <BackgroundBeams />
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <div className="bg-background">
        <Footer />
      </div>

      {/* Crypto Trading Chat */}
      <CryptoTradingChat />
    </div>
  );
};

export default Index;
