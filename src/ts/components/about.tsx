import * as React from 'react';
import { Button as SemanticButton, Breadcrumb, Rating as RatingSemantic } from "semantic-ui-react";

export const About: React.StatelessComponent<{}> = () => {
  return (
    <div className="row about-page">

      <div className="jumbotron">


        <hr />
        <div>
          <h1>Rate this site</h1>
        </div>

        <div className="col-xs-12">
          <h1>
            <small>This sample shows how usage of Ant Design library for React components.</small>
          </h1>
        </div>

        <hr />

        <div className="cos-sm-6">
          <h2>give rating about this movie</h2>
          <hr />
        </div>

        <div className="col-xs-12 top-buffer">
          <h3>Highlights</h3>
          <hr />

          <h3>
            <small>The most interesting parts worth to take a look</small>
          </h3>
        </div>


      </div>
    </div>
  );
}