import { getAllMessages, addMessage, deleteMessageById } from "@/lib/db";
import { Message } from "@/types";

export function getMessages(): Message[] {
  const rows = getAllMessages();
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    createdAt: row.created_at,
  }));
}

export function addNewMessage(
  name: string,
  email: string,
  phone: string,
  message: string
): Message {
  const id = Date.now().toString();
  addMessage(id, name, email, phone, message);
  return { id, name, email, phone, message, createdAt: new Date().toISOString() };
}

export function removeMessage(id: string): boolean {
  return deleteMessageById(id);
}
