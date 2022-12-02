import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import Gallery from '../../common/Gallery';
import { GalleryItem } from '../../common/GalleryItem';

class CreateFlowPageProperties {
  public flowName?: string;

  public flowTemplate?: string;
}

class CreateFlowPageState {
  public SelectedTemplate?: string;

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

    this.state = {
      ...new CreateFlowPageState(),
      SelectedTemplate: props.flowTemplate,
    };
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    const reusableItemData: { [lookup: string]: any } = {};

    const reusableItems = Array.from(new Array(50), (x, i) => i + 1).map(
      (i) => {
        const randCat1 = Math.floor(Math.random() * 5);
        const randCat2 = Math.floor(Math.random() * 5);

        const lookup = `test-item-${i}`;

        reusableItemData[lookup] = {
          Name: `Test Item ${i}`,
        };

        return {
          Lookup: lookup,
          Categories: [`Cat ${randCat1}`, `Cat ${randCat2}`],
          Type: 'AType',
        };
      }
    );

    const curItem = reusableItemData[this.state.SelectedTemplate || ''];

    return (
      <Box
        display="flex"
        flex="1"
        justifyContent="center"
        minHeight="100vh"
        sx={{ paddingTop: '8em' }}
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

            {this.state.SelectedTemplate}
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
            <Button
              color="secondary"
              variant={!curItem ? 'outlined' : undefined}
              onClick={() => this.setDrawerState(true)}
            >
              {!this.state.SelectedTemplate
                ? 'Click to select a template'
                : 'Click to change selected template'}
            </Button>

            <Button color="primary" variant="contained" onClick={() => this.handleCreateFlow()}>
              {!this.state.SelectedTemplate
                ? 'Create Blank Flow'
                : `Create '${curItem?.Name}' Template Flow`}
            </Button>
          </Stack>
        </Box>

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
                `Select ${reusableItemData[catItem.Lookup].Name} Template`
              }
              items={reusableItems}
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
                  <Button onClick={() => itemSelected()}>
                    {reusableItemData[catItem.Lookup].Name}
                  </Button>
                </Box>
              )}
            </Gallery>
          </Box>
        </Drawer>
      </Box>
    );
  }
  //#

  //# Helpers
  protected handleCreateFlow(): void {

    alert(this.state.SelectedTemplate);
  }

  protected handleUseItem(item: GalleryItem): void {
    this.setState({
      SelectedTemplate: item?.Lookup,
      TemplatesOpen: false,
    });
  }

  protected setDrawerState(open: boolean): void {
    this.setState({
      TemplatesOpen: open,
    });
  }
  //#
}
