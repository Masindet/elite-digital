'use client'

import { useState } from 'react'
import {
  LifeBuoy,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Search,
  Laptop,
  Smartphone,
  Headphones,
  Monitor,
  Camera,
  Speaker,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const categories = [
  { name: 'Computers & Laptops', icon: Laptop },
  { name: 'Smartphones', icon: Smartphone },
  { name: 'Audio Devices', icon: Headphones },
  { name: 'TVs & Displays', icon: Monitor },
  { name: 'Cameras', icon: Camera },
  { name: 'Speakers', icon: Speaker },
]

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all products. Items must be in their original condition with all packaging and accessories. Refunds will be processed within 5-7 business days after we receive the returned item.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for 1-2 business day delivery. International shipping times vary by location.',
  },
  {
    question: 'Do you offer warranty on products?',
    answer:
      'Yes, all our products come with a minimum 1-year manufacturer warranty. Extended warranty options are available for most products at an additional cost.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. We also offer financing options through our partner institutions.',
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-background" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-8 backdrop-blur-sm">
              <LifeBuoy className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
              How Can We Help You?
            </h1>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full h-12 pl-12 pr-4 rounded-lg bg-white/90 backdrop-blur-sm border-0 placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse Help by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={index}
                  className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-background"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium">{category.name}</h3>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-background hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Get instant help from our support team</p>
              <Button className="w-full">Start Chat</Button>
            </Card>

            <Card className="p-6 text-center bg-background hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">Speak directly with a support agent</p>
              <Button className="w-full">1-800-TECH-HELP</Button>
            </Card>

            <Card className="p-6 text-center bg-background hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">Get help via email within 24 hours</p>
              <Button className="w-full">Send Email</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Support Hours</h2>
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 bg-background">
                <h3 className="text-lg font-semibold mb-4">Live Chat & Phone</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Monday - Friday: 8AM - 8PM EST</li>
                  <li>Saturday: 9AM - 6PM EST</li>
                  <li>Sunday: 10AM - 5PM EST</li>
                </ul>
              </Card>
              <Card className="p-6 bg-background">
                <h3 className="text-lg font-semibold mb-4">Email Support</h3>
                <p className="text-muted-foreground">
                  Available 24/7
                  <br />
                  Response within 24 hours
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>
    </div>
  )
}
