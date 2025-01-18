import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Название вашего приложения',
  description: 'Описание вашего приложения',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body> Привет{children}</body>
    </html>
  );
}
