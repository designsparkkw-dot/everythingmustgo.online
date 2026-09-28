import Script from "next/script";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function Analytics() {
  return (
    <>
      {plausibleDomain && (
        <Script
          strategy="afterInteractive"
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}

      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
    </>
  );
}
