import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const steps = [
  { step: "01", title: "Choose Your Crypto", description: "Select which cryptocurrency you want to participate with: BTC, ETH, SOL, or TRUMP tokens." },
  { step: "02", title: "Send to Address", description: "Copy the wallet address for your chosen crypto and send your contribution from your wallet." },
  { step: "03", title: "Wait for Confirmation", description: "The blockchain confirms your transaction automatically. This usually takes 5–10 minutes." },
  { step: "04", title: "Receive 2x Back", description: "Once confirmed, the smart contract automatically sends double your contribution back to you." },
];

export default function InstructionSection() {
  return (
    <section id="instruction" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900">
            Step-by-Step <span className="text-red-600">Instructions</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
            Follow these simple steps to participate in the biggest crypto giveaway
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-red-300" />
                </div>
              )}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-5xl font-black text-red-100 mb-4">{step.step}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-bold rounded-md"
            onClick={() => document.getElementById('participate')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Participate Now →
          </Button>
        </div>
      </div>
    </section>
  );
}
