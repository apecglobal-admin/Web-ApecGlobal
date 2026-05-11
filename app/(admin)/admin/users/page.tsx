"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, grid2 } from "@/components/admin/AdminUI";
import { Plus, Trash2, Shield } from "lucide-react";

export default function UsersPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any[]>("users", []);
  if (loading) return <p>Đang tải...</p>;

  const update = (i: number, k: string, v: any) => { const d = [...data]; d[i] = { ...d[i], [k]: v }; setData(d); };
  const add = () => setData([...data, { id: String(Date.now()), username: "", password: "", role: "editor", name: "User mới" }]);
  const remove = (i: number) => setData(data.filter((_: any, j: number) => j !== i));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Người Dùng</h1><p style={{ color: "#64748b", fontSize: 13 }}>Quản lý tài khoản quản trị</p></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm user</button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 8, background: "#fef9c3", border: "1px solid #fde68a", marginBottom: 20, fontSize: 13, color: "#92400e" }}>
        <Shield size={16} /> Chỉ Admin mới có quyền truy cập trang này. Mật khẩu được lưu dạng hash.
      </div>

      {data.map((u: any, i: number) => (
        <div key={u.id || i} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{u.name || u.username}</span>
            <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
          </div>
          <div style={grid2}>
            <div><label style={fieldLabel}>Tên hiển thị</label><input style={fieldInput} value={u.name || ""} onChange={e => update(i, "name", e.target.value)} /></div>
            <div><label style={fieldLabel}>Username</label><input style={fieldInput} value={u.username || ""} onChange={e => update(i, "username", e.target.value)} /></div>
            <div><label style={fieldLabel}>Vai trò</label>
              <select style={fieldInput} value={u.role || "editor"} onChange={e => update(i, "role", e.target.value)}>
                <option value="admin">Admin</option><option value="editor">Editor</option>
              </select>
            </div>
            <div><label style={fieldLabel}>Mật khẩu mới (để trống nếu không đổi)</label><input type="password" style={fieldInput} placeholder="••••••" onChange={e => update(i, "newPassword", e.target.value)} /></div>
          </div>
        </div>
      ))}
      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
