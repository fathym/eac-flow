import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import TemplatesGallery from '../controls/TemplatesGallery';

class CreateFlowPageProperties {
  public flowName?: string;
}

class CreateFlowPageState {
  public TemplatesOpen: boolean;

  constructor() {
    this.TemplatesOpen = false;
  }
}

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
      <Box
        display="flex"
        flex="1"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="2em"
        >
          <Typography variant="h4" component="div" textAlign="center">
            Create New
            <br />
            Fatyhm Flow
          </Typography>

          <div>
            <TextField
              id="flowName"
              label="Flow Name"
              variant="standard"
              value={this.props.flowName}
            />
          </div>

          <Stack spacing={2}>
            <Button color="primary" variant="outlined">
              Create from Template
            </Button>

            <Button color="secondary">Create Blank Flow</Button>
          </Stack>
        </Box>

        <Drawer
          anchor="bottom"
          open={true}
          onClose={() => this.setDrawerState(false)}
        >
          <TemplatesGallery />
        </Drawer>
      </Box>
    );
  }
  //#

  //# Helpers
  protected setDrawerState(open: boolean): void {
    this.setState({
      TemplatesOpen: open,
    });
  }
  //#
}
