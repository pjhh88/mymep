/*
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {useState, useEffect} from "react";

function OnboardingComponent({ onSubmit }) {
  return (
    <div>
      <Directions>
        This component only renders if you have chosen to assign an onboarding
        qualification for your task. Click the button to move on to the main
        task.
      </Directions>
      <button
        className="button is-link"
        onClick={() => onSubmit({ success: true })}
      >
        Move to main task.
      </button>
    </div>
  );
}

function LoadingScreen() {
  return <Directions>Loading...</Directions>;
}

function Directions({ children }) {
  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container">
          <p className="subtitle is-5">{children}</p>
        </div>
      </div>
    </section>
  );
}

function SimpleFrontend({ taskData, isOnboarding, onSubmit, onError }) {
  if (!taskData) {
    return <LoadingScreen />;
  }
  if (isOnboarding) {
    return <OnboardingComponent onSubmit={onSubmit} />;
  }

  const listText = taskData.text.map((utt, i) => (
    <div className="column">
      <div className="box has-background-primary" style={{ marginLeft: "0", marginRight: "0", float: (i % 2 === 0 ? "left" : "right")}}>
        <p className="content">{utt}</p>
      </div>
    </div>
    )
  );

  // if (loading) return <div>Loading...</div>
  return (
    <div>
      <Directions>
        Directions: Please write contradict sentence on dialog.
      </Directions>
      <section className="section">
        <div className="container">
                  <div className="columns is-flex-direction-column">
          <div className="column">
            <div className="columns is-flex-direction-column">
            {listText}
          </div>
          </div>
          <div className="column">
            <p className="subtitle is-5"></p>
          <p className="title is-3 is-spaced">Write your contradiction utterance</p>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-success is-large"
                onClick={() => onSubmit({ rating: "good" })}
              >
                Mark as Good
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger is-large"
                onClick={() => onSubmit({ rating: "bad" })}
              >
                Mark as Bad
              </button>
            </div>
          </div>
          </div>
        </div>
        </div>

        {/*<div className="container">*/}
        {/*  */}
        {/*</div>*/}
        {/*<div className="container">*/}
        {/*  */}
        {/*</div>*/}
      </section>
    </div>
  );
}

export { LoadingScreen, SimpleFrontend as BaseFrontend };
