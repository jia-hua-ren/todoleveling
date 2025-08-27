export default function FeaturesSection() {
  return (
    <section id="features" className="py-15 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-12">
          Why ToDo Leveling?
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="featureCard">
            <h4 className="text-xl font-semibold mb-2">Earn XP</h4>
            <p className="text-gray-600">
              Complete tasks to gain experience points and level up as you stay
              productive.
            </p>
          </div>
          <div className="featureCard">
            <h4 className="text-xl font-semibold mb-2">Track Progress</h4>
            <p className="text-gray-600">
              Visualize your journey by growing your own garden with beautiful
              plants.
            </p>
          </div>
          <div className="featureCard">
            <h4 className="text-xl font-semibold mb-2">Stay Motivated</h4>
            <p className="text-gray-600">
              Gamified rewards keep you coming back and turning small wins into
              habits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
