import axios from 'axios';

const TMDB_API_KEY = '37ab73e02924d60e1054613af55e5bd7';
const BASE_URL = 'https://api.themoviedb.org/3';

const genreMap = {
  'Laugh': 35,
  'Thriller': 53,
  'Feel-Good': 10751,
  'Chill': 18,
  'Background Noise': 10770
};

function fetchRecommendations(mood, time, platform, type = 'tv') {
  return axios.get(`${BASE_URL}/discover/${type}`, {
    params: {
      api_key: TMDB_API_KEY,
      with_genres: genreMap[mood] || '',
      sort_by: 'popularity.desc',
      language: 'en-US',
      include_adult: false,
      page: 1
    }
  }).then(res =>
    res.data.results.slice(0, 3).map(item => ({
      title: item.title || item.name,
      reason: `A top-rated ${mood.toLowerCase()} pick`
    }))
  ).catch(err => {
    console.error('TMDB fetch error:', err);
    return [{
      title: 'Something went wrong',
      reason: 'Try again later.'
    }];
  });
}

export { fetchRecommendations };
