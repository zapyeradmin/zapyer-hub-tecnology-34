import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQSection() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Como funciona o trading de criptomoedas?',
            answer: 'O trading de criptomoedas envolve a compra e venda de moedas digitais com o objetivo de obter lucro. Nossa plataforma oferece ferramentas avançadas de análise técnica, gráficos em tempo real e execução rápida de ordens para maximizar suas oportunidades de trading.',
        },
        {
            id: 'item-2',
            question: 'Quais são as taxas de trading?',
            answer: 'Nossas taxas são competitivas e transparentes. Para traders iniciantes, cobramos 0.1% por transação. Usuários Premium pagam apenas 0.05%, enquanto traders Professional têm taxas reduzidas de 0.025%. Não há taxas ocultas.',
        },
        {
            id: 'item-3',
            question: 'É seguro investir através da plataforma?',
            answer: 'Sim, a segurança é nossa prioridade máxima. Utilizamos criptografia de nível bancário, autenticação de dois fatores, armazenamento a frio para a maioria dos fundos e auditoria regular de segurança por empresas especializadas.',
        },
        {
            id: 'item-4',
            question: 'Posso começar com pouco dinheiro?',
            answer: "Absolutamente! Você pode começar com apenas R$ 50. Nossa plataforma suporta trading fracional, permitindo que você invista pequenas quantias em qualquer criptomoeda disponível. É uma ótima forma de aprender sem grandes riscos.",
        },
        {
            id: 'item-5',
            question: 'Como funciona o suporte ao cliente?',
            answer: 'Oferecemos suporte 24/7 através de chat ao vivo, email e nossa base de conhecimento. Usuários Premium e Professional têm acesso prioritário ao suporte, com tempos de resposta ainda mais rápidos.',
        },
        {
            id: 'item-6',
            question: 'Posso usar stop-loss e take-profit?',
            answer: 'Sim! Nossa plataforma oferece diversas ferramentas de gerenciamento de risco, incluindo stop-loss, take-profit, trailing stops e ordens condicionais. Essas ferramentas ajudam a proteger seus investimentos e automatizar suas estratégias.',
        },
    ];

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-xl text-center"
                >
                    <h2 className="text-balance text-3xl font-bold md:text-4xl text-foreground">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-muted-foreground mt-4 text-balance">
                        Encontre respostas rápidas e abrangentes para as perguntas mais comuns sobre nossa plataforma e serviços de trading.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto mt-12 max-w-2xl"
                >
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card border border-border w-full rounded-2xl px-8 py-3 shadow-sm"
                    >
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed border-border"
                            >
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-foreground">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base text-muted-foreground">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8 text-center">
                        Não encontrou o que procura? Entre em contato com nosso{' '}
                        <span className="text-primary font-medium hover:underline cursor-pointer">
                            suporte especializado
                        </span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}