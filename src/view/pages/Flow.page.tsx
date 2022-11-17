import React from 'react';

class FlowPageProperties {}

class FlowPageState {}

export default class FlowPage extends React.Component<
  FlowPageProperties,
  FlowPageState
> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: FlowPageProperties) {
    super(props);

    this.state = new FlowPageState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    return <div>Flow Manager Page</div>;
  }
  //#

  //# Helpers
  //#
}
