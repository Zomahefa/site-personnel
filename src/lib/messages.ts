import { getAllMessages, addMessage, deleteMessageById } from "@/lib/db";
import { Message } from "@/types";

export async function getMessages(): Promise<Message[]> {
  const rows = await getAllMessages();
  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    createdAt: row.created_at,
  }));
}

export async function addNewMessage(
  name: string,
  email: string,
  phone: string,
  message: string
): Promise<Message> {
  const id = Date.now().toString();
  await addMessage(id, name, email, phone, message);
  return { id, name, email, phone, message, createdAt: new Date().toISOString() };
}

export async function removeMessage(id: string): Promise<boolean> {
  return deleteMessageById(id);
}
