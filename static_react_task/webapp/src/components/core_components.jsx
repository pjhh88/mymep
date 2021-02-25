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
    <section className="hero is-info welcome">
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

  const poster_background = ' ' + 'has-background-danger-light';
  const commenter_background = ' ' + 'has-background-info-light';

  const listText = taskData.message.map((utt, i) => {
    if (i % 2 == 1) {
      return (
          <div className="column">
            <div className={"box" + poster_background}
                 style={{marginLeft: "0", marginRight: "0", float: 'left'}}>
              <p className="content">{utt.utterance}</p>
            </div>
          </div>
      )
    }
    else {
      return (
          <div className="column">
            <div className={"box" + commenter_background}
                 style={{marginLeft: "0", marginRight: "0", float: 'right'}}>
              <p className="content">{utt.utterance}</p>
            </div>
          </div>
      )
    }
    }
  );

  // if (loading) return <div>Loading...</div>
  return (
    <div>
      <Directions>
        Directions: Please write contradict sentence on dialog.
      </Directions>
      <section id="dialog_section" className="section">
        <div className="container">
          <div className="columns is-flex-direction-column">
            <div className='column'>
              <div className="icon-text">
                <span className="icon has-text-info">
                  <i className="fas fa-info-circle"></i>
                </span>
                <span>Information</span>
              </div>

              <div className="field is-grouped is-grouped-multiline">
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-dark">poster</span>
                    <span className="tag is-danger" style={{width: '50px'}}> </span>
                  </div>
                </div>

                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-dark">commenter</span>
                    <span className="tag is-info"style={{width: '50px'}}> </span>
                  </div>
                </div>

              </div>
            </div>
            <div id="dialog" className="column">
              <div className="columns is-flex-direction-column">
                <div id='persona' className="column">
                  <div className={'box' + poster_background}
                       style={{marginLeft: "0", marginRight: "0", float: 'left'}}>
                    <p className="content">{taskData.persona}</p>
                  </div>
                </div>

                {listText}
              </div>
            </div>
            <div id="user utterance" className="column">
            {/*<p className="subtitle is-5"></p>*/}
            {/*<p className="title is-3 is-spaced"></p>*/}
              <div className="field">
                <label className="label">Please type your contradict utterance</label>
                <div className="control">
                  <input className="input" type="text" placeholder="contradict sentence"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { LoadingScreen, SimpleFrontend as BaseFrontend };
