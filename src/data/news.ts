/**
 * ============================================================================
 * NEWS DATA - MOCK DATA FOR NEWS SYSTEM
 * ============================================================================
 * 
 * Mock data for the news system including complete news articles
 * with metadata, content, and related information.
 */

import type { NewsArticle } from '@/types';

export const newsData: NewsArticle[] = [
  {
    id: "1",
    title: "Como Fazer Seu Primeiro Trade",
    slug: "como-fazer-seu-primeiro-trade",
    excerpt: "Aprenda estratégias essenciais de trading de criptomoedas para maximizar seus lucros.",
    content: `
      <h2>Introdução ao Trading de Criptomoedas</h2>
      <p>O trading de criptomoedas pode parecer intimidador no início, mas com as estratégias certas e conhecimento adequado, você pode começar a operar com confiança. Este guia completo irá te ensinar os primeiros passos.</p>
      
      <h3>1. Configurando sua Conta</h3>
      <p>Antes de começar a negociar, é essencial configurar uma conta segura em uma exchange confiável. Certifique-se de:</p>
      <ul>
        <li>Verificar sua identidade completamente</li>
        <li>Configurar autenticação de dois fatores (2FA)</li>
        <li>Definir senhas fortes e únicas</li>
      </ul>

      <h3>2. Entendendo os Conceitos Básicos</h3>
      <p>Familiarize-se com termos essenciais como:</p>
      <ul>
        <li><strong>Bid/Ask:</strong> Preços de compra e venda</li>
        <li><strong>Spread:</strong> Diferença entre bid e ask</li>
        <li><strong>Volume:</strong> Quantidade negociada</li>
        <li><strong>Market Cap:</strong> Capitalização de mercado</li>
      </ul>

      <h3>3. Sua Primeira Operação</h3>
      <p>Para realizar seu primeiro trade:</p>
      <ol>
        <li>Escolha um par de trading (ex: BTC/USDT)</li>
        <li>Analise o gráfico e identifique tendências</li>
        <li>Defina seu ponto de entrada e saída</li>
        <li>Configure stop-loss para gerenciar riscos</li>
        <li>Execute a operação com uma quantia pequena</li>
      </ol>

      <h3>Conclusão</h3>
      <p>Lembre-se: o trading envolve riscos. Sempre faça sua própria pesquisa e nunca invista mais do que pode perder. Com prática e disciplina, você pode desenvolver suas habilidades de trading.</p>
    `,
    author: {
      id: "1",
      name: "Carlos Silva",
      avatar: "/lovable-uploads/4681b45a-e10b-4a3a-8d17-0b0defcd7032.png",
      bio: "Trader profissional com mais de 5 anos de experiência em criptomoedas"
    },
    publishedAt: new Date('2024-12-01'),
    tags: ["iniciante", "tutorial", "trading"],
    featuredImage: "/lovable-uploads/4681b45a-e10b-4a3a-8d17-0b0defcd7032.png",
    readTime: 8,
    category: "tutorial"
  },
  {
    id: "2",
    title: "Análise de Mercado Avançada",
    slug: "analise-de-mercado-avancada",
    excerpt: "Domine ferramentas de análise técnica para tomar decisões mais informadas em seus trades.",
    content: `
      <h2>Análise Técnica Avançada</h2>
      <p>A análise técnica é fundamental para qualquer trader sério. Este artigo explora técnicas avançadas que podem melhorar significativamente suas decisões de trading.</p>

      <h3>Indicadores Técnicos Essenciais</h3>
      <p>Os indicadores mais eficazes incluem:</p>
      <ul>
        <li><strong>RSI (Relative Strength Index):</strong> Identifica condições de sobrecompra/sobrevenda</li>
        <li><strong>MACD:</strong> Mostra a relação entre duas médias móveis</li>
        <li><strong>Bollinger Bands:</strong> Indica volatilidade e níveis de suporte/resistência</li>
        <li><strong>Volume:</strong> Confirma a força dos movimentos de preço</li>
      </ul>

      <h3>Padrões de Gráfico</h3>
      <p>Reconhecer padrões é crucial:</p>
      <ul>
        <li>Triângulos (ascendente, descendente, simétrico)</li>
        <li>Ombro-cabeça-ombro</li>
        <li>Bandeiras e flâmulas</li>
        <li>Duplo topo/fundo</li>
      </ul>

      <h3>Estratégias de Confirmação</h3>
      <p>Nunca se baseie em um único indicador. Use múltiplas confirmações:</p>
      <ol>
        <li>Combine indicadores de momentum e tendência</li>
        <li>Observe o volume para validar breakouts</li>
        <li>Considere timeframes diferentes</li>
        <li>Analise o sentimento do mercado</li>
      </ol>

      <h3>Conclusão</h3>
      <p>A análise técnica é uma habilidade que se desenvolve com o tempo. Pratique consistentemente e mantenha um journal de trading para rastrear seu progresso.</p>
    `,
    author: {
      id: "2",
      name: "Ana Costa",
      avatar: "/lovable-uploads/61b45282-5735-4bef-8996-557611b71182.png",
      bio: "Analista técnica certificada e educadora em mercados financeiros"
    },
    publishedAt: new Date('2024-11-28'),
    tags: ["análise técnica", "indicadores", "avançado"],
    featuredImage: "/lovable-uploads/61b45282-5735-4bef-8996-557611b71182.png",
    readTime: 12,
    category: "analise"
  },
  {
    id: "3",
    title: "Gestão de Risco no Trading",
    slug: "gestao-de-risco-no-trading",
    excerpt: "Aprenda a proteger seu capital com estratégias eficazes de gerenciamento de risco.",
    content: `
      <h2>A Importância da Gestão de Risco</h2>
      <p>A gestão de risco é o aspecto mais crucial do trading. Sem ela, mesmo os melhores traders podem perder tudo. Este guia ensina como proteger seu capital.</p>

      <h3>Regra dos 2%</h3>
      <p>Nunca arrisque mais de 2% do seu capital em uma única operação. Esta regra simples pode salvar sua conta de trading:</p>
      <ul>
        <li>Se você tem R$ 10.000, não arrisque mais de R$ 200 por trade</li>
        <li>Use stop-loss para limitar perdas</li>
        <li>Calcule o tamanho da posição baseado no risco</li>
      </ul>

      <h3>Diversificação Inteligente</h3>
      <p>Não coloque todos os ovos na mesma cesta:</p>
      <ul>
        <li>Diversifique entre diferentes criptomoedas</li>
        <li>Use estratégias complementares</li>
        <li>Varie os timeframes de suas operações</li>
        <li>Considere correlações entre ativos</li>
      </ul>

      <h3>Psicologia do Risco</h3>
      <p>O maior inimigo do trader é ele mesmo. Controle suas emoções:</p>
      <ol>
        <li>Defina regras claras e siga-as</li>
        <li>Não persiga perdas com posições maiores</li>
        <li>Aceite que perdas fazem parte do jogo</li>
        <li>Mantenha um journal de trading</li>
      </ol>

      <h3>Ferramentas de Gestão de Risco</h3>
      <p>Use a tecnologia a seu favor:</p>
      <ul>
        <li>Stop-loss automático</li>
        <li>Take-profit predefinido</li>
        <li>Trailing stops</li>
        <li>Alertas de preço</li>
      </ul>

      <h3>Conclusão</h3>
      <p>Lembre-se: é melhor ganhar menos com segurança do que perder tudo por ganância. A consistência vence a agressividade no longo prazo.</p>
    `,
    author: {
      id: "3",
      name: "Roberto Mendes",
      avatar: "/lovable-uploads/de08f44e-da14-467d-882c-67f893cdd9b7.png",
      bio: "Especialista em gestão de risco com 10 anos de experiência em mercados financeiros"
    },
    publishedAt: new Date('2024-11-25'),
    tags: ["gestão de risco", "psicologia", "estratégia"],
    featuredImage: "/lovable-uploads/de08f44e-da14-467d-882c-67f893cdd9b7.png",
    readTime: 10,
    category: "educacao"
  },
  {
    id: "4",
    title: "Tendências do Mercado Cripto",
    slug: "tendencias-do-mercado-cripto",
    excerpt: "Fique por dentro das últimas tendências e oportunidades no mercado de criptomoedas.",
    content: `
      <h2>O Futuro das Criptomoedas</h2>
      <p>O mercado de criptomoedas está em constante evolução. Entender as tendências emergentes pode te dar uma vantagem competitiva significativa.</p>

      <h3>DeFi e Yield Farming</h3>
      <p>As finanças descentralizadas continuam revolucionando o setor:</p>
      <ul>
        <li>Protocolos de empréstimo descentralizados</li>
        <li>Pools de liquidez automatizados</li>
        <li>Staking e yield farming</li>
        <li>Governança descentralizada (DAOs)</li>
      </ul>

      <h3>NFTs e Metaverso</h3>
      <p>Além do hype, aplicações reais estão emergindo:</p>
      <ul>
        <li>Arte digital e colecionáveis</li>
        <li>Gaming e play-to-earn</li>
        <li>Imóveis virtuais</li>
        <li>Identidade digital</li>
      </ul>

      <h3>Layer 2 e Escalabilidade</h3>
      <p>Soluções para os problemas de escalabilidade:</p>
      <ol>
        <li>Polygon e sidechains</li>
        <li>Lightning Network para Bitcoin</li>
        <li>Rollups otimistas e ZK</li>
        <li>Sharding no Ethereum 2.0</li>
      </ol>

      <h3>Regulamentação Global</h3>
      <p>O cenário regulatório está se definindo:</p>
      <ul>
        <li>CBDCs (moedas digitais de bancos centrais)</li>
        <li>Frameworks regulatórios claros</li>
        <li>Compliance e KYC obrigatórios</li>
        <li>Tributação de criptomoedas</li>
      </ul>

      <h3>Oportunidades de Investimento</h3>
      <p>Setores promissores para 2024:</p>
      <ul>
        <li>Infraestrutura blockchain</li>
        <li>Soluções de privacidade</li>
        <li>Interoperabilidade entre blockchains</li>
        <li>Web3 e aplicações descentralizadas</li>
      </ul>

      <h3>Conclusão</h3>
      <p>Mantenha-se informado sobre as tendências, mas sempre faça sua própria pesquisa. O mercado cripto é volátil e requer cautela.</p>
    `,
    author: {
      id: "4",
      name: "Mariana Santos",
      avatar: "/lovable-uploads/d4235e74-39e5-47b2-a294-9e825d81c7f0.png",
      bio: "Pesquisadora blockchain e analista de mercado especializada em criptomoedas"
    },
    publishedAt: new Date('2024-11-22'),
    tags: ["tendências", "mercado", "futuro"],
    featuredImage: "/lovable-uploads/d4235e74-39e5-47b2-a294-9e825d81c7f0.png",
    readTime: 15,
    category: "mercado"
  }
];

export const getNewsBySlug = (slug: string): NewsArticle | undefined => {
  return newsData.find(news => news.slug === slug);
};

export const getRelatedNews = (currentId: string, limit: number = 3): NewsArticle[] => {
  return newsData
    .filter(news => news.id !== currentId)
    .slice(0, limit);
};

export const getNewsByCategory = (category: string): NewsArticle[] => {
  return newsData.filter(news => news.category === category);
};