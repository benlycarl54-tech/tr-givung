import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this an official product?",
    answer: "Yes, this is the only Official Meme Coin endorsed by our community and leadership team.",
  },
  {
    question: "What is the official contract address and symbol?",
    answer: "You can find $MEME on Solana here: CA: 6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN. Symbol: $MEME",
  },
  {
    question: "How can I get Meme Coins?",
    answer: "Moonshot is the easiest way. Users sign up with an email address, can deposit with Apple Pay, debit card, credit card, Venmo, Solana/USDC, and receive your $MEME within minutes.",
  },
  {
    question: "What is a meme coin?",
    answer: "A meme coin is a cryptocurrency that originated from an internet meme or has some other humorous characteristic. They often start as jokes but can develop strong communities and real value.",
  },
  {
    question: "Which blockchain network are the Meme Coins on?",
    answer: "The $MEME token is minted on the Solana blockchain, known for its fast transactions and low fees.",
  },
  {
    question: "What are the Meme Coins?",
    answer: "Meme Coins are fungible crypto assets created and tracked on the Solana blockchain. They represent community membership and can be traded freely.",
  },
  {
    question: "Why do I need to perform KYC/AML when I buy?",
    answer: "Services like MoonPay require KYC/AML checks to comply with regulations and prevent fraud. This ensures a safe trading environment for all users.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1f4e]">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 rounded-2xl px-6 border-none"
              >
                <AccordionTrigger className="text-[#1a1f4e] font-bold text-left hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
