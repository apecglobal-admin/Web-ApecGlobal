"use client";

import { useAdminData } from "@/lib/useAdminData";
import { card } from "@/components/admin/AdminUI";
import { Trash2, Phone, Mail, Building, Clock } from "lucide-react";

const safeText = (value: any) => {
  if (value === null || value === undefined) return "";

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[Object]";
    }
  }

  return String(value);
};

export default function LeadsAdminPage() {
  const {
    data: leads,
    loading,
    deleteItem,
    save,
    setData,
  } = useAdminData<any[]>("leads", []);

  if (loading) return <p>Đang tải...</p>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "contacted":
        return "#10b981";

      case "closed":
        return "#64748b";

      default:
        return "#ef4444";
    }
  };

  const updateStatus = (id: string, newStatus: string) => {
    const updated = leads.map((l) =>
      l.id === id
        ? {
            ...l,
            status: newStatus,
          }
        : l
    );

    setData(updated);
    save(updated);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          Quản Lý Yêu Cầu Tư Vấn
        </h1>

        <p style={{ color: "#64748b", fontSize: 13 }}>
          Danh sách khách hàng đăng ký tư vấn từ website
        </p>
      </div>

      <div style={card}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 800,
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #f1f5f9",
                  textAlign: "left",
                }}
              >
                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  KHÁCH HÀNG
                </th>

                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  LIÊN HỆ
                </th>

                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  QUAN TÂM
                </th>

                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  NỘI DUNG
                </th>

                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  TRẠNG THÁI
                </th>

                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#475569",
                  }}
                >
                  THAO TÁC
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: 48,
                      textAlign: "center",
                      color: "#94a3b8",
                      fontStyle: "italic",
                    }}
                  >
                    Chưa có yêu cầu tư vấn nào.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  console.log("LEAD DEBUG:", lead);

                  return (
                    <tr
                      key={safeText(lead.id)}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      <td style={{ padding: "16px" }}>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "#0f172a",
                            fontSize: 14,
                          }}
                        >
                          {safeText(lead.name)}
                        </div>

                        {lead.company && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#64748b",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              marginTop: 4,
                            }}
                          >
                            <Building size={12} />
                            {safeText(lead.company)}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: "16px" }}>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#334155",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Phone
                            size={13}
                            style={{ color: "#2563eb" }}
                          />

                          {safeText(lead.phone)}
                        </div>

                        <div
                          style={{
                            fontSize: 13,
                            color: "#334155",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 4,
                          }}
                        >
                          <Mail
                            size={13}
                            style={{ color: "#2563eb" }}
                          />

                          {safeText(lead.email)}
                        </div>
                      </td>

                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            background: "#f0f7ff",
                            color: "#2563eb",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {safeText(
                            lead.interest || "Chưa phân loại"
                          )}
                        </span>
                      </td>

                      <td style={{ padding: "16px" }}>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#475569",
                            maxWidth: 200,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={safeText(lead.message)}
                        >
                          {safeText(lead.message)}
                        </div>

                        <div
                          style={{
                            fontSize: 11,
                            color: "#94a3b8",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 4,
                          }}
                        >
                          <Clock size={11} />

                          {lead.createdAt
                            ? new Date(
                                lead.createdAt
                              ).toLocaleString("vi-VN")
                            : ""}
                        </div>
                      </td>

                      <td style={{ padding: "16px" }}>
                        <select
                          value={safeText(
                            lead.status || "pending"
                          )}
                          onChange={(e) =>
                            updateStatus(
                              safeText(lead.id),
                              e.target.value
                            )
                          }
                          style={{
                            padding: "4px 8px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            border: "1px solid #e2e8f0",
                            outline: "none",
                            color: "#fff",
                            background: getStatusColor(
                              safeText(
                                lead.status || "pending"
                              )
                            ),
                          }}
                        >
                          <option value="pending">
                            Chờ xử lý
                          </option>

                          <option value="contacted">
                            Đã liên hệ
                          </option>

                          <option value="closed">
                            Đã đóng
                          </option>
                        </select>
                      </td>

                      <td style={{ padding: "16px" }}>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Xóa yêu cầu này?"
                              )
                            ) {
                              deleteItem(
                                safeText(lead.id)
                              );
                            }
                          }}
                          style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            color: "#ef4444",
                            padding: 8,
                            borderRadius: 6,
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}