import SplashPage from "../pages/SplashPage.jsx";
import OnboardingPage from "../pages/OnboardingPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import SignalsPage from "../pages/SignalsPage.jsx";
import ProfilePage from "../pages/profilePage.jsx";
import BookmarksPage from "../pages/Bookmarks.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import DiscoverPage from "../pages/DiscoverPage.jsx";
import NewsDetailPage from "../pages/NewsDetailPage.jsx";
import FollowUpPage from "../pages/FollowUpPage.jsx";
import PulsePage from "../pages/PulsePage.jsx";
import DiscoverChatPage from "../pages/DiscoverChatPage.jsx";
const routes = [
  {
    path: "/",
    component: SplashPage,
  },
  {
    path: "/onboarding/",
    component: OnboardingPage,
  },
  {
    path: "/signals/",
    component: SignalsPage,
  },
  {
    path: "/profile/",
    component: ProfilePage,
  },
  {
    path: "/bookmarks/",
    component: BookmarksPage,
  },
  {
    path: "/library/",
    component: HistoryPage,
  },
  {
    path: "/discover/",
    component: DiscoverPage,
  },
  {
    path: "/article/:articleId/",
    component: NewsDetailPage,
  },
  {
    path: "/article/:id/",
    component: FollowUpPage,
  },
  {
    path: "/pulse/",
    component: PulsePage,
  },
  {
    path: "/chat/",
    component: DiscoverChatPage,
  },

  {
    path: "/newarticle/:id/",
    component: FollowUpPage,
  },
  {
    path: "/home/",
    component: HomePage,
  },
];

export default routes;
