import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Promotions } from '../components/Promotions';
import { Benefits } from '../components/Benefits';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';
import { ChatButton } from '../components/ChatButton';

export function Home() {
  return (
    <div className="bg-[#e4e1bd] min-h-screen text-[#1a2b4c] font-sans relative overflow-x-hidden">
      <Header />
      <Hero />
      <Promotions />
      <Benefits />
      <Newsletter />
      <Footer />
      <ChatButton />
    </div>
  );
}