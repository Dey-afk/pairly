import { useState } from "react";
import "./App.css";

type View = "discover" | "matches" | "messages" | "profile" | "lobby" | "setup";
type GenderPreference = "Women" | "Men" | "Everyone";
type OwnGender = "Woman" | "Man" | "Non-binary" | "Prefer not to say";
type Profile = {
  name: string;
  gender: string;
  age: number;
  role: string;
  distance: string;
  image: string;
  colors: string;
  tags: string[];
  prompt: string;
  answer: string;
};

const profiles: Profile[] = [
  {
    name: "Sophie",
    gender: "Woman",
    age: 27,
    role: "Ceramic artist",
    distance: "2 miles away",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
    colors: "#b99182",
    tags: ["Creative", "Coffee", "Sunday markets"],
    prompt: "The quickest way to my heart is…",
    answer: "A really good playlist.",
  },
  {
    name: "Amelia",
    gender: "Woman",
    age: 29,
    role: "Brand strategist",
    distance: "4 miles away",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
    colors: "#d1a08f",
    tags: ["Travel", "Good food", "Live music"],
    prompt: "A perfect first date would be…",
    answer: "A table at the right restaurant.",
  },
  {
    name: "Maya",
    gender: "Woman",
    age: 26,
    role: "Product designer",
    distance: "5 miles away",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    colors: "#88756c",
    tags: ["Design", "Hiking", "Podcasts"],
    prompt: "My most controversial opinion is…",
    answer: "A long walk with no destination.",
  },
];

const chats = [
  {
    name: "Sophie",
    preview: "You: That sounds like a plan ✨",
    time: "2m",
    image: profiles[0].image,
    unread: true,
  },
  {
    name: "Amelia",
    preview: "The best ramen in London is…",
    time: "1h",
    image: profiles[1].image,
    unread: false,
  },
  {
    name: "Maya",
    preview: "Sunday walks are underrated.",
    time: "Yesterday",
    image: profiles[2].image,
    unread: false,
  },
];

function Icon({ children }: { children: string }) {
  return (
    <span className="icon" aria-hidden="true">
      {children}
    </span>
  );
}

