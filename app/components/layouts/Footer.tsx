import { getFooterLinks } from './navigation-links';

interface Props {
  lan: 'en' | 'de';
}

export default async function Footer({ lan }: Props) {
  const footerLinks = await getFooterLinks(lan);

  return (
    <footer className="w-full border-white/10 px-4 py-6">
      <div className="flex justify-center items-center flex-wrap gap-5 border-t border-white/10 pt-6 fade-up fade-up-d5">
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[9px] font-medium uppercase tracking-wide text-[#30455a] transition hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
