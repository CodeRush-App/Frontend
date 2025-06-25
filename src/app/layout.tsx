import Theme from "./theme";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  );
}