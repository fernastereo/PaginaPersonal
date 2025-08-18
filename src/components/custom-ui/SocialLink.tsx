export const SocialLink = ({ icon, href, label }: { icon: string, href: string, label: string }) => {
  return (
    <a
      className="px-3 dark:bg-secondary-foreground py-3 rounded-full hover:scale-105 hover:bg-primary/30 hover:shadow-md transition-all duration-300"
      title={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={icon} alt={label} className="h-6 w-6" />
    </a>
  );
}