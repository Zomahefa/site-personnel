"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Props {
  password: string;
  table: string;
  title: string;
  fields: { key: string; label: string; type: "text" | "textarea" | "json" }[];
}

export function AdminCms({ password, table, title, fields }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  async function fetchItems() {
    const res = await fetch(`/api/cms?table=${table}`, {
      headers: { Authorization: `Bearer ${password}` },
    });
    if (res.ok) setItems(await res.json());
  }

  useEffect(() => { fetchItems(); }, []);

  function resetForm() {
    setEditId(null);
    const init: Record<string, string> = {};
    fields.forEach((f) => (init[f.key] = ""));
    setForm(init);
  }

  function openNew() {
    resetForm();
    setOpen(true);
  }

  function openEdit(item: any) {
    setEditId(item.id);
    const vals: Record<string, string> = {};
    fields.forEach((f) => {
      const v = item[f.key];
      vals[f.key] =
        f.type === "json" && Array.isArray(v) ? v.join(", ") : String(v ?? "");
    });
    setForm(vals);
    setOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, any> = {};
    fields.forEach((f) => {
      const v = form[f.key]?.trim() || "";
      body[f.key] = f.type === "json" ? v.split(",").map((s) => s.trim()).filter(Boolean) : v;
    });
    body.sort_order = items.length;

    try {
      const url = editId ? `/api/cms/${editId}?table=${table}` : `/api/cms?table=${table}`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const d = await res.json();
        toast.error(d.error || "Erreur");
        return;
      }

      toast.success(editId ? "Modifié" : "Ajouté");
      setOpen(false);
      fetchItems();
    } catch {
      toast.error("Erreur");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ?")) return;
    const res = await fetch(`/api/cms/${id}?table=${table}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${password}` },
    });
    if (res.ok) {
      toast.success("Supprimé");
      fetchItems();
    } else {
      toast.error("Erreur");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title} ({items.length})</h2>
        <Button size="sm" onClick={openNew}>
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">{item.title || item.category}</h3>
                    {item.company && (
                      <p className="text-xs text-muted-foreground">{item.company}</p>
                    )}
                    {item.period && (
                      <p className="text-xs text-muted-foreground/60">{item.period}</p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(item)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">Aucun élément.</p>
        )}
      </div>

      <Dialog open={open} onOpenChange={(v) => { if (!v) { setOpen(false); resetForm(); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>{editId ? "Modifier" : "Ajouter"}</DialogTitle>
          <DialogDescription>Modifiez les champs ci-dessous.</DialogDescription>
          <form onSubmit={handleSave} className="space-y-4 mt-4">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label>{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea
                    rows={3}
                    value={form[f.key] || ""}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                ) : (
                  <Input
                    value={form[f.key] || ""}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={
                      f.type === "json"
                        ? "Séparés par des virgules"
                        : undefined
                    }
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => { setOpen(false); resetForm(); }}>
                <X className="mr-2 h-4 w-4" /> Annuler
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> {editId ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
