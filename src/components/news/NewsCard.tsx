import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock } from "lucide-react";
import type { NewsArticle } from "@/types";

interface NewsCardProps {
  news: NewsArticle;
  showAuthor?: boolean;
}

export const NewsCard = ({ news, showAuthor = false }: NewsCardProps) => {
  return (
    <Link to={`/noticias/${news.slug}`} className="group">
      <article className="flex flex-col gap-2 hover:opacity-75 cursor-pointer transition-opacity">
        <div 
          className="rounded-md aspect-video mb-4 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300" 
          style={{ backgroundImage: `url('${news.featuredImage}')` }}
        />
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
            {news.category}
          </span>
          <Clock className="w-3 h-3" />
          <span>{news.readTime} min de leitura</span>
        </div>

        <h3 className="text-xl tracking-tight group-hover:text-primary transition-colors">
          {news.title}
        </h3>
        
        <p className="text-muted-foreground text-base line-clamp-3">
          {news.excerpt}
        </p>

        {showAuthor && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
            <img 
              src={news.author.avatar} 
              alt={news.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{news.author.name}</span>
              <span className="text-xs text-muted-foreground">
                {format(news.publishedAt, "dd 'de' MMMM, yyyy", { locale: ptBR })}
              </span>
            </div>
          </div>
        )}
      </article>
    </Link>
  );
};