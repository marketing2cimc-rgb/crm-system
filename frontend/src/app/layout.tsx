import "./../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
