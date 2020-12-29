import Head from 'next/head';
import Chat from '../components/chat';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Whats4Dinner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Chat />
    </div>
  );
};

export default Home;
