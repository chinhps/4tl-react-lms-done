import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import MiniStatistics from '../../Components/Core/Card/MiniStatistics';
import IconBox from '../../Components/Core/icons/IconBox';

function StatsCard(props) {
  const { title, stat, icon } = props;
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'white');

  return (
    <>
      <MiniStatistics
        startContent={
          <IconBox w="75px" h="75px" bg={boxBg} icon={<Icon w="32px" h="32px" as={icon} color={brandColor} />} />
        }
        name={title}
        value={stat}
      />
    </>
  );
}

export default StatsCard;
