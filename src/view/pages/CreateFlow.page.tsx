import React from 'react';

class CreateFlowPageProperties {}

class CreateFlowPageState {}

export default class CreateFlowPage extends React.Component<
  CreateFlowPageProperties,
  CreateFlowPageState
> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: CreateFlowPageProperties) {
    super(props);

    this.state = new CreateFlowPageState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    return (
      <div>
        Create Flow
      </div>
    );
  }
  //#

  //# Helpers
  //#
}
