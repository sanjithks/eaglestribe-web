export default function ContactPage() {
    return (
        <div className="bg-foreground">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-5xl font-bold text-primary-red mb-12 text-center">Contact Us</h1>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-6 text-lg">
                        <h2 className="text-3xl font-semibold text-secondary-brown">Get In Touch</h2>
                        <p>Have questions or interested in learning more about Eagles Tribe MC? We’d love to hear from you. Reach out to us through the following channels.</p>
                        <div>
                            <h3 className="font-bold">Email</h3>
                            <a href="mailto:info@eaglestribemc.com" className="text-primary-red hover:underline">info@eaglestribemc.com</a>
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
                    {/* Contact Form - Non-functional display */}
                    <div>
                        <form className="space-y-4 bg-white p-8 rounded-lg shadow-md">
                             <h2 className="text-3xl font-semibold text-secondary-brown mb-4">Send a Message</h2>
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-dark-charcoal">Name</label>
                                <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-red focus:border-primary-red" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-dark-charcoal">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-red focus:border-primary-red" />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-dark-charcoal">Message</label>
                                <textarea id="message" name="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-red focus:border-primary-red"></textarea>
                            </div>
                            <div>
                                <button type="submit" disabled className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-foreground bg-primary-red hover:bg-secondary-brown transition-colors duration-300 disabled:bg-gray-400">
                                    Send
                                </button>
                                <p className="text-xs text-center mt-2 text-gray-500">Form is for display purposes only.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}