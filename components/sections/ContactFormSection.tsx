"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks";
import { User, Mail, Phone, ChevronDown, Send, CheckCircle } from "lucide-react";

const interests = [
  "Bất động sản",
  "Năng lượng tái tạo",
  "Công nghệ",
  "Tài chính",
  "Thương mại",
  "Logistics",
  "Khác",
];

export default function ContactFormSection() {
  const { ref, isInView } = useInView(0.2);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      id="dang-ky-tu-van"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #020B1A 0%, #071629 30%, #0D2847 60%, #0A1628 100%)",
        }}
      />
      <div className="absolute inset-0 bg-tech-grid opacity-20" />

      {/* Glow effects */}
      <div
        className="glow-orb w-96 h-96 opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,102,255,0.5), transparent)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container-apec relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label">Liên hệ ngay</div>
            <h2 className="section-title mb-6">
              Đăng Ký{" "}
              <span className="text-gradient-blue">Nhận Tư Vấn</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Đội ngũ chuyên gia APEC Global sẵn sàng tư vấn và đồng hành cùng
              bạn trên hành trình đầu tư và phát triển doanh nghiệp.
            </p>

            <div className="space-y-5">
              {[
                { icon: "📞", title: "Hotline 24/7", value: "1800 1234" },
                { icon: "📧", title: "Email hỗ trợ", value: "info@apecglobal.vn" },
                { icon: "🏢", title: "Văn phòng", value: "Tầng 15, Apec Tower, Hà Nội" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="icon-circle-sm flex-shrink-0">
                    <span className="text-sm">{item.icon}</span>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">{item.title}</div>
                    <div className="text-white font-medium text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="card-glass p-8">
              {submitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-white text-xl mb-2">
                    Gửi thành công!
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ làm việc.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", interest: "", message: "" }); }}
                    className="mt-6 btn-outline text-sm"
                  >
                    Gửi yêu cầu khác
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <h3 className="font-display font-bold text-white text-xl mb-1">
                      Đăng Ký Tư Vấn Miễn Phí
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Điền thông tin – Chuyên gia sẽ liên hệ ngay
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Họ và tên *"
                        required
                        className="input-apec pl-10"
                        id="contact-name"
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Số điện thoại *"
                        required
                        className="input-apec pl-10"
                        id="contact-phone"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Địa chỉ email *"
                      required
                      className="input-apec pl-10"
                      id="contact-email"
                    />
                  </div>

                  {/* Interest */}
                  <div className="relative">
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="input-apec appearance-none pr-10"
                      id="contact-interest"
                    >
                      <option value="" disabled>
                        Lĩnh vực quan tâm
                      </option>
                      {interests.map((item) => (
                        <option key={item} value={item} className="bg-navy-900">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    id="contact-submit"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                        </svg>
                        Đang gửi...
                      </span>
                    ) : (
                      <>
                        Gửi thông tin
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-slate-600 text-xs text-center">
                    Thông tin của bạn sẽ được bảo mật tuyệt đối
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
