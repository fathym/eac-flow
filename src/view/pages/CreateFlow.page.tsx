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
              color="primary"
              variant="outlined"
              onClick={() => this.setDrawerState(true)}
            >
              Create from Template
            </Button>

            <Button color="secondary">Create Blank Flow</Button>
          </Stack>
        </Box>

        <Drawer
          anchor="bottom"
          open={this.state.TemplatesOpen}
          onClose={() => this.setDrawerState(false)}
        >
          <Box sx={{ maxHeight: '450px', overflowY: 'auto', padding: '1em' }}>
            <Gallery
              title="Create Templates"
              items={reusableItems}
              spacing="1em .5em"
              itemSpacing=".5em"
            >
              {(catItem: GalleryItem) => (
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
                  {reusableItemData[catItem.Lookup].Name}
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
  protected setDrawerState(open: boolean): void {
    this.setState({
      TemplatesOpen: open,
    });
  }
  //#
}
