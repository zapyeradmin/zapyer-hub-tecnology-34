import { useParams, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Clock, Calendar, MessageCircle, Instagram, Facebook, Twitter, Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { NewsCard } from "@/components/news/NewsCard";
import { getNewsBySlug, getRelatedNews } from "@/data/news";
import { useState } from "react";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copySuccess, setCopySuccess] = useState(false);
  
  if (!slug) {
    return <Navigate to="/noticias" replace />;
  }

  const news = getNewsBySlug(slug);
  
  if (!news) {
    return <Navigate to="/noticias" replace />;
  }

  const relatedNews = getRelatedNews(news.id, 3);

  const currentUrl = window.location.href;
  const shareText = `${news.title} - ${news.excerpt}`;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${shareText}\n\n${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(news.title);
    const body = encodeURIComponent(`${shareText}\n\nLeia mais em: ${currentUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      toast.success("Link copiado com sucesso!");
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      toast.error("Erro ao copiar o link");
    }
  };

  const handleShareInstagram = () => {
    // Instagram doesn't have direct sharing, so we copy the link and show instructions
    handleCopyLink();
    toast.info("Link copiado! Cole nos seus stories do Instagram");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <Link to="/noticias">
            <Button variant="ghost" className="mb-6 gap-2 hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-4 h-4 text-primary" />
              Voltar para notícias
            </Button>
          </Link>
        </div>

        {/* Article */}
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Featured Image */}
          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img 
              src={news.featuredImage} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Header */}
          <header className="mb-8 bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl border border-primary/10">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <Badge className="capitalize bg-primary text-white hover:bg-primary/90">
                {news.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>{news.readTime} min de leitura</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{format(news.publishedAt, "dd 'de' MMMM, yyyy", { locale: ptBR })}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {news.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {news.excerpt}
            </p>

            {/* Author and Share */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <img 
                  src={news.author.avatar} 
                  alt={news.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h3 className="font-medium">{news.author.name}</h3>
                  <p className="text-sm text-muted-foreground">{news.author.bio}</p>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10 hover:border-primary/40">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Compartilhar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleShareWhatsApp} className="gap-2 cursor-pointer">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShareInstagram} className="gap-2 cursor-pointer">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    Instagram
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShareFacebook} className="gap-2 cursor-pointer">
                    <Facebook className="w-4 h-4 text-blue-500" />
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShareTwitter} className="gap-2 cursor-pointer">
                    <Twitter className="w-4 h-4 text-sky-500" />
                    X (Twitter)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShareEmail} className="gap-2 cursor-pointer">
                    <Mail className="w-4 h-4 text-gray-500" />
                    E-mail
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
                    {copySuccess ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-primary" />
                    )}
                    {copySuccess ? "Copiado!" : "Copiar link"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="article-content prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90 prose-li:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-primary/20">
            <h3 className="text-sm font-medium mb-3 text-primary">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <Badge key={tag} className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-8">Notícias relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} news={relatedArticle} showAuthor />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;