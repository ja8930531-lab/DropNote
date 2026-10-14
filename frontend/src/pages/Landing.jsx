import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F7FA]">
      
      {/* Navbar */}
      <nav className="border-b border-[#252A32]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight">
            Drop<span className="text-[#8B5CF6]">Note</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#9AA3AF] transition hover:text-white"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
            >
              Get started
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl items-center px-6 py-20">
          
          <div className="grid w-full gap-16 lg:grid-cols-2 lg:items-center">
            
            {/* Hero Text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#252A32] bg-[#13161B] px-4 py-2 text-sm text-[#9AA3AF]">
                <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                Notes with an expiration date
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                Notes that know
                <span className="block text-[#8B5CF6]">
                  when to disappear.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#9AA3AF]">
                Write a note, give it a lifetime, use it when you need it,
                and let DropNote take care of the rest.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="rounded-xl bg-[#8B5CF6] px-6 py-3 font-semibold text-white transition hover:bg-[#7C3AED]"
                >
                  Create your first note
                </Link>

                <Link
                  to="/login"
                  className="rounded-xl border border-[#252A32] bg-[#13161B] px-6 py-3 font-semibold text-white transition hover:bg-[#1A1E24]"
                >
                  Sign in
                </Link>
              </div>
            </div>

            {/* Expiration Preview */}
            <div className="relative">
              <div className="rounded-2xl border border-[#252A32] bg-[#13161B] p-6 shadow-2xl">
                
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#9AA3AF]">
                    Your temporary note
                  </span>

                  <span className="rounded-full bg-[#8B5CF6]/10 px-3 py-1 text-xs font-medium text-[#A78BFA]">
                    Active
                  </span>
                </div>

                <div className="rounded-xl border border-[#252A32] bg-[#0B0D10] p-5">
                  <h2 className="text-lg font-semibold">
                    Remember this idea
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#9AA3AF]">
                    Finish the project homepage and push the latest changes
                    tonight.
                  </p>

                  <div className="mt-6 border-t border-[#252A32] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#9AA3AF]">
                        ⏳ Drops in
                      </span>

                      <span className="font-semibold text-[#F59E0B]">
                        5h 42m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#9AA3AF]">
                  <span className="text-[#8B5CF6]">●</span>
                  Write → Set lifetime → Use → Drop
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;