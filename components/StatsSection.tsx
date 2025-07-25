import { Content } from "@/types/content";
import { ScrollAnimation } from "./animations/ScrollAnimation";

type Props = {
    currentContent: {
        stats: Content['en']['stats'] | Content['ar']['stats'];
    };
}

export default function StatsSection( { currentContent }: Props ) {
  return (
        <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { value: "17+", label: currentContent.stats.experience },
                { value: "50+", label: currentContent.stats.projects },
                { value: "1000+", label: currentContent.stats.investors },
                { value: "15%", label: currentContent.stats.returns },
            ].map((stat, index) => (
                <ScrollAnimation key={index} delay={index * 0.2} direction="left">
                <div className="text-center text-bg-main">
                    <div className="text-h1 font-bold mb-2">{stat.value}</div>
                    <div className="text-body opacity-90">{stat.label}</div>
                </div>
                </ScrollAnimation>
            ))}
            </div>
        </div>
        </section>
  );
}
