export const CONTACT_CONFIG = {
  phoneDisplay: '0334-4859408',
  phoneRaw: '03344859408',
  phoneInternational: '+923344859408',
  whatsAppNumber: '923344859408',
  whatsAppBaseUrl: 'https://wa.me/923344859408',
  facebookUrl: 'https://www.facebook.com/zainrauf408',
  instagramUrl: 'https://www.instagram.com/zainrauf408?cplk=MWhiN2ZyODZhOW50eQ==',
  consultationText:
    'Order or ask on WhatsApp / Facebook / Instagram',
};

export const getProductWhatsAppLink = (productName: string, quantity = 1): string => {
  const message = `Hello Doctor, I would like to order / ask about "${productName}" (Quantity: ${quantity}) from Herd and Flock Vet. Please confirm availability and delivery to my farm.`;
  return `https://wa.me/${CONTACT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(message)}`;
};

export const getOrderWhatsAppLink = (
  orderId: string,
  customerName: string,
  total: number,
  itemsCount: number,
  address: string
): string => {
  const message = `Assalam-o-Alaikum Doctor, I have placed order #${orderId} on Herd and Flock Vet website.\n\nName: ${customerName}\nItems: ${itemsCount}\nTotal COD Amount: Rs. ${total.toLocaleString()}\nDelivery Address: ${address}\n\nPlease confirm my dispatch. Thank you!`;
  return `https://wa.me/${CONTACT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(message)}`;
};

export const getConsultationWhatsAppLink = (
  species: string,
  flockSize: string,
  symptoms: string,
  name: string,
  location: string
): string => {
  const message = `Assalam-o-Alaikum Doctor Zain,\n\nI need a Free Vet Consultation from Herd and Flock Vet.\n\nFarmer: ${name}\nLocation: ${location}\nSpecies: ${species}\nFlock/Herd Size: ${flockSize}\nObserved Symptoms: ${symptoms}\n\nPlease advise appropriate treatment and supplements.`;
  return `https://wa.me/${CONTACT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(message)}`;
};
