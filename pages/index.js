import { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import ProfileCreation from './components/ProfileCreation';
import Leaderboard from './components/Leaderboard';
import CTASection from './components/CTASection';
import ProjectCheckSection from "./components/ProjectCheck";
export default function Home() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <ProjectCheckSection />
      <main className="container mx-auto px-6 py-12">
        <SearchSection />
        {!session?.user?.username && session && <ProfileCreation />}
        <Leaderboard />
      </main>
      <CTASection />
      <ToastContainer />
    </div>
  );
}
