export default function ContactPage() {
  return (
    <section className="bg-background text-foreground min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-12">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6 text-lg leading-relaxed">
            <h2 className="text-3xl font-semibold text-secondary">Get In Touch</h2>
            <p>
              Have questions or interested in learning more about <strong className="text-primary">Eagles Tribe MC</strong>? We’d love to hear from you. Reach out to us through the following channels.
            </p>

            <div>
              <h3 className="font-bold">Email</h3>
              <a href="mailto:info@eaglestribemc.com" className="text-primary hover:underline">
                info@eaglestribemc.com
              </a>
            </div>

            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+971 55 555 5555</p>
            </div>

            <div>
              <h3 className="font-bold">Club House</h3>
              <p>Location details available to members and prospects.</p>
            </div>
          </div>

          {/* Contact Form - Display Only */}
          <div>
            <form className="space-y-6 bg-white text-foreground p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Send a Message</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled
                  className="w-full bg-primary text-background font-medium py-2 px-4 rounded-md shadow-md transition-colors hover:bg-secondary disabled:bg-gray-300"
                >
                  Send
                </button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  Form is for display purposes only.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}