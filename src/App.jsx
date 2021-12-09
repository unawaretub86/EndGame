import React from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { ContextUser } from './contexts/ContextUser';

// ----------------------------------------------------------------------



export default function App() {

  const [userData, setUserData] = React.useState({});
  
  return (
    <ContextUser.Provider value={{userData, setUserData}}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
    </ContextUser.Provider>
  );
}
