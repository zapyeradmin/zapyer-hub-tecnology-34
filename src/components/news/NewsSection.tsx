import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { newsData } from "@/data/news";
import { NewsCard } from "./NewsCard";

const NewsSection = () => {
  // Show only the first 4 news articles
  const featuredNews = newsData.slice(0, 4);

  return (
    <div className="w-full py-12 lg:py-12">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Últimas notícias
          </h4>
          <Link to="/noticias">
            <Button className="gap-4">
              Ver todas as notícias <MoveRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { NewsSection };