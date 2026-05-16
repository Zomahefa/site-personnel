"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  GitPullRequest,
  Eye,
  Send,
  Loader2,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Project } from "@/types";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: Props) {
  const [open, setOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"critique" | "contribuer">(
    "critique"
  );
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function openFeedback(type: "critique" | "contribuer") {
    setFeedbackType(type);
    setForm({
      name: "",
      email: "",
      phone: "",
      message:
        type === "contribuer"
          ? `Bonjour, je souhaite contribuer au projet "${project.title}". Voici comment je peux aider :\n\n`
          : `Bonjour, j'aimerais donner mon avis ou faire une suggestion concernant le projet "${project.title}".\n\n`,
    });
    setFeedbackOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Tous les champs sont requis");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur");
      toast.success("Message envoyé ! Je vous répondrai rapidement.");
      setFeedbackOpen(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="relative h-48 overflow-hidden bg-muted">
            <Image
              src={project.image || `/api/project-image?title=${encodeURIComponent(project.title)}&category=${project.category}`}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <Badge
                variant={
                  project.category === "fullstack" || project.category === "mobile"
                    ? "secondary"
                    : "outline"
                }
                className="capitalize"
              >
                {project.category === "fullstack" && "Fullstack"}
                {project.category === "devops" && "DevOps"}
                {project.category === "mobile" && "Mobile"}
                {project.category === "admin" && "Admin Réseau"}
              </Badge>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </CardContent>
          <CardFooter className="flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              Plus de détails
            </Button>
            {project.github && (
              <span className="inline-flex items-center justify-center h-7 px-2.5 rounded-lg border border-border bg-muted text-muted-foreground text-[0.8rem] font-medium cursor-not-allowed opacity-50">
                <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                Code
              </span>
            )}
            <button
              onClick={() => openFeedback("critique")}
              className="inline-flex items-center justify-center h-7 px-2.5 rounded-lg border border-border bg-background text-[0.8rem] font-medium hover:bg-muted transition-colors cursor-pointer"
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              Critiques
            </button>
            <button
              onClick={() => openFeedback("contribuer")}
              className="inline-flex items-center justify-center h-7 px-2.5 rounded-lg border border-border bg-background text-[0.8rem] font-medium hover:bg-muted transition-colors cursor-pointer"
            >
              <GitPullRequest className="mr-1.5 h-3.5 w-3.5" />
              Contribuer
            </button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Details modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-2xl font-bold">
            {project.title}
          </DialogTitle>
          <div className="relative h-56 sm:h-72 rounded-lg overflow-hidden bg-muted mt-4">
            <Image
              src={project.image || `/api/project-image?title=${encodeURIComponent(project.title)}&category=${project.category}`}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {project.github && (
              <span className="inline-flex items-center justify-center h-8 px-3 rounded-lg border border-border bg-muted text-muted-foreground text-xs font-medium cursor-not-allowed opacity-50">
                <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                Code
              </span>
            )}
            <button
              onClick={() => {
                setOpen(false);
                openFeedback("critique");
              }}
              className="inline-flex items-center justify-center h-8 px-3 rounded-lg border border-border bg-background text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              Suggestions
            </button>
            <button
              onClick={() => {
                setOpen(false);
                openFeedback("contribuer");
              }}
              className="inline-flex items-center justify-center h-8 px-3 rounded-lg border border-border bg-background text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
            >
              <GitPullRequest className="mr-1.5 h-3.5 w-3.5" />
              Contribuer
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback modal */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            {feedbackType === "contribuer"
              ? `Contribuer à ${project.title}`
              : `Critiques & Suggestions — ${project.title}`}
          </DialogTitle>
          <DialogDescription>
            {feedbackType === "contribuer"
              ? "Dites-moi comment vous souhaitez contribuer à ce projet."
              : "Partagez vos idées pour améliorer ce projet."}
          </DialogDescription>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`fb-name-${project.id}`}>
                Nom complet <span className="text-destructive">*</span>
              </Label>
              <Input
                id={`fb-name-${project.id}`}
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`fb-email-${project.id}`}>
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={`fb-email-${project.id}`}
                  type="email"
                  placeholder="vous@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`fb-phone-${project.id}`}>
                  Téléphone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={`fb-phone-${project.id}`}
                  type="tel"
                  placeholder="+261 XX XX XXX XX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`fb-msg-${project.id}`}>
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id={`fb-msg-${project.id}`}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
