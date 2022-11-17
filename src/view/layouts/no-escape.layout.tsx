import React from 'react';
import { FathymActionModel } from '../../common/FathymAction';
import BaseLayout from './base.layout';

class NoEscapeLayoutProperties {
  public action?: FathymActionModel;

  public children: React.ReactNode;

  public title!: string;
}

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
    const actions = this.props.action ? [this.props.action!] : [];

    return (
      <BaseLayout title={this.props.title} actions={actions}>
        {this.props.children}
      </BaseLayout>
    );
  }
  //#

  //# Helpers
  //#
}
