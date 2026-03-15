import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import GiveawayInfo from '../components/GiveawayInfo';
import OwnerSection from '../components/OwnerSection';
import LiveClaimsPopup from '../components/LiveClaimsPopup';
import InstructionSection from '../components/InstructionSection';
import ParticipateSection from '../components/ParticipateSection';
import TransactionsSection from '../components/TransactionsSection';
import Footer from '../components/Footer';
import TrustBar from '../components/TrustBar';
import SocialProof from '../components/SocialProof';
import SocialMediaLinks from '../components/SocialMediaLinks';
import TrumpVideoSection from '../components/TrumpVideoSection';
import SecondVideoSection from '../components/SecondVideoSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TrustBar />
      <Navbar />
      <HeroSection />
      <GiveawayInfo />
      <TrumpVideoSection />
      <SecondVideoSection />
      <OwnerSection />
      <SocialProof />
      <SocialMediaLinks />
      <InstructionSection />
      <ParticipateSection />
      <TransactionsSection />
      <Footer />
      <LiveClaimsPopup />
    </div>
  );
}
