import { createClient as createDeliveryClient } from 'contentful';
import { createClient as createManagementClient } from 'contentful-management';

// Delivery client (read-only, for public site)
export const deliveryClient = createDeliveryClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
});

// Management client (read/write, for admin)
export const managementClient = createManagementClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
});

// Get the space (for management actions)
export async function getSpace() {
  return managementClient.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID);
}

// Fetch homepage content (for admin form initial values)
export async function fetchHomepageContent() {
  const entries = await deliveryClient.getEntries({
    content_type: 'heroSection',
    limit: 1,
  });
  const entry = entries.items[0];
  if (!entry) return null;

  // Map Contentful fields to app fields
  return {
    id: entry.sys.id,
    welcomeText: entry.fields.firstSubHeading,
    heroHeadline: entry.fields.mainHeading,
    heroSubheadline: entry.fields.secondSubHeading,
    heroImageUrl: entry.fields.homeBackgroundImage,
    locationInfo: entry.fields.locationInfo, // if this exists
    // add more fields as needed
  };
}

// Update homepage content
export async function updateHomepageContent(entryId, fields) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master'); 
  const entry = await environment.getEntry(entryId);

  // Map form fields to Contentful field IDs
  const fieldMap = {
    welcomeText: 'firstSubHeading',
    heroHeadline: 'mainHeading',
    heroSubheadline: 'secondSubHeading',
    heroImageUrl: 'homeBackgroundImage',
    locationInfo: 'locationInfo', // Only if this exists in your model
  };

  Object.keys(fields).forEach((key) => {
    const contentfulKey = fieldMap[key];
    if (contentfulKey) {
      entry.fields[contentfulKey] = { 'en-US': fields[key] };
    }
  });

  const updatedEntry = await entry.update();
  await updatedEntry.publish();
  return updatedEntry;
}

// Fetch portfolio content
export async function fetchPortfolioContent() {
  const entries = await deliveryClient.getEntries({
    content_type: 'portfolioSection',
    limit: 1,
    include: 2,
  });
  const entry = entries.items[0];
  console.log('Raw entry:', entry); // <-- Add this line
  if (!entry) return null;
  
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    description: entry.fields.description,
    bannerImage: entry.fields.bannerImage , 
    categories:entry.fields.categories,// bannerImage is a short text, not an asset
    // Map portfolioImages (references to portfolioPhoto)
    images: (entry.fields.portfolioImages || [])
      .filter(image => image && image.fields) // Only process valid references
      .map(image => ({
        id: image.sys.id,
        title: image.fields.imageTitle,
        imageURL: image.fields.imageUrl || '',
        category: image.fields.category
      })) || []
    // You can also map categories if needed
  };
}
// Update portfolio content
export async function updatePortfolioContent(entryId, fields) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);

  const fieldMap = {
    title: 'title',
    description: 'description',
    heroImage: 'heroImage',
    images: 'images',
    // ...other fields
  };

  Object.keys(fields).forEach((key) => {
    const contentfulKey = fieldMap[key];
    if (contentfulKey) {
      entry.fields[contentfulKey] = { 'en-US': fields[key] };
    }
  });

  const updatedEntry = await entry.update();
  await updatedEntry.publish();
  return updatedEntry;
}

// Fetch all portfolio photos
export async function fetchAllPortfolioPhotos() {
  const entries = await deliveryClient.getEntries({
    content_type: 'portfolioPhoto',
    order: 'fields.orderNumber',
    include: 1 // Include linked assets
  });
  
  return entries.items.map(entry => {
    // Get localized fields (fallback to default locale)
    const fields = entry.fields;
    const imageTitle = typeof fields.imageTitle === 'string' 
      ? fields.imageTitle 
      : fields.imageTitle?.['en-US'] || '';
    
    const category = fields.category || null;
    
    let imageURL = '';
    if (fields.imageUrl) { // <-- use imageUrl, not imageURL
      if (typeof fields.imageUrl === 'string') {
        imageURL = fields.imageUrl;
      } else if (fields.imageUrl.fields?.file?.url) {
        imageURL = `https:${fields.imageUrl.fields.file.url}`;
      }
    }
    
    return {
      id: entry.sys.id,
      title: imageTitle,
      imageTitle,
      imageURL, // this will now be correct!
      category,
      description: fields.description || ''
    };
  });
}

