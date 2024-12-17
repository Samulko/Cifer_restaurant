import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const Navigation = dynamic(() => import('../components/Navigation'), {
  ssr: false
});

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cifer Restaurant',
  description: 'Experience fine dining at Cifer Restaurant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="grammarly-handler" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              const removeGrammarlyAttributes = () => {
                const elements = document.querySelectorAll('*');
                elements.forEach(el => {
                  for (const attr of el.attributes) {
                    if (attr.name.startsWith('data-gr-')) {
                      el.removeAttribute(attr.name);
                    }
                  }
                });
              };
              
              // Run on initial load
              removeGrammarlyAttributes();
              
              // Set up observer for dynamic content
              const observer = new MutationObserver(removeGrammarlyAttributes);
              observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['data-gr-ext-installed', 'data-new-gr-c-s-check-loaded']
              });
            }
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
