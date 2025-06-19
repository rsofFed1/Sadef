import Image from 'next/image';
import Link from 'next/link';

const WhatsAppButton = () => {
    return (
        <Link
            href="https://wa.me/966595344758"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-10 bg-white p-[10px] w-[74px] h-[74px] rounded-full z-[800] overflow-hidden shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300"
        >
            <Image
                src="/whatsapp.gif"
                alt="WhatsApp"
                unoptimized
                width={44}
                height={44}
            />
        </Link>
    );
};

export default WhatsAppButton;