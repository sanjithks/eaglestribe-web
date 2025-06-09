export default function MembershipPage() {
  return (
    <section className="bg-background text-foreground px-6 py-16 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-12">Membership</h1>

        <div className="space-y-8 text-lg leading-relaxed">
          <p>
            Becoming a member of Eagles Tribe MC is about more than just owning a motorcycle; it’s about joining a brotherhood. 
            We are looking for men of character who are committed to our values of loyalty, honor, and respect. 
            Our process is designed to ensure that every new member is a good fit for our tribe and understands the commitment 
            that comes with wearing our patch.
          </p>

          <p>
            The journey to becoming a full-patched member involves several stages, starting as a hang-around, 
            progressing to a prospect, and ultimately earning the right to be a member. 
            This journey is a time for both the club and the individual to get to know one another, 
            build trust, and ensure that our principles align.
          </p>

          <div>
            <h2 className="text-3xl font-bold text-secondary mb-4">Requirements:</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Must be a male, 18 years of age or older.</li>
              <li>Must own a cruiser-style motorcycle of 650cc or greater.</li>
              <li>Must have a valid motorcycle license and insurance.</li>
              <li>Must be willing to commit to the club’s values and brotherhood.</li>
              <li>Must pass a background check and be of good character.</li>
            </ul>
          </div>

          <p>
            If you are serious about joining a true brotherhood and believe you have what it takes to be a part of Eagles Tribe MC, 
            we invite you to reach out and express your interest. The first step is to connect with us, 
            spend time with us, and let the journey begin.
          </p>
        </div>
      </div>
    </section>
  );
}