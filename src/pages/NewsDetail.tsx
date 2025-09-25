import { useParams, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Clock, Share2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { NewsCard } from "@/components/news/NewsCard";
import { getNewsBySlug, getRelatedNews } from "@/data/news";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/noticias" replace />;
  }

  const news = getNewsBySlug(slug);
  
  if (!news) {
    return <Navigate to="/noticias" replace />;
  }

  const relatedNews = getRelatedNews(news.id, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <Link to="/noticias">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
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
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="capitalize">
                {news.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{news.readTime} min de leitura</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <img 
                  src={news.author.avatar} 
                  alt={news.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{news.author.name}</h3>
                  <p className="text-sm text-muted-foreground">{news.author.bio}</p>
                </div>
              </div>
              
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90 prose-li:text-foreground/90"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
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