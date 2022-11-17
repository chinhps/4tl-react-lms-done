import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid, GridItem, Flex } from '@chakra-ui/react';
import Overviews from './component/Overviews';
import Card from '../../Components/Core/Card/Card';
import HistoryCourse from '../../Components/Core/Table/HistoryCourse';
import MiniCalendar from '../../Components/Core/MiniCalendar/MiniCalendar';

function Coures() {
  return (
    <>
      <Grid
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <GridItem gridArea={{ xl: '1 / 1 / 3 / 3', '2xl': '1 / 1 / 2 / 2' }}>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Tổng quan</Tab>
              <Tab>Tài liệu</Tab>
              <Tab>Bài tập</Tab>
              <Tab>Thông tin</Tab>
            </TabList>
              <TabPanels>
                <TabPanel>
                  <Overviews />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem>
        <Flex flexDirection="column" gap="20px">
            <MiniCalendar minW="100%" selectRange={false} />
            <HistoryCourse />
        </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

export default Coures;
