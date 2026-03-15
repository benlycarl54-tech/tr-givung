import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    toast.success("Contract address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#1a1f4e] via-[#2a2f6e] to-[#1a1f4e]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            You can find <span className="text-red-500">$MEME</span> on Solana Here:
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="font-bold text-amber-400">CA:</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 flex items-center gap-4">
              <code className="text-white font-mono text-sm md:text-base break-all">
                {contractAddress}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-white hover:bg-white/20 shrink-0"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: copied ? 1 : 0 }}
            className="text-green-400 mt-4 font-medium"
          >
            ✓ Copied!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
