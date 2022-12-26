import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HistoryCourse from '../../Components/Core/Table/HistoryCourse';
import { fetchBranches } from '../../reducer/branchSlide';
import Projects from './component/Projects';

const Classes = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { pending: pendingBranch, listBranches, title: titleBranch } = useSelector((state) => state.branches);
  const { workSomeThing } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(
      fetchBranches({
        slug: params.slug ?? null,
        table: params.table ?? '',
      }),
    );
  }, [params, workSomeThing]);
  return (
    <>
      <Grid
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'flex', xl: 'grid' }}
        flexDirection="column"
      >
        <GridItem gridArea={{ xl: '1 / 1 / 3 / 3', '2xl': '1 / 1 / 2 / 2' }}>
          <Projects title={titleBranch} data={listBranches} pendingBranch={pendingBranch} />
        </GridItem>
        <GridItem>
          <HistoryCourse limit={5} />
        </GridItem>
      </Grid>
    </>
  );
};

export default Classes;
