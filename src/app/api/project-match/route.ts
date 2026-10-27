import { NextResponse } from "next/server";
import { chatCompletion } from "@/lib/groq";

const SYSTEM_PROMPT = `Tu es Zo Mahefa RANAIVO, développeur. Un visiteur décrit son besoin.

Ta mission : reformuler son besoin sous forme de fonctionnalités concrètes, sans jargon technique. Le client ne connaît pas et ne veut pas connaître les technologies. Il veut comprendre CE QUE tu vas lui livrer.

RÈGLES STRICTES :
- Décris les FONCTIONNALITÉS (ce que l'app fera pour lui)
- Zéro jargon tech : ne cite AUCUNE technologie (ni Spring Boot, ni Docker, ni PostgreSQL, ni React, etc.)
- Parle en termes métier : "gestion des inscriptions", "suivi des paiements", "emploi du temps en ligne", "tableau de bord"
- Sois court : 3-4 phrases max
- Termine par : "Discutons-en ensemble — rendez-vous sur la section Contactez moi pour m'écrire et nous construirons une solution adaptée à votre établissement."

EXEMPLE de réponse attendue (à respecter impérativement) :
"Pour informatiser votre école, je peux créer une plateforme qui centralise la gestion des inscriptions, le suivi des paiements d'écolage, les notes et les emplois du temps. Vous aurez un tableau de bord pour suivre en temps réel les statistiques de votre établissement. Les parents pourront consulter les résultats de leurs enfants en ligne. Discutons-en ensemble — rendez-vous sur la section Contactez moi pour m'écrire et nous construirons une solution adaptée à votre établissement."

EXEMPLE À ÉVITER (trop technique) :
"Je peux utiliser Spring Boot avec PostgreSQL et Docker..." → INTERDIT.`;

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Description requise" },
        { status: 400 }
      );
    }

    const reply = await chatCompletion([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${description}. Explique-moi ce que tu peux faire pour moi.`,
      },
    ]);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'analyse" },
      { status: 500 }
    );
  }
}
