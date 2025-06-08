export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-dark-charcoal text-foreground mt-auto">
            <div className="container mx-auto py-6 text-center">
                <p>&copy; {currentYear} Eagles Tribe MC. All Rights Reserved.</p>
                <p className="text-sm text-gray-400 mt-2">Website recreated by Gemini</p>
            </div>
        </footer>
    )
}