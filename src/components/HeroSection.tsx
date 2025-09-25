import React from 'react'
import { Mail, SendHorizonal, Menu, X, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { SparklesCore } from '@/components/ui/sparkles'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <main className="overflow-hidden">
            <section className="relative">
                {/* Sparkles Background */}
                <div className="absolute inset-0 w-full h-full">
                    <SparklesCore
                        id="tsparticleshero"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={80}
                        className="w-full h-full"
                        particleColor="#4ADE80"
                        speed={0.8}
                    />
                </div>
                <div className="relative mx-auto max-w-6xl px-6 pt-32 lg:pb-8 lg:pt-48">
                    <div className="relative z-10 mx-auto max-w-6xl text-center">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}
                        >
                            <h1 className="text-balance text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
                                Inovação com <span className="font-bold">Zapyer Hub</span>{" "}
                                <span className="text-gradient">é evoluir com <span className="font-bold">inteligência</span></span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                                Seja parceiro de um ecossistema digital que une comunicação, inteligência artificial, gestão e vendas em soluções integradas, ajudando sua empresa a inovar, simplificar processos e crescer de forma inteligente e sustentável.
                            </p>

                            <form className="mt-12 mx-auto max-w-sm">
                                <div className="bg-background has-[input:focus]:ring-ring relative grid grid-cols-[1fr_auto] pr-1.5 items-center rounded-[1rem] border border-border shadow has-[input:focus]:ring-2 lg:pr-0">
                                    <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4 text-muted-foreground" />

                                    <input
                                        placeholder="Assine nossa Newsletter Grátis"
                                        className="h-12 w-full bg-transparent pl-12 text-foreground placeholder:text-muted-foreground focus:outline-none"
                                        type="email"
                                    />

                                    <div className="md:pr-1.5 lg:pr-0">
                                        <Button
                                            aria-label="Assinar"
                                            size="sm"
                                            className="rounded-[0.5rem] button-gradient">
                                            <span className="hidden md:block">Assinar</span>
                                            <SendHorizonal
                                                className="relative mx-auto size-5 md:hidden"
                                                strokeWidth={2}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            <div
                                aria-hidden
                                className="bg-radial from-primary/50 to-transparent to-55% relative mx-auto mt-32 max-w-2xl text-left"
                            >
                                <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                                    <div className="relative h-96 overflow-hidden rounded-[1.5rem] border border-border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                                </div>
                                <div className="bg-muted/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                                    <div className="bg-background/95 space-y-2 overflow-hidden rounded-[1.5rem] border border-border p-2 shadow-xl backdrop-blur-3xl">
                                        <CryptoDashboard />

                                        <div className="bg-muted/50 rounded-[1rem] p-4 pb-16"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
                            </div>
                        </AnimatedGroup>
                    </div>
                </div>
            </section>
            <CryptoLogos />
        </main>
    )
}

const CryptoDashboard = () => {
    return (
        <div className="relative space-y-3 rounded-[1rem] bg-background/50 p-4 border border-border/20">
            <div className="flex items-center gap-1.5 text-primary">
                <TrendingUp className="size-5" />
                <div className="text-sm font-medium text-foreground">Atendimentos</div>
            </div>
            <div className="space-y-3">
                <div className="text-foreground border-b border-border/20 pb-3 text-sm font-medium">Os seus atendimentos melhorou 62% este mês</div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">527 Leads</span>
                            <span className="text-muted-foreground text-xs">Atendidos este Mês</span>
                        </div>
                        <div className="flex h-5 items-center rounded bg-gradient-to-r from-primary to-emerald-400 px-2 text-xs text-white">+ 62% Este Mês</div>
                    </div>
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">325 Leads</span>
                            <span className="text-muted-foreground text-xs">Atendidos Mês Passado</span>
                        </div>
                        <div className="text-foreground bg-muted/50 flex h-5 w-2/3 items-center rounded px-2 text-xs">Mês Anterior</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CryptoLogos = () => {
    const logos = [
        { name: 'Smart Chat', symbol: '☊' }, 
        { name: 'Smart IA', symbol: '✦' },
        { name: 'Zapyer Sites', symbol: '✓' },
        { name: 'Smart CRM', symbol: '▤' },
        { name: 'Smart Consult', symbol: '↗︎' },
        { name: 'Smart Chat', symbol: '☊' },
        { name: 'Smart IA', symbol: '✦' },
        { name: 'Smart CRM', symbol: '▤' },
    ];

    return (
        <section className="bg-background/50 backdrop-blur-sm pb-8 md:pb-12">
            <div className="group relative m-auto max-w-6xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:border-border md:pr-6">
                        <p className="text-end text-sm text-muted-foreground">Confiável para Empresas que buscam Inovar</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            duration={40}
                            gap={112}>
                            {logos.map((crypto, index) => (
                                <div key={index} className="flex items-center gap-2 px-4">
                                    <span className="text-2xl font-bold text-primary">{crypto.symbol}</span>
                                    <span className="text-sm font-medium text-foreground">{crypto.name}</span>
                                </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}