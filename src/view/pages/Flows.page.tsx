import { Launch } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FathymAction, FathymActionTypes } from '../../common/FathymAction';
import { FathymFlow } from '../../stories/common/FathymFlow';

class FlowsPageProperties {
  public createFlow!: () => void;

  public flows: FathymFlow[];

  public flowSelected!: (flow: FathymFlow) => void;

  constructor() {
    this.flows = [];
  }
}

class FlowsPageState {}

export default class FlowsPage extends React.Component<
  FlowsPageProperties,
  FlowsPageState
> {
  //#  Fields
  static defaultProps = new FlowsPageProperties();
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
    const hasFlows = this.props.flows?.length > 0;

    const curUI = hasFlows ? this.flowsUI() : this.noFlowsUI();

    return (
      <Box display="flex" justifyContent="center" sx={{ margin: '2em' }}>
        {curUI}
      </Box>
    );
  }
  //#

  //# Helpers
  protected flowsUI(): React.ReactNode {
    return (
      <Box display="flex" flexDirection="column" flex="0 0 100%">
        <Box display="flex" flexDirection="row">
          <Typography variant="h3">Fathym Flows</Typography>

          <Box flex="1 1 auto" />

          <FathymAction
            action={{
              Text: 'Create Flow',
              Action: async () => this.props.createFlow(),
              variant: 'contained',
            }}
            type={FathymActionTypes.Button}
          />
        </Box>

        <Box sx={{ margin: '2em' }}>
          <Grid container>
            {this.props.flows?.map((flow) => (
              <Grid key={flow.Lookup} xs={12} sm={6} md={4} item={true}>
                <Card sx={{ margin: '1em', padding: '1em' }}>
                  <CardContent>
                    <Typography variant="h4">{flow.Name}</Typography>
                  </CardContent>

                  <CardActions>
                    <Button onClick={() => this.props.flowSelected(flow)}>
                      Edit Flow
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }
  
  protected noFlowsUI(): React.ReactNode {
    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="h3" textAlign="center" sx={{ marginY: '1em' }}>
          Welcome to Fathym
        </Typography>

        <Button
          variant="contained"
          sx={{ marginY: '1em' }}
          onClick={() => this.props.createFlow()}
        >
          Create First Flow
        </Button>

        <Button variant="outlined" sx={{ marginY: '1em' }}>
          See Use Cases <Launch />
        </Button>

        <Button sx={{ marginY: '1em' }}>
          Read Documentation <Launch />
        </Button>
      </Box>
    );
  }
  //#
}
