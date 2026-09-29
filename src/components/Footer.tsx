import { footerText } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8">
      <p className="text-center text-xs text-muted-soft">{footerText}</p>
    </footer>
  );
}
