import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title, 
  description, 
  image = 'https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg', // default hero image
  url = 'https://paynephotography.com' // replace with actual domain when deployed
}) => {
  const siteTitle = 'Payne Photography';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="google-site-verification" content="Rp0S9HRl635vtCC6iRjepEsySWnBaBn4ZLe0eYOQLOo" />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="photography, photographer, Accra, Ghana, professional photography, wedding photography, portrait photography" />
      <meta name="author" content="Payne Photography" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 