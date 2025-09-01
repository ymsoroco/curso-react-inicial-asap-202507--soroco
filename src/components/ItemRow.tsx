import { useState } from "react";
import type { Item } from "../types";

type Props = {
  item: Item;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export default function ItemRow({ item, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.title);

  const save = () => {
    const t = draft.trim();
    if (!t) return;
    onEdit(item.id, t);
    setEditing(false);
  };

  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => onToggle(item.id)}
        title="hecho / deshacer"
      />

      {editing ? (
        <>
          <input
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button className="btn" onClick={save}>Guardar</button>
          <button
            className="btn ghost"
            onClick={() => { setEditing(false); setDraft(item.title); }}
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <span className={`title ${item.done ? "done" : ""}`}>{item.title}</span>
          <button className="btn" onClick={() => setEditing(true)}>Editar</button>
          <button className="btn danger" onClick={() => onDelete(item.id)}>Eliminar</button>
        </>
      )}
    </li>
  );
}
