export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Eagles Tribe MC. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <a
            href="https://www.instagram.com/eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.threads.net/@eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Threads
          </a>
          <a
            href="https://www.youtube.com/@EaglesTribeMC"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            YouTube
          </a>
          <a
            href="https://www.tiktok.com/@eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            TikTok
          </a>
          <a
            href="https://www.facebook.com/eaglestribemc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}