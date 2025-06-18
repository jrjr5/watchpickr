import axios from 'axios';

export async function findStreamingAvailability(title) {
  try {
    const url = `https://apis.justwatch.com/content/titles/en_US/popular?query=${encodeURIComponent(title)}`;
    const response = await axios.get(url);
    const item = response.data.items?.[0];

    if (!item || !item.offers) return { platforms: 'Not Available', links: [] };

    const offers = item.offers.filter(o => o.monetization_type === 'flatrate');

    const platformMap = {
      'NETFLIX': 'Netflix',
      'HULU': 'Hulu',
      'DISNEY': 'Disney+',
      'HBOMAX': 'HBO Max',
      'AMAZON': 'Prime Video',
      'APPLETV': 'Apple TV+',
      'PARAMOUNT': 'Paramount+',
      'PEACOCK': 'Peacock',
      'MAX': 'Max'
    };

    const links = offers.map(o => ({
      provider: platformMap[o.package_short_name.toUpperCase()] || o.package_short_name,
      url: o.urls?.standard_web || ''
    }));

    const platforms = [...new Set(links.map(l => l.provider))].join(', ');

    return {
      platforms: platforms || 'Not Available',
      links
    };
  } catch (err) {
    console.error('JustWatch API error:', err);
    return {
      platforms: 'Unknown',
      links: []
    };
  }
}