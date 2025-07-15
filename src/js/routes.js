import SplashPage from "../pages/SplashPage.jsx";
import OnboardingPage from "../pages/OnboardingPage.jsx";
// import HomePage from "../pages/home.jsx";

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
