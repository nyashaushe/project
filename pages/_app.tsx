import type { AppProps } from 'next/app';
import '../src/index.css';
import { ToastProvider } from '../src/contexts/ToastContext';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import StarField from '../src/components/ui/StarField';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <StarField />
      <div className="relative z-10">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default MyApp;