// Update a single portfolio photo
export async function updatePortfolioPhoto(entryId, fields) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);

  entry.fields.imageTitle = { 'en-US': fields.imageTitle };
  entry.fields.imageURL = { 'en-US': fields.imageURL };
  entry.fields.category = fields.category
    ? { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: fields.category.sys.id } } }
    : { 'en-US': null };

  const updatedEntry = await entry.update();
  await updatedEntry.publish();
  return updatedEntry;
}

// Create a new portfolio photo
export async function createPortfolioPhoto(fields) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master');
  const entry = await environment.createEntry('portfolioPhoto', {
    fields: {
      imageTitle: { 'en-US': fields.imageTitle },
      imageUrl: { 'en-US': fields.imageURL },
      category: fields.category
        ? { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: fields.category.sys.id } } }
        : { 'en-US': null },
    },
  });
  await entry.publish();
  return entry;
}

// Delete a portfolio photo
export async function deletePortfolioPhoto(entryId) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);
  await entry.unpublish().catch(() => {});
  await entry.delete();
}

export async function fetchAllCategories() {
  const entries = await deliveryClient.getEntries({
    content_type: 'portfolioImageCategories', // Make sure this matches your actual category content type ID
    order: 'fields.categoryName',
  });
  return entries.items;
}

export async function fetchContactInfo() {
  const entries = await deliveryClient.getEntries({
    content_type: 'contactInfo',
    limit: 1,
  });
  const entry = entries.items[0];
  if (!entry) return null;
  return {
    id: entry.sys.id,
    email: entry.fields.email,
    phone: entry.fields.phone,
    address: entry.fields.address,
    availability: entry.fields.availability,
  };
}

export async function fetchAllSocialLinks() {
  const entries = await deliveryClient.getEntries({
    content_type: 'socialLinks',
    order: 'fields.platformName',
    include: 1, // To include linked assets
  });
  return entries.items.map(entry => ({
    id: entry.sys.id,
    name: entry.fields.platformName,
    url: entry.fields.url,
    iconImage: entry.fields.iconImage?.fields?.file?.url
      ? `https:${entry.fields.iconImage.fields.file.url}`
      : null,
  }));
}

export async function fetchSeoMeta() {
  const entries = await deliveryClient.getEntries({
    content_type: 'seoMeta',
    limit: 1,
  });
  const entry = entries.items[0];
  if (!entry) return null;
  return {
    id: entry.sys.id,
    pageTitle: entry.fields.pageTitle,
    metaDescription: entry.fields.metaDescription,
    ogImage: entry.fields.ogImage,
  };
}

export async function updateContactInfo(entryId, fields) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);

  entry.fields.email = { 'en-US': fields.email };
  entry.fields.phone = { 'en-US': fields.phone };
  entry.fields.address = { 'en-US': fields.address };
  entry.fields.availability = { 'en-US': fields.availability };

  const updatedEntry = await entry.update();
  await updatedEntry.publish();
  return updatedEntry;
}

export async function updateSocialLink(entryId, fields) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);

  entry.fields.platformName = { 'en-US': fields.name };
  entry.fields.url = { 'en-US': fields.url };
  // For iconImage, you must pass the asset reference object
  if (fields.iconImage && fields.iconImage.sys && fields.iconImage.sys.id) {
    entry.fields.iconImage = {
      'en-US': { sys: { type: 'Link', linkType: 'Asset', id: fields.iconImage.sys.id } }
    };
  }

  const updatedEntry = await entry.update();
  await updatedEntry.publish();
  return updatedEntry;
}

export async function updateSeoMeta(entryId, fields) {
  const space = await getSpace();
  const environment = await space.getEnvironment('master');
  const entry = await environment.getEntry(entryId);

  entry.fields.pageTitle = { 'en-US': fields.pageTitle };
  entry.fields.metaDescription = { 'en-US': fields.metaDescription };
  entry.fields.ogImage = { 'en-US': fields.ogImage };

  const updatedEntry = await entry.update();
  await updatedEntry.publish();
  return updatedEntry;
}

