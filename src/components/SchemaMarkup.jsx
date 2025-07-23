import React from 'react';
import { Helmet } from 'react-helmet';


const SchemaMarkup = () => {

  
  // Main business schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://paynephotography.com",
    "name": "Payne Photography",
    "image": "https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg",
    "description": "Professional photography services in Accra, Ghana. Specializing in weddings, portraits, and events photography.",
    "url": "https://paynephotography.com",
    "telephone": "+233207982088",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "TBD",
      "addressLocality": "Accra",
      "addressRegion": "Greater Accra",
      "postalCode": "TBD",
      "addressCountry": "GH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "5.6037",
      "longitude": "-0.1870"
    },
    "priceRange": "₵₵₵",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://instagram.com/paynephotography",
      "https://tiktok.com/@paynephotography"
    ]
  };

  // Detailed service offerings schema
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://paynephotography.com"
    },
    "serviceType": "Photography",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Photography",
            "description": "Complete wedding day coverage with premium photo editing",
            "serviceType": "Wedding Photography",
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://paynephotography.com"
            }
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "GHS",
            "price": "5000.00"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Portrait Photography",
            "description": "Professional portrait sessions for individuals and families",
            "serviceType": "Portrait Photography",
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://paynephotography.com"
            }
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "GHS",
            "price": "1000.00"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Photography",
            "description": "Professional event coverage with same-day preview images",
            "serviceType": "Event Photography",
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://paynephotography.com"
            }
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "GHS",
            "price": "3000.00"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement":[]
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(servicesSchema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup; 