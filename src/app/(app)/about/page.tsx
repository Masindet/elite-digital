import {
  Building2,
  Users2,
  Trophy,
  Zap,
  ShieldCheck,
  HeartHandshake,
  CircuitBoard,
} from 'lucide-react'
import { Card } from '@/components/ui/card'

const stats = [
  {
    value: '10+',
    label: 'Years of Excellence',
    icon: Trophy,
  },
  {
    value: '50K+',
    label: 'Happy Customers',
    icon: Users2,
  },
  {
    value: '99%',
    label: 'Customer Satisfaction',
    icon: HeartHandshake,
  },
]

const values = [
  {
    title: 'Quality Assurance',
    description:
      'Every product in our inventory undergoes rigorous quality testing to ensure it meets our high standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Innovation First',
    description:
      'We continuously seek out the latest technology and innovative solutions to offer our customers.',
    icon: Zap,
  },
  {
    title: 'Customer Commitment',
    description:
      'Our dedication to customer satisfaction drives every decision we make and every product we offer.',
    icon: Building2,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-background" />
        </div>

        {/* Animated Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <CircuitBoard
              key={i}
              className={`absolute h-24 w-24 text-white animate-pulse`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-8 backdrop-blur-sm">
              <CircuitBoard className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Our Story
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-primary/10 p-6 rounded-lg border border-white/10">
              Since 2014, EliteDigital has been at the forefront of premium electronics retail,
              bringing cutting-edge technology and exceptional service to our valued customers.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="p-6 text-center bg-background">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{stat.value}</h2>
                  <p className="text-muted-foreground">{stat.label}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To provide our customers with the highest quality electronics and an unmatched
              shopping experience, while staying at the forefront of technological innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="p-6 bg-background hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team behind EliteDigital&apos;s success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Chief Executive Officer',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
              },
              {
                name: 'Michael Chen',
                role: 'Chief Technology Officer',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Head of Customer Experience',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden bg-background">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-[300px]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions about our products or services? Our team is here to help you find the
            perfect solution for your needs.
          </p>
          <div className="inline-flex gap-4">
            <a
              href="mailto:contact@techstore.com"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
