import { createRoot } from 'react-dom/client';
import App from './App';

let counter;
createRoot(document.getElementById('root')).render(<App counter={counter} />);
