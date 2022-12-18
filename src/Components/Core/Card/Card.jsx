import { Box, Spinner, useStyleConfig } from '@chakra-ui/react';
function Card(props) {
  const { variant, children, isLoading, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });

  return (
    <Box __css={styles} {...rest} mb={2}>
      {isLoading ? <Spinner /> : children}
    </Box>
  );
}

export default Card;
