import { ScrollAnimation } from "./animations/ScrollAnimation";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import type { Content } from "@/types/content"

type Props = {
  currentContent: {
    contactCTA: Content["en"]["contactCTA"] | Content["ar"]["contactCTA"]
  }
}

export default function ContactCTA({ currentContent }: Props) {
  return (
    <section className="py-20 bg-gradient-to-r from-secondary to-[#A8935A]">
      <div className="container mx-auto px-4 text-center">
        <ScrollAnimation className="max-w-3xl mx-auto text-bg-main">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-primary mb-4">{currentContent.contactCTA.title}</h2>
            <p className="text-primaryText text-generalText">{currentContent.contactCTA.subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="hover:bg-primary-hover px-8 py-3 text-body"
              asChild
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button
              size="lg"
              className="hover:bg-primary-hover px-8 py-3 text-body"
              asChild
            >
              <Link href="https://wa.me/966595344758" target="_blank">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </Link>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
