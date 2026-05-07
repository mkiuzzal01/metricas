import { getFooterLinks } from './navigation-links';

interface Props {
  lan: 'en' | 'de';
}

export default async function Footer({ lan }: Props) {
  const footerLinks = await getFooterLinks(lan);

  return (
    <footer className="w-full px-4 py-6">
      <div className="fade-up fade-up-d5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-white/10 pt-6">
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="
              text-[10px]
              sm:text-[11px]
              font-medium
              uppercase
              tracking-wide
              text-[#30455a]
              transition
              hover:text-white
              whitespace-nowrap
            "
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
