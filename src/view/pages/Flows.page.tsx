import React from 'react';

class FlowsPageProperties {}

class FlowsPageState {}

export default class FlowsPage extends React.Component<
  FlowsPageProperties,
  FlowsPageState
> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: FlowsPageProperties) {
    super(props);

    this.state = new FlowsPageState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    return <div>Flows List</div>;
  }
  //#

  //# Helpers
  //#
}
