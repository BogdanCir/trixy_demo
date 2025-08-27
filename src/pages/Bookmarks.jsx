import {
  Page,
  Navbar,
  NavLeft,
  Link,
  BlockTitle,
  Card,
  CardContent,
} from "framework7-react";
import { useEffect, useState } from "react";
import { ChevronLeft, Clock } from "feather-icons-react";
import "./Bookmarks.css";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks([
      {
        id: "1",
        title: "Ethereum breaks $2,600 mark signaling robust market momentum",
        image: "../assets/images/xrp_background.png",
        date: "Two days ago",
      },
      {
        id: "2",
        title:
          "Crypto markets rebound as Bitcoin tops $109K and Ethereum nears $2.6K",
        image: "../assets/images/dash.png",
        date: "Two days ago",
      },
      {
        id: "3",
        title: "XRP gains momentum amid forces that are at play in Iran",
        image: "../assets/images/avatar.jpg",
        date: "Two days ago",
      },
      {
        id: "4",
        title: "Another saved article just for testing consistency",
        image: "../assets/images/ltc.png",
        date: "Yesterday",
      },
    ]);
  }, []);

  return (
    <Page className="bookmarks-page">
      {/* Navbar */}
      <Navbar
        className="signals-navbar"
        large
        transparent
        noShadow
        bgColor="transparent"
        textColor="white"
      >
        <NavLeft className="signals-title">
          <Link back className="text-color-white">
            <ChevronLeft />
          </Link>
          <span className="signals-span">Bookmarks</span>
        </NavLeft>
      </Navbar>

      {/* Subtitle */}
      <BlockTitle className="bookmarks-subtitle">
        Your saved signals and stories
      </BlockTitle>

      {/* List of bookmarks */}
      <div className="bookmarks-list">
        {bookmarks.map((item) => (
          <div key={item.id} className="bookmark-entry">
            <Card className="bookmark-card">
              <CardContent className="bookmark-card-content" padding={false}>
                <img src={item.image} alt="" className="bookmark-image" />
                <div className="bookmark-text">
                  <div className="bookmark-title">{item.title}</div>
                </div>
              </CardContent>
            </Card>

            <div className="bookmark-date">
              <Clock className="bookmark-clock-icon" />
              <span>{item.date}</span>
            </div>

            <div className="bookmark-divider" />
          </div>
        ))}
      </div>
    </Page>
  );
}
