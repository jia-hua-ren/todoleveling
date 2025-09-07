import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'

export default function Home() {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} ToDo Leveling. All rights
            reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
