import React from 'react';
import BaseLayout, { BaseLayoutProperties } from './base.layout';

class NoEscapeLayoutProperties extends BaseLayoutProperties {}

class NoEscapeLayoutState {}

export default class NoEscapeLayout extends React.Component<
  NoEscapeLayoutProperties,
  NoEscapeLayoutState
> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: NoEscapeLayoutProperties) {
    super(props);

    this.state = new NoEscapeLayoutState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    return (
      <BaseLayout title={this.props.title}>
        {this.props.children}
      </BaseLayout>
    );
  }
  //#

  //# Helpers
  //#
}
