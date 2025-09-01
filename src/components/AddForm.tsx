import { useState } from "react";

type Props = { onAdd: (title: string) => void };

export default function AddForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText("");
  };

  return (
    <form onSubmit={submit} className="form">
      <input
        className="input"
        placeholder="Nuevo elemento…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn-primary" type="submit">Agregar</button>
    </form>
  );
}
