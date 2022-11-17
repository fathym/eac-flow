import React from 'react';
import BaseLayout, { BaseLayoutProperties } from './base.layout';

class MainLayoutProperties extends BaseLayoutProperties {
}

class MainLayoutState {}

export default class MainLayout extends React.Component<
  MainLayoutProperties,
  MainLayoutState
> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: MainLayoutProperties) {
    super(props);

    this.state = new MainLayoutState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    return (
      <BaseLayout title={this.props.title} actions={this.props.actions}>
        {this.props.children}
      </BaseLayout>
    );
  }
  //#

  //# Helpers
  //#
}
