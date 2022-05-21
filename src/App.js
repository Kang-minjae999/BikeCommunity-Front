// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import AccessTime from './components/AccessTime';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
            <NotistackProvider>
              <MotionLazyContainer>
                <ProgressBarStyle />
                <ChartStyle />
                <ScrollToTop /> 
                <AccessTime /> 
                <Router />
              </MotionLazyContainer>
            </NotistackProvider>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
