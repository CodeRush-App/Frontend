import Theme from "./theme";
import "./globals.css";
import Header from "../components/Header"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  );
}