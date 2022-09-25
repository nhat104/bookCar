import { Button, Container, Image, Input, Loading, styled, Text } from '@nextui-org/react';
import { useState } from 'react';
import VehicleList from '../../components/VehicleList';

export default function HomePage() {
  const [location, setLocation] = useState(['Hà Nội', 'Nam Định']);

  const handleChangeLocation = () => {
    setLocation([location[1], location[0]]);
  };

  const handleSearchTicket = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get('date'));
  };

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
        <InputGroup as="form" onSubmit={handleSearchTicket}>
          <Input label="ĐIỂM ĐI" size="md" value={location[0]} rounded color="secondary" />
          <Image
            src="./swap.svg"
            css={{ cursor: 'pointer', mb: '$3' }}
            onClick={handleChangeLocation}
          />
          <Input label="ĐIỂM ĐẾN" size="md" value={location[1]} rounded color="secondary" />
          <Input label="NGÀY" type="date" name="date" rounded color="secondary" />
          <Button rounded type="submit">
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
