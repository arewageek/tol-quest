"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Shield, Coins, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Decentralized Opportunities",
      description: "Connect with opportunities directly, without intermediaries"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Early Access",
      description: "Complete quests to gain priority access to the platform"
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Token Airdrop",
      description: "Earn points for potential token rewards at launch"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      {/* Hero Section */}
      <div className="relative px-4 pt-20 pb-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-24 h-24 logo-spin">
            <Image
              src="https://pbs.twimg.com/profile_images/1832369482066546688/O8furigo_400x400.jpg"
              alt="The Open Labs Logo"
              width={96}
              height={96}
              className="rounded-full border-4 border-primary/20"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">
            The Future of Freelancing on TON
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Join The Open Labs and be part of a revolutionary decentralized freelance ecosystem. 
            Complete quests, earn points, and secure your place in the future of work.
          </p>

          <Link href="/dashboard">
            <Button size="lg" className="group">
              Start Earning Points
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-primary via-primary/50 to-primary"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)",
            }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-16">
        <div className="max-w-md mx-auto grid gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-secondary/50 backdrop-blur-sm border border-primary/20">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Complete quests, climb the leaderboard, and secure your early access to
            The Open Labs platform.
          </p>
          <Link href="/dashboard">
            <Button variant="secondary" size="lg" className="group">
              View Available Quests
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}