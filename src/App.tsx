import React from 'react';
import './App.css';
import { SharedMap } from 'fluid-framework';
import {
  AzureClient,
  AzureClientProps,
  AzureLocalConnectionConfig,
  AzureRemoteConnectionConfig,
  AzureUser,
} from '@fluidframework/azure-client';
import { InsecureTokenProvider } from '@fluidframework/test-client-utils';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  NavigateFunction,
} from 'react-router-dom';
import FlowsPage from './view/pages/Flows.page';
import { FathymFlow } from './stories/common/FathymFlow';
import FlowPage from './view/pages/Flow.page';
import CreateFlowPage from './view/pages/CreateFlow.page';
import FlowLayout from './view/layouts/flow.layout';
import MainLayout from './view/layouts/main.layout';
import NoEscapeLayout from './view/layouts/no-escape.layout';
import { FathymActionModel } from './common/FathymAction';
import CssBaseline from '@mui/material/CssBaseline';
import { withRouter } from './common/withRouter.hoc';
import { GalleryItem } from './common/GalleryItem';

class AppProperties {
  // public navigate?: NavigateFunction;
}

class AppState {
  public Data?: SharedMap;

  public Time?: Date;
}

class App extends React.Component<AppProperties, AppState> {
  //#  Fields
  protected theme: Theme;
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: AppProperties) {
    super(props);

    this.state = new AppState();

    this.theme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#4a918e',
        },
        secondary: {
          main: '#4A7191',
        },
      },
    });
  }
  //#

  //# Life Cycle
  public async componentDidMount() {
    // await this.setCurrentTime();
  }
  //#
  protected async setCurrentTime() {
    let sharedTime = await this.getFluidSharedTime();

    this.setState({
      Time: sharedTime.get('current'),
    });
  }

  //# API Methods
  public render() {
    const reusableItemData: { [key: string]: any } = {};

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
          Type: 'Template',
        } as GalleryItem;
      }
    );

    const standardActions: FathymActionModel[] = [
      {
        Action: '/dashboard',
        Props: {},
        Text: 'Home',
      },
      {
        Action: '/flows',
        Props: {},
        Text: 'Flows',
      },
    ];

    const curFlow: FathymFlow | undefined = undefined;

    return (
      <ThemeProvider theme={this.theme}>
        <CssBaseline />

        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/flows" replace />} />

            <Route path="flow">
              <Route
                path=":lookup"
                element={
                  <FlowLayout
                    title="Fathym Flow Manager"
                    actions={standardActions}
                  >
                    <FlowPage flow={curFlow} />
                  </FlowLayout>
                }
              />
            </Route>

            <Route path="flows">
              <Route
                path=""
                element={
                  <MainLayout title="Fathym Flows" actions={standardActions}>
                    <FlowsPage
                      createFlow={() => {
                        this.navigate('/flows/create');
                      }}
                      flows={[]}
                      flowSelected={(flow) => {
                        this.navigate(`/flow/${flow.Lookup}`);
                      }}
                    />
                  </MainLayout>
                }
              />

              <Route
                path="create"
                element={
                  <NoEscapeLayout title="Fathym Flow">
                    <CreateFlowPage
                      createFlow={(flow) => this.handleCreateFlow(flow)}
                      getTemplateData={(lookup) => reusableItemData[lookup || '']}
                      templates={reusableItems}
                    />
                  </NoEscapeLayout>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
  //#

  //# Helpers
  protected buildClient(): AzureClient {
    const config: AzureRemoteConnectionConfig | AzureLocalConnectionConfig = {
      tokenProvider: new InsecureTokenProvider('', {
        id: 'userId',
      } as AzureUser),
      endpoint: 'http://localhost:7070',
      type: 'local',
    };

    const clientProps: AzureClientProps = {
      connection: config,
    };

    const client = new AzureClient(clientProps);

    return client;
  }

  protected async getFluidSharedTime(): Promise<SharedMap> {
    const client = this.buildClient();

    const containerSchema = {
      initialObjects: { sharedTime: SharedMap },
    };

    let container;
    const containerId = window.location.hash.substring(1);
    if (!containerId) {
      ({ container } = await client.createContainer(containerSchema));

      let sharedTime = container.initialObjects.sharedTime as SharedMap;

      sharedTime.set('current', Date.now().toString());

      const id = await container.attach();

      window.location.hash = id;
    } else {
      ({ container } = await client.getContainer(containerId, containerSchema));
    }

    return container.initialObjects.sharedTime as SharedMap;
  }

  protected handleCreateFlow(flow: FathymFlow): void {
    console.log(flow);
  }

  protected navigate(path: string): void {
    window.location.href = path;

    // this.props.navigate &&
    //   this.props.navigate(path);
  }
  //#
}

// export default withRouter(App);
export default App;
