export default function Footer() {
  return (
    <footer className="bg-dark-charcoal text-foreground py-6 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright */}
        <div className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Eagles Tribe MC. All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-end text-sm">
          <a
            href="https://www.instagram.com/eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.threads.net/@eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Threads
          </a>
          <a
            href="https://www.youtube.com/@EaglesTribeMC"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://www.tiktok.com/@eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            TikTok
          </a>
          <a
            href="https://www.facebook.com/eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Facebook
          </a>
        </div>

      </div>
    </footer>
  );
}