// src/pages/_app.js
import '@/styles/globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default App;
