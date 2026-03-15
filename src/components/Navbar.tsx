import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: "Giveaway", href: "#giveaway" },
  { label: "Info", href: "#info" },
  { label: "Instruction", href: "#instruction" },
  { label: "Participate", href: "#participate" },
  { label: "Transactions", href: "#transactions" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8eb41a50eea87ead000ff/3b869c91c_images16.jpeg"
              alt="MEME Coin Logo"
              className="w-10 h-10 rounded-full object-cover object-top border-2 border-red-600"
            />
            <div className="text-2xl font-black">
              <span className="text-red-600">TRUMP</span>
              <span className="text-gray-900"> MEME</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`font-medium transition-colors ${index === 0 ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`}
              >
                {link.label}
              </a>
            ))}
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-md font-semibold">
              Participate
            </Button>
            <Link to="/admin">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-4 rounded-md font-semibold">
                Admin
              </Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-700 hover:text-red-600 font-medium py-1" onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold w-full mt-2">
              Participate
            </Button>
            <Link to="/admin" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="border-red-600 text-red-600 w-full rounded-md font-semibold">
                Admin Panel
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
