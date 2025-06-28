import '../src/index.css';
import { StoreProvider } from '../src/components/StoreProvider';
import { ClientLayoutWrapper } from '../src/components/layout/ClientLayoutWrapper';
import { ToastProvider } from '../src/contexts/ToastContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}