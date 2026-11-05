const NewsLetterForm = () => {
  return (
    <section className="px-6 py-20 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-100 via-white to-fuchsia-100 px-6 py-14 text-center shadow-xl shadow-violet-100/70 sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-violet-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl"
        />

        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-600">
            Stay in the loop
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight text-violet-950 sm:text-4xl">
            Bring more good moments to your inbox
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-violet-700/80">
            Get a thoughtful roundup of new volunteer opportunities, local
            community wins, and ways to take action around Dhaka.
          </p>

          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Your email address"
              className="min-h-12 flex-1 rounded-full border border-violet-200 bg-white px-5 text-sm text-violet-950 outline-none transition placeholder:text-violet-400 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100"
            />
            <button
              type="submit"
              className="min-h-12 rounded-full bg-violet-700 px-7 text-sm font-bold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-1 hover:bg-violet-800 hover:shadow-xl hover:shadow-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Join the community
            </button>
          </form>

          <p className="mt-5 text-xs text-violet-600/80">
            No noise, just useful updates. Unsubscribe whenever you want.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterForm;