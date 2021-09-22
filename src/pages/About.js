import React from "react";
import "./About.css";

const About = () => {
  return (
    <div class="align">
      <div class="card-container">
        <div class="card-vertical">
          <div class="card-front">
            <article class="card-front-content">
              <h1>This App was built using... </h1>
              <p>Hover Me</p>
            </article>
          </div>
          <div class="card-back">
            <article class="card-back-content">
              <img
                src="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
                alt=""
              />
            </article>
          </div>
        </div>
      </div>
      <div class="align">
        <div class="card-container">
          <div class="card-vertical">
            <div class="card-front">
              <article class="card-front-content">
                <h1>And... </h1>
              </article>
            </div>
            <div class="card-back">
              <article class="card-back-content">
                <h1>Firebase</h1>
                <img
                  src="https://1.bp.blogspot.com/-YIfQT6q8ZM4/Vzyq5z1B8HI/AAAAAAAAAAc/UmWSSMLKtKgtH7CACElUp12zXkrPK5UoACLcB/s1600/image00.png"
                  alt=""
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