function App() {
  const [activeView, setActiveView] = useState<View>("discover");
  const [profileIndex, setProfileIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [selectedChat, setSelectedChat] = useState("Sophie");
  const [genderPreference, setGenderPreference] =
    useState<GenderPreference>("Women");
  const [ownGender, setOwnGender] = useState<OwnGender>("Woman");
  const [revealRequests, setRevealRequests] = useState<string[]>([]);
  const [revealedProfiles, setRevealedProfiles] = useState<string[]>([]);
  const profile = profiles[profileIndex % profiles.length];
  const selectedProfile =
    profiles.find((item) => item.name === selectedChat) ?? profiles[0];
  const hasRevealRequest = revealRequests.includes(selectedChat);
  const isProfileRevealed = revealedProfiles.includes(selectedChat);
  const isCurrentProfileRevealed = revealedProfiles.includes(profile.name);
  const chooseProfile = (action: "like" | "pass") => {
    if (action === "like" && !liked.includes(profile.name))
      setLiked((current) => [...current, profile.name]);
    setProfileIndex((current) => current + 1);
  };

  function renderContent() {
    if (activeView === "setup")
      return (
        <section className="view-panel setup-view">
          <button
            className="back-link"
            onClick={() => setActiveView("profile")}
          >
            <Icon>←</Icon> Back to profile
          </button>
          <div className="setup-intro">
            <span className="lobby-symbol">✦</span>
            <p className="eyebrow">Create your profile</p>
            <h1>
              Start with what
              <br />
              feels <em>right.</em>
            </h1>
            <p>
              These choices help us create a thoughtful, private lobby for you.
            </p>
          </div>
          <div className="setup-card">
            <div className="setup-step">
              <span>01</span>
              <div>
                <h3>How do you identify?</h3>
                <p>Share only what you’re comfortable sharing.</p>
              </div>
            </div>
            <div className="setup-options own-gender-options">
              {(
                [
                  "Woman",
                  "Man",
                  "Non-binary",
                  "Prefer not to say",
                ] as OwnGender[]
              ).map((option) => (
                <button
                  key={option}
                  className={ownGender === option ? "selected" : ""}
                  onClick={() => setOwnGender(option)}
                >
                  <span>
                    {option === "Woman"
                      ? "♀"
                      : option === "Man"
                        ? "♂"
                        : option === "Non-binary"
                          ? "◈"
                          : "—"}
                  </span>
                  <strong>{option}</strong>
                  {ownGender === option && <b>✓</b>}
                </button>
              ))}
            </div>
            <div className="lobby-divider" />
            <div className="setup-step">
              <span>02</span>
              <div>
                <h3>Who are you interested in?</h3>
                <p>We’ll use this to shape your discovery lobby.</p>
              </div>
            </div>
            <div className="setup-options interest-options">
              {(["Women", "Men", "Everyone"] as GenderPreference[]).map(
                (option) => (
                  <button
                    key={option}
                    className={genderPreference === option ? "selected" : ""}
                    onClick={() => setGenderPreference(option)}
                  >
                    <span>
                      {option === "Women" ? "♀" : option === "Men" ? "♂" : "∞"}
                    </span>
                    <strong>{option}</strong>
                    {genderPreference === option && <b>✓</b>}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="setup-footer">
            <span>
              <Icon>⌑</Icon> Your preferences stay private
            </span>
            <button
              className="primary-button"
              onClick={() => setActiveView("profile")}
            >
              Create my profile <span>→</span>
            </button>
          </div>
        </section>
      );

    if (activeView === "profile")
      return (
        <section className="view-panel profile-view">
          <div className="view-heading">
            <div>
              <p className="eyebrow">Your Pairly profile</p>
              <h1>
                Make it <em>you.</em>
              </h1>
            </div>
            <button
              className="round-button"
              onClick={() => setActiveView("setup")}
              aria-label="Edit profile"
            >
              <Icon>✎</Icon>
            </button>
          </div>
          <div className="profile-hero">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=700&q=85"
              alt="Alex Morgan"
            />
            <div>
              <span className="profile-live">
                <i /> Live profile
              </span>
              <h2>Alex Morgan, 30</h2>
              <p>Product designer · London, UK</p>
            </div>
            <button
              className="edit-pill"
              onClick={() => setActiveView("setup")}
            >
              Edit profile
            </button>
          </div>
          <div className="profile-stats">
            <div>
              <strong>87%</strong>
              <span>profile complete</span>
            </div>
            <div>
              <strong>24</strong>
              <span>connections</span>
            </div>
            <div>
              <strong>6</strong>
              <span>interests</span>
            </div>
          </div>
          <div className="profile-section-heading">
            <h3>About Alex</h3>
            <button>
              Edit <span>→</span>
            </button>
          </div>
          <div className="about-copy">
            <p>
              Curious about people, places, and the perfect Sunday roast.
              Usually found with a sketchbook, a coffee, or planning my next
              little adventure.
            </p>
            <div className="interest-list">
              <span>Design</span>
              <span>Weekend trips</span>
              <span>Natural wine</span>
              <span>Live music</span>
              <span>Cooking</span>
            </div>
          </div>
          <div className="profile-section-heading">
            <h3>My prompts</h3>
            <button>
              Edit <span>→</span>
            </button>
          </div>
          <div className="prompt-preview">
            <span>My simple pleasures</span>
            <strong>A long walk with a great podcast and nowhere to be.</strong>
          </div>
        </section>
      );

    if (activeView === "lobby")
      return (
        <section className="view-panel lobby-view">
          <button
            className="back-link"
            onClick={() => setActiveView("discover")}
          >
            <Icon>←</Icon> Back to discovery
          </button>
          <div className="lobby-intro">
            <span className="lobby-symbol">✦</span>
            <p className="eyebrow">Your discovery lobby</p>
            <h1>
              Who are you hoping
              <br />
              to <em>meet?</em>
            </h1>
            <p>
              Set your preferences and we’ll make the room feel more like you.
            </p>
          </div>
          <div className="privacy-note">
            <span className="privacy-lock">⌑</span>
            <div>
              <strong>Private by default</strong>
              <p>
                Everyone in the lobby starts anonymous. Profiles only open when
                both people choose to reveal after talking.
              </p>
            </div>
          </div>
          <div className="lobby-card">
            <div className="lobby-card-heading">
              <div>
                <h3>Show me</h3>
                <p>Choose who appears in your discovery.</p>
              </div>
              <span>01</span>
            </div>
            <div className="preference-options">
              {(["Women", "Men", "Everyone"] as GenderPreference[]).map(
                (option) => (
                  <button
                    key={option}
                    className={genderPreference === option ? "selected" : ""}
                    onClick={() => setGenderPreference(option)}
                  >
                    <span className="preference-icon">
                      {option === "Women" ? "♀" : option === "Men" ? "♂" : "∞"}
                    </span>
                    <strong>{option}</strong>
                    {genderPreference === option && (
                      <span className="choice-check">✓</span>
                    )}
                  </button>
                ),
              )}
            </div>
            <div className="lobby-divider" />
            <div className="lobby-card-heading">
              <div>
                <h3>My distance</h3>
                <p>People within this distance of you.</p>
              </div>
              <strong className="distance-value">15 miles</strong>
            </div>
            <input
              className="distance-slider"
              type="range"
              min="1"
              max="50"
              defaultValue="15"
              aria-label="Maximum distance"
            />
            <div className="slider-labels">
              <span>1 mile</span>
              <span>50 miles</span>
            </div>
          </div>
          <div className="lobby-footer">
            <div>
              <span className="status-dot" /> Showing{" "}
              <strong>{genderPreference.toLowerCase()}</strong> in London
            </div>
            <button
              className="primary-button"
              onClick={() => setActiveView("discover")}
            >
              Start discovering <span>→</span>
            </button>
          </div>
        </section>
      );

    if (activeView === "matches")
      return (
        <section className="view-panel matches-view">
          <div className="view-heading">
            <div>
              <p className="eyebrow">Your people</p>
              <h1>Matches</h1>
            </div>
            <button className="round-button" aria-label="Match settings">
              <Icon>⚙</Icon>
            </button>
          </div>
          <div className="match-hero">
            <span className="match-spark">✦</span>
            <div>
              <strong>{liked.length + 12} people</strong>
              <span> are into you</span>
              <p>Make the first move and see where it goes.</p>
            </div>
            <button className="text-button">
              See all <span>→</span>
            </button>
          </div>
          <div className="match-grid">
            {profiles.map((match, index) => (
              <button
                className="match-card"
                key={match.name}
                onClick={() => setActiveView("messages")}
              >
                <img src={match.image} alt={match.name} />
                <span className="online-dot" />
                <strong>{match.name}</strong>
                <small>{index + 2}h ago</small>
              </button>
            ))}
            {["Nora", "Lena", "Eva"].map((name, index) => (
              <button
                className="match-card"
                key={name}
                onClick={() => setActiveView("messages")}
              >
                <div className={`abstract-avatar avatar-${index}`}>
                  <span>{name[0]}</span>
                </div>
                <strong>{name}</strong>
                <small>Recently</small>
              </button>
            ))}
          </div>
        </section>
      );

    if (activeView === "messages")
      return (
        <section className="view-panel messages-view">
          <div className="view-heading">
            <div>
              <p className="eyebrow">Keep the spark going</p>
              <h1>Messages</h1>
            </div>
            <button className="round-button" aria-label="New message">
              <Icon>＋</Icon>
            </button>
          </div>
          <div className="message-list">
            {chats.map((chat) => (
              <button
                className={`message-row ${selectedChat === chat.name ? "selected" : ""}`}
                key={chat.name}
                onClick={() => setSelectedChat(chat.name)}
              >
                {revealedProfiles.includes(chat.name) ? (
                  <img src={chat.image} alt="" />
                ) : (
                  <div className="private-avatar small">
                    <Icon>⌑</Icon>
                  </div>
                )}
                <div>
                  <strong>{chat.name}</strong>
                  <p>{chat.preview}</p>
                </div>
                <time>{chat.time}</time>
                {chat.unread && <span className="unread-dot" />}
              </button>
            ))}
          </div>
          <div className="conversation">
            <div className="conversation-head">
              {isProfileRevealed ? (
                <img src={selectedProfile.image} alt={selectedProfile.name} />
              ) : (
                <div className="private-avatar">
                  <Icon>⌑</Icon>
                </div>
              )}
              <div>
                <strong>
                  {isProfileRevealed ? selectedChat : "Private connection"}
                </strong>
                <span>
                  {isProfileRevealed
                    ? "Profile revealed"
                    : "Chat first · profile hidden"}
                </span>
              </div>
              <button
                className="round-button"
                aria-label="Conversation details"
              >
                <Icon>•••</Icon>
              </button>
            </div>
            <div className="conversation-body">
              <p className="date-divider">Today</p>
              <div className="bubble bubble-them">
                Hey! I loved your answer about Sunday markets.
              </div>
              <div className="bubble bubble-you">
                That makes two of us. There’s a tiny one in Broadway Market I
                think you’d love.
              </div>
              <div className="bubble bubble-them">
                That sounds like a plan ✨
              </div>
            </div>
            {!isProfileRevealed && (
              <div className="reveal-card">
                <div className="reveal-icon">⌑</div>
                <div>
                  <strong>Keep it private, for now</strong>
                  <p>
                    {hasRevealRequest
                      ? `Waiting for ${selectedChat} to choose too.`
                      : "When you’re both ready, reveal your profiles together."}
                  </p>
                </div>
                {hasRevealRequest ? (
                  <button
                    className="reveal-button confirm"
                    onClick={() =>
                      setRevealedProfiles((current) => [
                        ...current,
                        selectedChat,
                      ])
                    }
                  >
                    Reveal together <span>→</span>
                  </button>
                ) : (
                  <button
                    className="reveal-button"
                    onClick={() =>
                      setRevealRequests((current) => [...current, selectedChat])
                    }
                  >
                    I want to reveal <span>→</span>
                  </button>
                )}
              </div>
            )}
            {isProfileRevealed && (
              <div className="revealed-banner">
                <span>✦</span>
                <strong>You both revealed your profiles</strong>
                <button
                  onClick={() =>
                    setRevealedProfiles((current) =>
                      current.filter((name) => name !== selectedChat),
                    )
                  }
                >
                  Hide again
                </button>
              </div>
            )}
            <form
              className="composer"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                aria-label="Write a message"
                placeholder="Write a message…"
              />
              <button aria-label="Send message">
                <Icon>↑</Icon>
              </button>
            </form>
          </div>
        </section>
      );

    return (
      <section className="view-panel discover-view">
        <div className="view-heading discovery-heading">
          <div>
            <p className="eyebrow">Good morning, Alex</p>
            <h1>
              Find your <em>person.</em>
            </h1>
          </div>
          <button
            className="round-button filter-button"
            onClick={() => setActiveView("lobby")}
            aria-label="Open filters"
          >
            <Icon>☷</Icon>
          </button>
        </div>
        <div className="discover-toolbar">
          <div className="location-label">
            <Icon>⌖</Icon>
            <span>London, UK</span>
            <button aria-label="Change location">⌄</button>
          </div>
          <span className="result-count">
            {profiles.length * 14} people nearby
          </span>
        </div>
        <div className="profile-stage">
          <div className="back-card" />
          <div
            className={`profile-card ${isCurrentProfileRevealed ? "revealed" : "locked"}`}
            style={{ "--card-color": profile.colors } as React.CSSProperties}
          >
            {isCurrentProfileRevealed ? (
              <>
                <img
                  src={profile.image}
                  alt={`${profile.name}, ${profile.role}`}
                />
                <div className="image-wash" />
                <div className="card-content">
                  <div className="profile-meta">
                    <div>
                      <h2>
                        {profile.name}, {profile.age}
                        <span className="verified">✓</span>
                      </h2>
                      <p>{profile.role}</p>
                    </div>
                    <span className="profile-distance">{profile.distance}</span>
                  </div>
                  <div className="profile-tags">
                    {profile.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="prompt">
                    <span>{profile.prompt}</span>
                    <strong>{profile.answer}</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="locked-profile">
                <div className="locked-ring">
                  <Icon>⌑</Icon>
                </div>
                <h2>
                  {profile.name}, {profile.age}
                </h2>
                <span className="locked-gender">{profile.gender}</span>
                <p>Profile locked</p>
                <strong>
                  Talk first, then reveal
                  <br />
                  when you both feel ready.
                </strong>
                <button
                  onClick={() => {
                    setSelectedChat(profile.name);
                    setActiveView("messages");
                  }}
                >
                  Start a conversation <span>→</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="card-actions">
          <button
            className="action-button pass"
            onClick={() => chooseProfile("pass")}
            aria-label="Pass on profile"
          >
            <Icon>×</Icon>
          </button>
          <button
            className="action-button rewind"
            onClick={() =>
              setProfileIndex((current) => Math.max(0, current - 1))
            }
            aria-label="Rewind"
          >
            <Icon>↺</Icon>
          </button>
          <button
            className="action-button like"
            onClick={() => chooseProfile("like")}
            aria-label="Like profile"
          >
            <Icon>♡</Icon>
          </button>
          <button
            className="action-button super"
            onClick={() => chooseProfile("like")}
            aria-label="Send a super like"
          >
            <Icon>✦</Icon>
          </button>
        </div>
        <p className="tip">
          <Icon>↔</Icon> Swipe to explore
        </p>
      </section>
    );
  }

  const navItems: [View, string, string][] = [
    ["discover", "⌂", "Discover"],
    ["matches", "♡", "Matches"],
    ["messages", "✉", "Messages"],
  ];
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>pairly</span>
        </div>
        <div className="profile-mini">
          <div className="avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80"
              alt="Alex"
            />
            <span />
          </div>
          <div>
            <strong>Alex Morgan</strong>
            <span>Member since 2024</span>
          </div>
          <button aria-label="Profile menu">•••</button>
        </div>
        <nav>
          {navItems.map(([view, icon, label]) => (
            <button
              className={activeView === view ? "active" : ""}
              key={view}
              onClick={() => setActiveView(view)}
            >
              <Icon>{icon}</Icon>
              <span>{label}</span>
              {view === "matches" && <b>12</b>}
              {view === "messages" && <b>3</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => setActiveView("profile")}>
            <Icon>◌</Icon>
            <span>My profile</span>
          </button>
          <button>
            <Icon>?</Icon>
            <span>Help center</span>
          </button>
          <div className="upgrade">
            <span className="upgrade-icon">✦</span>
            <strong>Pairly Plus</strong>
            <p>See who already likes you.</p>
            <button>
              Try Plus <span>→</span>
            </button>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-brand"
            onClick={() => setActiveView("profile")}
            aria-label="Open your profile"
          >
            <span className="brand-mark">P</span>
            <span>pairly</span>
          </button>
          <div className="topbar-status">
            <span className="status-dot" />
            Your profile is live
          </div>
          <button className="notification" aria-label="Notifications">
            <Icon>♧</Icon>
            <span />
          </button>
        </header>
        {renderContent()}
        <div className="mobile-nav">
          {navItems.map(([view, icon, label]) => (
            <button
              className={activeView === view ? "active" : ""}
              key={view}
              onClick={() => setActiveView(view)}
            >
              <Icon>{icon}</Icon>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </main>
      <aside className="right-rail">
        <div className="rail-heading">
          <h3>Today on Pairly</h3>
          <button aria-label="More options">•••</button>
        </div>
        <div className="rail-card featured-card">
          <div className="rail-photo">
            <img src={profiles[1].image} alt="Amelia" />
            <span>✦ Featured</span>
          </div>
          <div className="rail-copy">
            <strong>Meet Amelia</strong>
            <p>
              Brand strategist who loves finding the best hidden spots in the
              city.
            </p>
            <button onClick={() => setActiveView("discover")}>
              View profile <span>→</span>
            </button>
          </div>
        </div>
        <div className="rail-heading upcoming-heading">
          <h3>Upcoming events</h3>
          <button className="text-button">
            See all <span>→</span>
          </button>
        </div>
        <div className="event-row">
          <span className="event-date">
            24 <small>MAR</small>
          </span>
          <div>
            <strong>Sunday Social</strong>
            <p>Coal Drops Yard · 6:30 pm</p>
          </div>
          <button aria-label="Add event">＋</button>
        </div>
        <div className="event-row">
          <span className="event-date">
            28 <small>MAR</small>
          </span>
          <div>
            <strong>Matcha & Make</strong>
            <p>Peckham Levels · 11:00 am</p>
          </div>
          <button aria-label="Add event">＋</button>
        </div>
        <div className="rail-quote">
          <span>“</span>
          <p>Dating is a conversation, not a performance.</p>
          <small>— Pairly journal</small>
        </div>
      </aside>
    </div>
  );
}

export default App;
