import { ScrollAnimation } from "./animations/ScrollAnimation";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#BDA25A] to-[#A8935A]">
      <div className="container mx-auto px-4 text-center">
        <ScrollAnimation className="max-w-3xl mx-auto text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Invest in Your Future?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our experts today for personalized investment guidance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#BDA25A] hover:bg-gray-100 px-8 py-3 text-lg"
              asChild
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-[#BDA25A] hover:bg-gray-100 px-8 py-3 text-lg"
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
