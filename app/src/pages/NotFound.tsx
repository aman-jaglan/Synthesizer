
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-xl px-4">
        <div className="inline-flex items-center px-3 py-1 bg-syn-primary/10 text-syn-primary rounded-full text-sm font-medium mb-6">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-syn-primary rounded-full mr-2"></span>
            <span>404 Error</span>
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-syn-primary to-syn-secondary">
          Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild size="lg" className="flex items-center gap-2">
          <a href="/">
            <Home size={18} />
            <span>Return to Home</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
