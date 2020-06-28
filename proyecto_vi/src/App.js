import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Container, Button} from 'react-bootstrap';

// Import de componentes
import RadialTimeline from './components/radial_timeline/radial_timeline';
import Hierarchy from './components/hierarchy/hierarchy';
import SmallMultiples from './components/small_multiples/small_multiples';

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Radial Timeline</Tab>
        <Tab>Hierarchy</Tab>
        <Tab>SmallMultiples</Tab>
      </TabList>

      <TabPanel>
        <Container fluid>
          <RadialTimeline />
        </Container>
      </TabPanel>
      <TabPanel>
        <Container fluid>
          <Hierarchy />
        </Container>
      </TabPanel>
      <TabPanel>
        <Container>
          <SmallMultiples />
        </Container>
      </TabPanel>
    </Tabs>
  );
}

export default App;
