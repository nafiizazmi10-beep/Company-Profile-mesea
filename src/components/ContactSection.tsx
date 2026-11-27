"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export default function ContactSection() {
  const { contact } = siteConfig;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Kerja Sama Penerbitan (Publishing)",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "Kerja Sama Penerbitan (Publishing)",
        message: "",
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#08101E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60C1E5] bg-[#11223D] px-3.5 py-1.5 rounded-full border border-[#1F3F6D]">
            Hubungi Kami
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
            Mari Bangun Kolaborasi Menakjubkan
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Punya penawaran kerja sama publisher, proyek co-development, atau sekadar ingin menyapa tim kami? Hubungi kami langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Info Cards & Form */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* 4 Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="p-4 rounded-xl bg-[#11223D] border border-[#1F3F6D] flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#005A9C]/30 text-[#60C1E5] border border-[#60C1E5]/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Alamat Studio
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-white mt-1 leading-snug">
                    {contact.address}
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-xl bg-[#11223D] border border-[#1F3F6D] flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#005A9C]/30 text-[#60C1E5] border border-[#60C1E5]/30 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    WhatsApp & Telepon
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-white mt-1">
                    {contact.phone}
                  </p>
                  <a
                    href={`https://wa.me/${contact.whatsappClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#60C1E5] hover:underline mt-0.5 inline-block font-semibold"
                  >
                    {contact.whatsapp} (WA Langsung)
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl bg-[#11223D] border border-[#1F3F6D] flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#005A9C]/30 text-[#60C1E5] border border-[#60C1E5]/30 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Email Korespondensi
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-white mt-1">
                    {contact.email}
                  </p>
                  <p className="text-xs text-[#A0E0EF] mt-0.5">
                    {contact.businessEmail}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 rounded-xl bg-[#11223D] border border-[#1F3F6D] flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#005A9C]/30 text-[#60C1E5] border border-[#60C1E5]/30 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Jam Operasional
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-white mt-1">
                    {contact.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#11223D] border border-[#1F3F6D] shadow-xl">
              <h3 className="font-heading text-lg font-bold text-white mb-4">
                Kirim Pesan Langsung
              </h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#005A9C]/20 border border-[#60C1E5]/40 text-center space-y-2 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-[#60C1E5] mx-auto" />
                  <h4 className="text-base font-bold text-white">
                    Terima Kasih atas Pesan Anda!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Tim kami akan segera membalas melalui email atau nomor WhatsApp yang Anda cantumkan.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-slate-300 mb-1.5"
                      >
                        Nama Lengkap <span className="text-[#60C1E5]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Contoh: Raden Wijaya"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] focus:ring-1 focus:ring-[#60C1E5] text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-slate-300 mb-1.5"
                      >
                        Alamat Email <span className="text-[#60C1E5]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="nama@perusahaan.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] focus:ring-1 focus:ring-[#60C1E5] text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-slate-300 mb-1.5"
                      >
                        Nomor WhatsApp
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+62 8..."
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] focus:ring-1 focus:ring-[#60C1E5] text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="topic"
                        className="block text-xs font-semibold text-slate-300 mb-1.5"
                      >
                        Kebutuhan / Topik
                      </label>
                      <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) =>
                          setFormData({ ...formData, topic: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white focus:outline-none focus:border-[#60C1E5] focus:ring-1 focus:ring-[#60C1E5] text-sm transition-all"
                      >
                        <option>Kerja Sama Penerbitan (Publishing)</option>
                        <option>Layanan Pembuatan Game (Full-Cycle)</option>
                        <option>Jasa Outsourcing 3D Art & Animasi</option>
                        <option>Karir & Magang</option>
                        <option>Pertanyaan Umum Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      Pesan Anda <span className="text-[#60C1E5]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Ceritakan detail proyek atau pertanyaan Anda secara ringkas..."
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0B1528] border border-[#1F3F6D] text-white placeholder-slate-500 focus:outline-none focus:border-[#60C1E5] focus:ring-1 focus:ring-[#60C1E5] text-sm resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#005A9C] via-[#60C1E5] to-[#A0E0EF] text-[#0B1528] hover:opacity-95 shadow-lg shadow-[#005A9C]/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#60C1E5]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Embedded Google Maps */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[460px] rounded-2xl overflow-hidden border border-[#1F3F6D] bg-[#11223D] flex flex-col shadow-xl">
              {/* Map Header Bar */}
              <div className="p-3.5 bg-[#0B1528] border-b border-[#1F3F6D] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#60C1E5]" />
                  <span className="font-semibold text-white">
                    Peta Lokasi & Navigasi
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#1B365D] text-[10px] text-[#A0E0EF] font-mono border border-[#60C1E5]/30">
                  GOOGLE MAPS
                </span>
              </div>

              {/* Map Live Iframe */}
              <div className="relative flex-1 w-full bg-[#08101E] overflow-hidden min-h-[340px]">
                <iframe
                  title="Peta Lokasi MeSea Studio"
                  src={contact.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Navigation Button */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0B1528]/90 backdrop-blur-md border border-[#60C1E5]/50 text-white hover:text-[#60C1E5] text-xs font-semibold flex items-center justify-center gap-2 shadow-xl hover:bg-[#11223D] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#60C1E5]" />
                    <span>Buka Rute di Google Maps Langsung</span>
                  </a>
                </div>
              </div>

              {/* Transit & Parking Info Bar */}
              <div className="p-3.5 bg-[#11223D] border-t border-[#1F3F6D] text-[11px] sm:text-xs text-slate-300">
                <span>{contact.transitNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

