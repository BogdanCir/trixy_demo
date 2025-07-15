import SplashPage from "../pages/SplashPage.jsx";
import OnboardingPage from "../pages/OnboardingPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import SignalsPage from "../pages/SignalsPage.jsx";

const routes = [
  {
    // Pagina de start a aplicației va fi splash screen-ul
    path: "/",
    component: SplashPage,
  },
  {
    // Ruta pentru ecranele de onboarding
    path: "/onboarding/",
    component: OnboardingPage,
  },
  // ---------------------------------------------
  {
    path: "/home/",
    component: HomePage,
    // când dai click pe „Signals” vei naviga aici:
  },
  {
    path: "/signals/",
    component: SignalsPage,
  },
  // --------------------------------------------
  // {
  //   path: "/signals/:symbol/",
  //   component: SignalsPage,
  // },
  // {
  //   // Ruta pentru pagina principală, după ce utilizatorul termină onboarding-ul
  //   path: "/home/",
  //   component: HomePage,
  // },
];

export default routes;
