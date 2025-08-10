import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ApplicationForm from "@/pages/application-form";
import ViewAgreement from "@/pages/view-agreement";
import Navbar from "@/components/navbar";

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={ApplicationForm} />
        <Route path="/view" component={ViewAgreement} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
