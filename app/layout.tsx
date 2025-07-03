import '../src/index.css';
import { StoreProvider } from '../src/components/StoreProvider';
import { ClientLayoutWrapper } from '../src/components/layout/ClientLayoutWrapper';
import { ToastProvider } from '../src/contexts/ToastContext';
import AudioPlayer from '../src/components/layout/AudioPlayer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ToastProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            <AudioPlayer />
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}