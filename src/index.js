import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import App from './App';
import './sass/index.scss';
import { ThemeEditorProvider, HyperThemeEditor } from '@hypertheme-editor/chakra-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <ThemeEditorProvider>
        <BrowserRouter>
          {/* <HyperThemeEditor pos="fixed" bottom={4} right={2} /> */}
          <App />
        </BrowserRouter>
      </ThemeEditorProvider>
    </Provider>
  </ChakraProvider>,
);
