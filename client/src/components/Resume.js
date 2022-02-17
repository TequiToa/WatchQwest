import React, { useContext } from "react";
import Context from "../context/Context";
import Avatar from "react-nice-avatar";

import "../styles/resume.sass";

function Resume({ user, stats }) {
  const { toggleAuth, isAuth, avatar, username } = useContext(Context);

  return (
    <div className="resume">
      <div className="resumeTitle">{username}</div>
      <div>
        <Avatar
          style={{
            width: "100px",
            height: "100px",
          }}
          {...avatar}
        />
      </div>
      {/* <div>Lvl : {user.xp / 1000}</div> */}
      <div className="resumeStats">
        <div className="resumeGold">{stats.totalAnime}</div>
        <div className="resumeGold">{stats.days}</div>
        <div className="resumeGold">{stats.scores}</div>
        <div className="resumeSilver">Total Anime</div>
        <div className="resumeSilver">Days Watched</div>
        <div className="resumeSilver">Mean Score</div>
      </div>
    </div>
  );
}

export default Resume;
