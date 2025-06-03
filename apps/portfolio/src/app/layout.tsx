import './global.css';
import SharedLayout from '../components/layout';
import ThemeWrapper from '../components/ThemeWrapper';

export const metadata = {
  title: "Welcome to Emily Xiong's Portfolio",
  description:
    "This is Emily Xiong's portfolio, a software engineer based in Toronto, Canada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeWrapper>
          <SharedLayout>{children}</SharedLayout>
        </ThemeWrapper>
      </body>
    </html>
  );
}
