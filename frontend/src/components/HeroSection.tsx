export default function HeroSection() {
  // const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''
  const loginUrl = `auth/login`

  return (
    <section className="flex max-w-screen my-10 items-center justify-center text-center text-gray-800">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Turn Your Tasks into{' '}
          <span className="text-indigo-600">Adventures</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          ToDo Leveling is a gamified to-do app that rewards you with XP as you
          conquer your daily tasks. Stay productive while leveling up.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href={loginUrl}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
}
