import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import {
  FathymAction,
  FathymActionModel,
  FathymActionTypes,
} from '../../common/FathymAction';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';

export class BaseLayoutProperties {
  public actions?: FathymActionModel[];

  public children: React.ReactNode;

  public title!: string;
}

export class BaseLayoutState {
  public DrawerOpen!: boolean;
}

export default class BaseLayout extends React.Component<
  BaseLayoutProperties,
  BaseLayoutState
> {
  //#  Fields
  protected get hasActions(): boolean {
    return !!this.props.actions;
  }

  protected get hasMultipleActions(): boolean {
    return this.hasActions && this.props.actions!.length > 1;
  }
  //#

  //# Properties
  //#

  //# Constructors
  constructor(props: BaseLayoutProperties) {
    super(props);

    this.state = new BaseLayoutState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    const drawer = this.loadDrawer();

    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            {this.hasMultipleActions ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => this.handleDrawerToggle()}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ''
            )}

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
              }}
            >
              {this.props.title}
            </Typography>

            <Box
              sx={{
                display: {
                  xs: this.hasMultipleActions ? 'none' : 'block',
                  sm: 'block',
                },
              }}
            >
              {this.props.actions?.map((action, i) => (
                <FathymAction
                  action={action}
                  key={i}
                  type={FathymActionTypes.Button}
                  sx={{ color: '#fff' }}
                />
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="nav">{drawer}</Box>

        <Box
          sx={{
            marginTop: 'calc(56px)',
          }}
        >
          {this.props.children}
        </Box>
      </Box>
    );
  }
  //#

  //# Helpers
  protected handleDrawerToggle(): void {
    this.setState({
      DrawerOpen: !this.state.DrawerOpen,
    });
  }

  protected loadDrawer(): React.ReactNode {
    return (
      <Drawer
        variant="temporary"
        open={this.state.DrawerOpen}
        onClose={() => this.handleDrawerToggle()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '80%',
            maxWidth: '350px',
          },
        }}
      >
        <Box
          onClick={() => this.handleDrawerToggle()}
          sx={{ textAlign: 'center' }}
        >
          <Typography variant="h6" sx={{ my: 2 }}>
            {this.props.title}
          </Typography>

          <Divider />

          <List>
            {this.props.actions?.map((action, i) => (
              <ListItem key={i} disablePadding>
                <FathymAction
                  action={action}
                  type={FathymActionTypes.ListItem}
                  sx={{ textAlign: 'center' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    );
  }
  //#
}
