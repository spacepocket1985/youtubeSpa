import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

const Main: React.FC = () => {
  useEffect(() => {
    const SEARCH_QUERY = 'jack russel';

    const fetchYouTubeVideos = async () => {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        SEARCH_QUERY
      )}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchYouTubeVideos();
  }, []);

  return (
    <>
      <Header />
      <PageWrapper title={'Video search'}></PageWrapper>
    </>
  );
};

export default Main;
