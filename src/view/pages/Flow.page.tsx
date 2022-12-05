import React from 'react';
import { FathymFlow } from "../../stories/common/FathymFlow";

class FlowPageProperties {
  public flow!: FathymFlow;
}

class FlowPageState {}

export default class FlowPage extends React.Component<
  FlowPageProperties,
  FlowPageState
> {
  //#  Fields
  static defaultProps = new FlowPageProperties();
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
