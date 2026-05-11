"use client";
import { useState, useEffect, useCallback } from "react";

export function useAdminData<T>(section: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${section}`);
      const json = await res.json();
      setData(json);
    } catch (err) { console.error(err); }
    setLoading(false);
  }, [section]);

  useEffect(() => { load(); }, [load]);

  const save = async (newData?: T) => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch(`/api/admin/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData ?? data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const addItem = async (item: any) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/${section}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const result = await res.json();
      if (result.success) await load();
      return result;
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    try {
      await fetch(`/api/admin/${section}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await load();
    } catch (err) { console.error(err); }
  };

  return { data, setData, loading, saving, saved, save, load, addItem, deleteItem };
}
