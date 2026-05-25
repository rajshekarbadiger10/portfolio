import dynamic from 'next/dynamic';
import { BackgroundEffects } from '@/components/background-effects';
import { CinematicLoader } from '@/components/loader/cinematic-loader';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { Navbar } from '@/components/navbar';

const PortfolioPage = dynamic(() => import('@/components/portfolio-page').then((module) => module.PortfolioPage), {
  ssr: false
});

export default function Page() {
  return (
    <LenisProvider>
      <BackgroundEffects />
      <CinematicLoader />
      <Navbar />
      <PortfolioPage />
    </LenisProvider>
  );
}