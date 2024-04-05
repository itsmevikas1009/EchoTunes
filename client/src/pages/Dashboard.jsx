import AppLayout from "../components/AppLayout";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="main-content">
        <div className="sticky-nav">
          <div className="sticky-nav-icons">
            {/* <i className="fa-solid fa-angle-left"></i> */}
            {/* <i className="fa-solid fa-angle-right"></i> */}
          </div>
          <div className=" sticky-nav-options">
            {/* <button className="badge sticky-nav-items hide">Explore Premium</button> */}
            {/* <button className="badge sticky-nav-items dark-badge">
                        <i className="fa-regular fa-circle-down" style="margin-right: 5px;"></i>
                        Install App
                    </button> */}
            {/* <i className="fa-solid fa-bell sticky-nav-items"></i> */}
            {/* <i className="fa-regular fa-user sticky-nav-items"></i> */}
          </div>
        </div>
        <h2 className="">Recently Played</h2>
        <div className="cards-container">
          <div className="card">
            {/* <img src="./assets/card1img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
        </div>
        <h2 className="">Trending now near you</h2>
        <div className="cards-container">
          <div className="card">
            {/* <img src="./assets/card2img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
          <div className="card">
            {/* <img src="./assets/card3img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
          <div className="card">
            {/* <img src="./assets/card4img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
          <div className="card">
            {/* <img src="./assets/card5img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
          <div className="card">
            {/* <img src="./assets/card6img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
          <div className="card">
            {/* <img src="./assets/card4img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
        </div>
        <h2 className="">Featured Charts</h2>
        <div className="cards-container">
          <div className="card">
            {/* <img src="./assets/card4img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
          <div className="card">
            {/* <img src="./assets/card5img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
          <div className="card">
            {/* <img src="./assets/card6img.jpeg" alt="" className="card-img"> */}
            <p className="card-title">Top 50 - Global</p>
            <p className="card-info">Your daily update of the most played...</p>
          </div>
        </div>
        <div className="footer">
          <div className="line"></div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
