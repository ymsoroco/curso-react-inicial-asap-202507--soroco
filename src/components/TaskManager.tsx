import AddForm from "./AddForm";
import ItemRow from "./ItemRow";
import type { Item } from "../types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addItem, removeItem, toggleDone, editTitle, setItems } from "../store/itemsSlice";

export default function TaskManager() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.items);

  useEffect(() => {
    const raw = localStorage.getItem("items");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Item[];
      if (Array.isArray(parsed)) dispatch(setItems(parsed));
    } catch {}
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="card">
      <h1 className="title">Evaluación React</h1>

      <AddForm onAdd={(title) => dispatch(addItem(title))} />
      <ul className="list">
        {items.length === 0 ? (
          <li className="muted">No hay ítems</li>
        ) : (
          items.map((it: Item) => (
            <ItemRow
              key={it.id}
              item={it}
              onToggle={(id) => dispatch(toggleDone(id))}
              onDelete={(id) => dispatch(removeItem(id))}
              onEdit={(id, title) => dispatch(editTitle({ id, title }))}
            />
          ))
        )}
      </ul>
    </div>
  );
}
