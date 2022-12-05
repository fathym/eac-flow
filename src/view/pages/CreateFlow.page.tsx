import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import Gallery from '../../common/Gallery';
import { GalleryItem } from '../../common/GalleryItem';
import { FathymFlow } from '../../stories/common/FathymFlow';

export class CreateFlowPageProperties {
  public createFlow!: (flow: FathymFlow) => void;

  public flowName?: string;

  public flowTemplate?: string;

  public getTemplateData!: (lookup: string) => { [key: string]: any };

  public templates?: GalleryItem[];
}

class CreateFlowPageState {
  public FlowName!: string;

  public SelectedTemplate!: string;

  public TemplatesOpen: boolean;

  constructor() {
    this.FlowName = '';

    this.SelectedTemplate = '';

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

    this.state = {
      ...new CreateFlowPageState(),
      FlowName: props.flowName || '',
      SelectedTemplate: props.flowTemplate || '',
    };

    this.handleFlowNameChange = this.handleFlowNameChange.bind(this);
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    const curItem = this.props.getTemplateData(this.state.SelectedTemplate);

    return (
      <Box
        display="flex"
        flex="1"
        justifyContent="center"
        sx={{ paddingTop: '4em', margin: '2em' }}
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
            Fathym Flow
          </Typography>

          <div>
            <TextField
              id="flowName"
              label="Flow Name"
              variant="standard"
              value={this.state.FlowName}
              defaultValue={this.props.flowName}
              onChange={this.handleFlowNameChange}
            />
          </div>

          <Stack spacing={2}>
            {!!this.props.templates && (
              <Button
                color="secondary"
                variant={!curItem ? 'outlined' : undefined}
                onClick={() => this.setDrawerState(true)}
              >
                {!this.state.SelectedTemplate
                  ? 'Click to select a template'
                  : 'Click to change selected template'}
              </Button>
            )}

            <Button
              color="primary"
              variant="contained"
              onClick={() => this.handleCreateFlow()}
            >
              {!this.state.SelectedTemplate
                ? `Create 'Blank' Flow`
                : `Create '${curItem?.Name}' Flow`}
            </Button>
          </Stack>
        </Box>

        {!!this.props.templates && this.buildTemplatesDrawer()}
      </Box>
    );
  }
  //#

  //# Helpers
  protected buildTemplatesDrawer(): React.ReactNode {
    return (
      <Drawer
        anchor="bottom"
        open={this.state.TemplatesOpen}
        onClose={() => this.setDrawerState(false)}
      >
        <Box
          sx={{
            maxHeight: '350px',
            overflowY: 'auto',
            padding: '1em',
          }}
        >
          <Gallery
            title="Select a Template"
            singleItemDisplay={(catItem) => catItem.Lookup}
            singleItemTitle={(catItem) =>
              `Select ${
                this.props.getTemplateData(catItem.Lookup).Name
              } Template`
            }
            items={this.props.templates}
            spacing="1em .5em"
            itemSpacing=".5em"
            useItem={(catItem) => this.handleUseItem(catItem)}
          >
            {(catItem, itemSelected) => (
              <Box
                key={catItem.Lookup}
                sx={{
                  width: '100px',
                  display: 'flex',
                  height: '100px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button variant="contained" onClick={() => itemSelected()}>
                  {this.props.getTemplateData(catItem.Lookup).Name}
                </Button>
              </Box>
            )}
          </Gallery>
        </Box>
      </Drawer>
    );
  }

  protected handleCreateFlow(): void {
    this.props.createFlow({
      Name: this.state.FlowName || '',
      Template: this.state.SelectedTemplate || '',
    });
  }

  protected handleUseItem(item: GalleryItem): void {
    this.setState({
      SelectedTemplate: item?.Lookup,
      TemplatesOpen: false,
    });
  }

  protected handleFlowNameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    this.setState({
      FlowName: event.target.value,
    });
  }

  protected setDrawerState(open: boolean): void {
    this.setState({
      TemplatesOpen: open,
    });
  }
  //#
}
