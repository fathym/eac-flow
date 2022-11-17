import React from 'react';
import { FathymActionModel } from '../../common/FathymAction';
import BaseLayout, { BaseLayoutProperties } from './base.layout';

export class FlowLayoutProperties extends BaseLayoutProperties {}

export class FlowLayoutState {}

export default class FlowLayout extends React.Component<
  FlowLayoutProperties,
  FlowLayoutState
> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: FlowLayoutProperties) {
    super(props);

    this.state = new FlowLayoutState();
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
