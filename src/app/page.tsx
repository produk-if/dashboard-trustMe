"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown, Menu, X, Star, Zap, MapPin, Smartphone,
  MessageCircle, Utensils, Search, Bell, Home, User,
  Github, Linkedin, Instagram
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import Image from "next/image"

// Phone Mockup Component for Hero Illustration
const PhoneMockup = () => (
  <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-500 z-20 mx-auto lg:mx-0">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-30"></div>
    <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative flex flex-col">
      {/* App Header */}
      <div className="bg-primary/5 p-4 pt-8 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">TM</div>
          <div className="font-heading font-bold text-sm">TrustMe</div>
        </div>
        <Bell className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* App Content */}
      <div className="p-4 space-y-4 flex-1 overflow-hidden relative">
        {/* Search Bar */}
        <div className="bg-muted/50 rounded-xl p-3 flex items-center space-x-2 text-muted-foreground text-xs">
          <Search className="w-4 h-4" />
          <span>Mau makan apa hari ini?</span>
        </div>

        {/* Banner */}
        <div className="w-full h-32 bg-gradient-to-br from-primary to-secondary rounded-xl p-4 text-white relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 group-hover:scale-110 transition-transform">🍕</div>
          <div className="font-bold text-lg relative z-10">Diskon 50%</div>
          <div className="text-xs opacity-90 relative z-10">Khusus pengguna baru!</div>
          <button className="mt-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold">Claim Now</button>
        </div>

        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {['🍔', '🍜', '🥗', '🥤', '🍰'].map((emoji, i) => (
            <div key={i} className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center text-xl flex-shrink-0 hover:bg-primary/10 transition-colors cursor-pointer">
              {emoji}
            </div>
          ))}
        </div>

        {/* Restaurant List */}
        <div className="space-y-3">
          {[
            { name: "Burger King", time: "15 min", rating: "4.8", color: "bg-orange-100" },
            { name: "Sushi Tei", time: "25 min", rating: "4.9", color: "bg-blue-100" },
            { name: "SaladStop!", time: "10 min", rating: "4.7", color: "bg-green-100" }
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3 p-2 rounded-xl bg-card shadow-sm border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
              <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center text-xl`}>
                {['🍔', '🍣', '🥗'][i]}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">{item.name}</div>
                <div className="text-[10px] text-muted-foreground flex items-center space-x-2">
                  <span>{item.time}</span>
                  <span>•</span>
                  <span className="flex items-center text-yellow-500"><Star className="w-3 h-3 fill-current mr-0.5" /> {item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bg-background border-t border-border/50 p-4 flex justify-between items-center text-muted-foreground">
        <Home className="w-6 h-6 text-primary" />
        <Search className="w-6 h-6" />
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white -mt-8 shadow-lg shadow-primary/30">
          <Utensils className="w-5 h-5" />
        </div>
        <MessageCircle className="w-6 h-6" />
        <User className="w-6 h-6" />
      </div>

      {/* Floating Notification */}
      <div className="absolute bottom-20 left-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur p-3 rounded-xl shadow-lg border border-primary/20 flex items-center space-x-3 animate-in slide-in-from-bottom-10 duration-1000 delay-500 z-40">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🛵</div>
        <div>
          <div className="text-xs font-bold">Pesanan sedang diantar!</div>
          <div className="text-[10px] text-muted-foreground">Tiba dalam 12 menit</div>
        </div>
      </div>
    </div>
  </div>
)

// Floating Emojis Component
const FloatingEmojis = () => {
  const [items, setItems] = useState<{ top: string, left: string, delay: string, duration: string, emoji: string }[]>([])

  useEffect(() => {
    const emojis = ['🍕', '🍔', '🍟', '🌭', '🍿', '🍩']
    const newItems = emojis.map((emoji, i) => ({
      emoji,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 1.5}s`,
      duration: `${3 + Math.random() * 2}s`
    }))
    setItems(newItems)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-10 animate-float"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* 1. NAVIGATION BAR */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-primary p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
              <span className="font-heading font-bold text-white text-xl">T</span>
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight">TrustMe</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {['Fitur', 'Tentang', 'Download'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group hover:text-primary transition-colors font-heading"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            </button>
            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 font-heading">
              Download App
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl p-4 space-y-4 animate-in slide-in-from-top-5 absolute w-full shadow-xl top-20 left-0 z-40">
            {['Fitur', 'Tentang', 'Download'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-lg font-medium hover:text-primary font-heading"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Button className="w-full justify-center bg-primary text-white font-heading rounded-xl h-12">Download App</Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse duration-[5000ms]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse duration-[7000ms]" />
          <FloatingEmojis />

          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="animate-float inline-block">
                  <Badge variant="outline" className="px-5 py-2 rounded-full border-primary/30 bg-white/50 dark:bg-black/20 backdrop-blur-md text-foreground font-heading text-sm shadow-sm hover:shadow-md transition-all cursor-default">
                    <span className="mr-2">✨</span> Pesan Makanan Terbaik, Cepat, Muraahhh!!
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  Makan Enak <br />
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                    Jadi Gampang
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  Ribuan restoran favorit? Gampang. Dipesan dalam 10 detik? Bisa. Makanannya sampai hangat? Pasti 🔥
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                  <Button size="lg" className="h-14 px-10 rounded-2xl text-lg bg-secondary hover:bg-secondary/90 text-white shadow-xl shadow-secondary/25 w-full sm:w-auto font-heading hover:scale-105 transition-transform duration-300">
                    🚀 Mulai Sekarang
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl text-lg border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/5 w-full sm:w-auto font-heading backdrop-blur-sm">
                    Lihat Demo
                  </Button>
                </div>
              </div>

              {/* Illustration */}
              <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[60px] rounded-full opacity-50" />

                {/* Main Hero Image */}
                <div className="relative z-20 animate-float">
                  <Image
                    src="/asset/pizza-delivery-man-delivering-pizza-using-scooter.svg"
                    alt="Delivery Man"
                    width={600}
                    height={600}
                    className="drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Decorative Floating Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg flex items-center justify-center text-4xl animate-bounce duration-[3000ms] border border-border/50 z-30">
                  🍔
                </div>
                <div className="absolute bottom-20 -left-4 w-16 h-16 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center text-3xl animate-bounce duration-[4000ms] delay-700 border border-border/50 z-30">
                  🥤
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] hidden lg:block">
              <ChevronDown className="h-8 w-8 text-primary opacity-80" />
            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section id="fitur" className="py-24 relative">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Kenapa <span className="text-primary">TrustMe?</span></h2>
              <p className="text-muted-foreground text-lg">
                Fitur-fitur yang bikin experience lu jadi top tier 🔝
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Lokasi Terpercaya",
                  desc: "Cari restoran favorite dimana aja",
                  img: "/asset/delivery-man-checking-delivery-drop-off-location.svg",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10"
                },
                {
                  icon: Zap,
                  title: "Pengiriman Kilat",
                  desc: "Sampe dalam 30-45 menit",
                  img: "/asset/pizza-delivery-man-delivering-fresh-pizza.svg",
                  color: "text-amber-500",
                  bg: "bg-amber-500/10"
                },
                {
                  icon: Star,
                  title: "Kualitas Terjamin",
                  desc: "Semua resto verified, fresh & enak",
                  img: "/asset/female-serving-food-to-man-at-restaurant.svg",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10"
                },
                {
                  icon: Smartphone,
                  title: "Interface Clean",
                  desc: "Simple tapi powerful",
                  img: "/asset/woman-accepting-online-food-delivery-order.svg",
                  color: "text-pink-500",
                  bg: "bg-pink-500/10"
                },
                {
                  icon: Utensils,
                  title: "Promo Setiap Hari",
                  desc: "Deals yang bagus banget",
                  img: "/asset/man-picking-up-delivery-package-from-stores.svg",
                  color: "text-red-500",
                  bg: "bg-red-500/10"
                },
                {
                  icon: MessageCircle,
                  title: "Support 24/7",
                  desc: "Instant response, masalah solved",
                  img: "/asset/male-delivery-executive-delivering-groceries-at-specified-location.svg",
                  color: "text-indigo-500",
                  bg: "bg-indigo-500/10"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative h-full p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 overflow-hidden flex flex-col"
                >
                  <div className="relative z-10 flex-1">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <feature.icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <h3 className={`text-2xl font-heading font-bold mb-3 group-hover:${feature.color} transition-colors`}>{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>

                  <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-8 translate-y-8 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500">
                    <Image
                      src={feature.img}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STATS SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="rounded-[2.5rem] bg-gradient-to-r from-primary to-secondary p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
              <FloatingEmojis />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                {[
                  { num: "5M+", label: "Pengguna Asik" },
                  { num: "10K+", label: "Resto Partner" },
                  { num: "2M+", label: "Pesanan Daily" },
                  { num: "4.8★", label: "Rating App" }
                ].map((stat, i) => (
                  <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 drop-shadow-sm">{stat.num}</div>
                    <div className="text-white/90 font-medium text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">4 Langkah, <span className="text-secondary">Puas Makan</span></h2>
              <p className="text-muted-foreground text-lg">Dari order sampai delivery, semua cepet banget 💨</p>
            </div>

            <div className="relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x opacity-30" />

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    step: "1",
                    title: "Buka Aplikasi",
                    desc: "Download TrustMe di App Store atau Play Store",
                    img: "/asset/restaurant-waiter-confirming-online-food-order.svg"
                  },
                  {
                    step: "2",
                    title: "Pilih Restoran",
                    desc: "Cari restoran favorit atau explore yang baru",
                    img: "/asset/delivery-man-picking-up-food-parcel-from-the-restaurant.svg"
                  },
                  {
                    step: "3",
                    title: "Pesan & Bayar",
                    desc: "Tambah ke keranjang, checkout dengan mudah",
                    img: "/asset/man-delivering-food-using-bicycle.svg"
                  },
                  {
                    step: "4",
                    title: "Makanan Sampe!",
                    desc: "Tracking real-time, sampe hangat 🎉",
                    img: "/asset/female-customer-accepting-food-delivery.svg"
                  }
                ].map((item, i) => (
                  <div key={i} className="relative flex flex-col items-center text-center group">
                    <div className="w-48 h-48 mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                      <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-xl font-heading font-bold text-white shadow-lg ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}>
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA SECTION */}
        <section id="download" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
                  Jangan Nunggu Lagi, <br />
                  <span className="text-primary">Pesan Sekarang!</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0">
                  Ribuan orang lagi enjoy makanan favorit mereka nih. Jangan tertinggal! 🔥
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button className="h-16 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 text-white text-lg font-heading shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                    📱 Download iOS
                  </Button>
                  <Button className="h-16 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white text-lg font-heading shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                    🤖 Download Android
                  </Button>
                </div>

                <p className="mt-8 text-sm text-muted-foreground">
                  ⏱️ Tersedia di iOS 13+ dan Android 8.0+ | 💬 Join 5M+ users
                </p>
              </div>

              <div className="hidden lg:block relative h-[400px] animate-in slide-in-from-right-8 duration-1000">
                <Image
                  src="/asset/delivery-man-picking-up-delivery-for-different-locations.svg"
                  alt="Join TrustMe"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        {/* 7. DEVELOPER SECTION */}
        <section className="py-24 border-t border-border/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-5xl mx-auto bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
              {/* Avatar / Image */}
              <div className="relative group shrink-0">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-primary to-secondary p-1.5 shadow-2xl group-hover:scale-105 transition-transform duration-500 rotate-3 group-hover:rotate-0">
                  <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                    <span className="text-7xl md:text-8xl">👨‍💻</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center text-white text-lg shadow-lg" title="Open for Work">
                  ⚡
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                    Meet the Creator
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold mb-2">
                    DevNoLife <span className="text-muted-foreground text-2xl md:text-3xl font-normal">/ Admin</span>
                  </h2>
                  <p className="text-xl text-primary font-medium">Fullstack Developer & UI Designer</p>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
                  "Coding itu seni, bug itu bumbu." 🌶️ <br />
                  Gw suka bikin website yang nggak cuma fungsional, tapi juga punya <i>soul</i>. TrustMe ini adalah project iseng yang diseriusin biar lu bisa pesen makan dengan gaya!
                </p>

                {/* Socials */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  <Button variant="outline" className="h-12 px-6 rounded-xl gap-2 hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                    <Github className="w-5 h-5" /> GitHub
                  </Button>
                  <Button variant="outline" className="h-12 px-6 rounded-xl gap-2 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </Button>
                  <Button variant="outline" className="h-12 px-6 rounded-xl gap-2 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-300">
                    <Instagram className="w-5 h-5" /> Instagram
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="bg-background border-t border-gradient pt-20 pb-10 relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-50" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-heading font-bold text-xl">T</div>
                <span className="font-heading font-bold text-2xl">TrustMe</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Makanan enak, pesan gampang, sampe cepat 🚀
              </p>
            </div>

            <div>
              <h4 className="font-heading font-bold mb-6 text-lg">Produk</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['iOS App', 'Android App', 'Website'].map(item => (
                  <li key={item}><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold mb-6 text-lg">Perusahaan</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['Tentang Kami', 'Blog', 'Karir'].map(item => (
                  <li key={item}><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold mb-6 text-lg">Dukungan</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['FAQ', 'Hubungi Kami', 'Kebijakan Privasi'].map(item => (
                  <li key={item}><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 TrustMe Indonesia. Made with ❤️ & 🍕
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
