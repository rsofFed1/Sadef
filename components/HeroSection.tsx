import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Content } from "@/types/content";
import Link from "next/link";

type Props = {
    currentContent: {
        hero: Content['en']['hero'] | Content['ar']['hero'];
    };
}

export default function HeroSection( { currentContent }: Props ) {
  return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <video
            preload="metadata"
            src="/videos/videoBanner2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">{currentContent.hero.title}</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">{currentContent.hero.description}</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#BDA25A] hover:bg-[#A8935A] text-white px-8 py-4 text-lg rounded-full"
                asChild
              >
                <Link href="/properties"> {currentContent.hero.cta1} <ArrowRight className="ml-2 h-5 w-5" /> </Link>
              </Button>

              <Button
                size="lg"
                className="bg-[#BDA25A] hover:bg-[#A8935A] text-white px-8 py-4 text-lg rounded-full"
                asChild
              >
                <Link href="/about">{currentContent.hero.cta2}</Link>
              </Button>

              <Button size="lg" variant="ghost" className="text-white hover:bg-white/20 px-8 py-4 text-lg rounded-full">
                <Play className="mr-2 h-5 w-5" />
                {currentContent.hero.watchVideo}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
        </section>
  );
}
