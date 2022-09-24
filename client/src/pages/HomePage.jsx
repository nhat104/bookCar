import { Button, Container, Image, Input, Loading, styled, Text } from '@nextui-org/react';
import VehicleList from '../components/VehicleList';

export default function HomePage() {
  return (
    <Wrapper>
      <Image
        showSkeleton
        css={{ position: 'fixed', zIndex: -1 }}
        src="./board.png"
        alt="Default Image"
        objectFit="cover"
      />
      <ContainerStyled sm>
        <Text h1 color="secondary">
          Book Car
        </Text>
        <InputGroup>
          <Input label="ĐIỂM ĐI" size="md" rounded color="secondary" />
          <Image src="./swap.svg" css={{ cursor: 'pointer', mb: '$3' }} />
          <Input label="ĐIỂM ĐẾN" size="md" rounded color="secondary" />
          <Input label="NGÀY" type="date" rounded color="secondary" />
          <Button rounded>
            Tìm vé
            <Loading type="points" css={{ pl: 4 }} color="currentColor" size="sm" />
          </Button>
        </InputGroup>
        <VehicleList />
      </ContainerStyled>
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  position: 'relative',
  width: '100%',
  backgroundColor: 'unset !important',
});

const ContainerStyled = styled(Container, {
  minHeight: 'calc(100vh - 76px)',
  display: 'flex !important',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
});

const InputGroup = styled('div', {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'end',
});
