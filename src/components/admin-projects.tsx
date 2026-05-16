"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const defaultImage = "/photo-cv.png";

export function AdminProjects({ password }: { password: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const editIdRef = useRef<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"fullstack" | "devops" | "mobile" | "admin">("fullstack");
  const [technologies, setTechnologies] = useState("");
  const [image, setImage] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");

  const isEditing = editIdRef.current !== null;

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
  }

  useEffect(() => { fetchProjects(); }, []);

  function resetForm() {
    editIdRef.current = null;
    setTitle("");
    setDescription("");
    setCategory("fullstack");
    setTechnologies("");
    setImage("");
    setGithub("");
    setDemo("");
  }

  function openNew() {
    resetForm();
    setOpen(true);
  }

  function openEdit(p: any) {
    editIdRef.current = p.id;
    setTitle(p.title);
    setDescription(p.description);
    setCategory(p.category);
    setTechnologies((p.technologies || []).join(", "));
    setImage(p.image || "");
    setGithub(p.github || "");
    setDemo(p.demo || "");
    setOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Titre et description requis");
      return;
    }

    const body = {
      title: title.trim(),
      description: description.trim(),
      category,
      technologies: technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image: image.trim() || "",
      github: github.trim() || "",
      demo: demo.trim() || "",
    };

    try {
      const url = isEditing ? `/api/projects/${editIdRef.current}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erreur");
        return;
      }

      toast.success(isEditing ? "Projet modifié" : "Projet ajouté");
      setOpen(false);
      resetForm();
      fetchProjects();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce projet ?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        toast.success("Projet supprimé");
        fetchProjects();
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Projets ({projects.length})
        </h2>
        <Button size="sm" onClick={openNew}>
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter un projet
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{p.title}</h3>
                      <Badge
                        variant={p.category === "fullstack" ? "secondary" : "outline"}
                        className="text-[10px]"
                      >
                        {p.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(p.technologies || []).map((t: string) => (
                        <Badge key={t} variant="outline" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEdit(p)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {projects.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Aucun projet pour le moment.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={(v) => { if (!v) { setOpen(false); resetForm(); } }}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogTitle>
            {isEditing ? "Modifier le projet" : "Ajouter un projet"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations du projet."
              : "Remplissez les informations du nouveau projet."}
            {!isEditing && (
              <span className="block text-xs text-muted-foreground mt-1">
                Les champs image, GitHub et Démo sont optionnels.
              </span>
            )}
          </DialogDescription>
          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="p-title">
                Titre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="p-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-desc">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="p-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as "fullstack" | "devops" | "mobile" | "admin")
                  }
                  className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  <option value="fullstack">Fullstack</option>
                  <option value="devops">DevOps</option>
                  <option value="mobile">Mobile</option>
                  <option value="admin">Admin Réseau</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-tech">Technologies (virgules)</Label>
                <Input
                  id="p-tech"
                  placeholder="Next.js, Docker, ..."
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-img">
                Image du projet — laisser vide pour utiliser la photo par défaut
              </Label>
              <div className="flex gap-2">
                <Input
                  id="p-img"
                  placeholder={defaultImage}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setImage(defaultImage)}
                  className="shrink-0"
                >
                  Par défaut
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>ou</span>
                <label className="cursor-pointer text-primary hover:underline">
                  <span>Parcourir un fichier</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error("L'image ne doit pas dépasser 2 Mo");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setImage(ev.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="p-gh">GitHub (URL)</Label>
                <Input
                  id="p-gh"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-demo">Démo (URL)</Label>
                <Input
                  id="p-demo"
                  value={demo}
                  onChange={(e) => setDemo(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => { setOpen(false); resetForm(); }}>
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
