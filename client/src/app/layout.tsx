import '../index.css'
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: "Next.js",
  description: "",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
