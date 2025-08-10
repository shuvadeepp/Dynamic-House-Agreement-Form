import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Edit, Eye } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Home className="text-primary text-xl" />
            <h1 className="text-xl font-semibold text-gray-900">
              House Agreement Application
            </h1>
          </div>
          <nav className="flex space-x-4">
            <Link href="/">
              <Button
                variant={location === "/" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
                data-testid="nav-form"
              >
                <Edit size={16} />
                Application Form
              </Button>
            </Link>
            <Link href="/view">
              <Button
                variant={location === "/view" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
                data-testid="nav-view"
              >
                <Eye size={16} />
                View Agreement
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
