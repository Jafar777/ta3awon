// C:\Users\jafar\Desktop\ta3awon\app\page.tsx
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Campaigns from '../components/Campaigns';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Campaigns />
      <Contact />
      <Footer />
    </main>
  );
}