"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animated-section";
import { toast } from "sonner";

export function ProjectMatcher() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleMatch() {
    if (!description.trim()) {
      toast.error("Décrivez votre besoin");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/project-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.reply);
    } catch {
      toast.error("Erreur lors de l'analyse. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="project-matcher" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold mb-3">
            AI Project Match
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Décrivez votre projet ou votre besoin, et l&apos;IA vous recommande
            les compétences et projets les plus pertinents de mon portfolio.
          </p>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 shadow-md">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-4">
                <Textarea
                  placeholder="Ex: Je cherche à créer une application de suivi de livraisons en temps réel avec dashboard..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  onClick={handleMatch}
                  disabled={loading || !description.trim()}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Trouver les projets adaptés
                    </>
                  )}
                </Button>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <div className="flex items-center gap-2 mb-2 text-primary font-medium text-sm">
                    <Lightbulb className="h-4 w-4" />
                    Recommandation IA
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
