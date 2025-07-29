import { ArrowRight, MessageCircle } from "lucide-react";
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
        <div className="relative z-10 container mx-auto px-4 text-center text-bg-main">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-h1">{currentContent.hero.title}</h1>
            <h3 className="text-h3  text-secondary">{currentContent.hero.subtitle}</h3>
            <p className="text-body">{currentContent.hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-bg-main px-8 py-4 text-body rounded-full"
                asChild
              >
                <Link href="/properties"> {currentContent.hero.cta1} <ArrowRight className="ml-2 h-5 w-5" /> </Link>
              </Button>

              <Button
                size="lg"
                className="bg-orange-700 hover:bg-orange-600 text-bg-main px-8 py-4 text-body rounded-full"
                asChild
              >
                <Link href="/about">{currentContent.hero.cta2}</Link>
              </Button>

              <Button className="bg-green-700 hover:bg-green-600 rounded-full text-bg-main" asChild>
                <Link href="https://wa.me/966595344758" target="_blank">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {currentContent.hero.whatsAppChat}
                </Link>
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
