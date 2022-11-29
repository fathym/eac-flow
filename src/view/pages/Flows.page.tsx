import React from 'react';
import { FathymAction, FathymActionTypes } from '../../common/FathymAction';

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
    return (
      <div>
        Flows List
        <div>
          <FathymAction
            action={{
              Text: 'Create Flow',
              Action: '/flows/create',
              variant: 'outlined',
              color: 'primary',
            }}
            type={FathymActionTypes.Button}
          />
        </div>
      </div>
    );
  }
  //#

  //# Helpers
  //#
}
