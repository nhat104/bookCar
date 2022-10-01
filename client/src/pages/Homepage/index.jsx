import { Input, Loading, styled, Text } from '@nextui-org/react';
import { Button, Container, Dropdown, Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import VehicleList from '../../components/VehicleList';
import { actions, useStore } from '../../store';

export default function HomePage() {
  const [cities, setCities] = useState(['Hà Nội', 'Nam Định']);
  const [fromPlaces, setFromPlaces] = useState([]);
  const [toPlaces, setToPlaces] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectFrom, setSelectFrom] = useState(new Set(['Điểm đi']));
  const [selectTo, setSelectTo] = useState(new Set(['Điểm đến']));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [{ time }, dispatch] = useStore();

  const handleChangeLocation = () => {
    setCities([cities[1], cities[0]]);
    setSelectFrom(selectTo);
    setSelectTo(selectFrom);
    setFromPlaces(toPlaces);
    setToPlaces(fromPlaces);
  };

  const handleSearchVehicle = (e) => {
    e.preventDefault();
    if (selectFrom === 'Điểm đi' || selectTo === 'Điểm đến') {
      setError('Vui lòng chọn điểm đi và điểm đến');
      return;
    }
    setError('');
    const data = new FormData(e.target);
    setLoading(true);

    const placeFromName = selectFrom.keys().next().value;
    const placeToName = selectTo.keys().next().value;
    dispatch(actions.setPlaceFrom(placeFromName));
    dispatch(actions.setPlaceTo(placeToName));
    dispatch(actions.setTime({ ...time, date: data.get('date') }));
    const body = {
      placeFromId: fromPlaces.find((place) => place.name === placeFromName).id,
      placeToId: toPlaces.find((place) => place.name === placeToName).id,
      date: data.get('date'),
    };
    baseApiRequest.post('/get-car', body).then((res) => {
      setLoading(false);
      setVehicles(res.data);
    });
  };

  useEffect(() => {
    baseApiRequest
      .post('/get-place', { city: cities[0] })
      .then((res) => setFromPlaces(res.data));
    baseApiRequest
      .post('/get-place', { city: cities[1] })
      .then((res) => setToPlaces(res.data));
  }, []);

  return (
    <Wrapper>
      <Image
        showSkeleton
        css={{ position: 'fixed', zIndex: -1 }}
        src="./home.png"
        alt="Default Image"
        objectFit="cover"
      />
      <ContainerStyled sm>
        <Text h1 color="warning">
          Book Car
        </Text>
        <Text as="div" css={{ dflex: 'center', gap: '$10' }}>
          <Text css={{ fs: '$3xl', w: '125px', color: '#fff' }}>
            {cities[0]}
          </Text>
          <Image
            src="./swap.svg"
            css={{ cursor: 'pointer' }}
            onClick={handleChangeLocation}
          />
          <Text css={{ fs: '$3xl', w: '125px', color: '#fff' }}>
            {cities[1]}
          </Text>
        </Text>
        <InputGroup as="form" onSubmit={handleSearchVehicle}>
          <Dropdown>
            <Dropdown.Button rounded flat color="primary">
              {selectFrom}
            </Dropdown.Button>
            <Dropdown.Menu
              color="primary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectFrom}
              onSelectionChange={setSelectFrom}
            >
              {fromPlaces.map((place) => (
                <Dropdown.Item css={{ w: '500px' }} key={place.name}>
                  {place.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button rounded flat color="primary">
              {selectTo}
            </Dropdown.Button>
            <Dropdown.Menu
              color="primary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectTo}
              onSelectionChange={setSelectTo}
            >
              {toPlaces &&
                toPlaces.map((place) => (
                  <Dropdown.Item css={{ w: '500px' }} key={place.name}>
                    {place.name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <Input
            aria-label="date"
            type="date"
            name="date"
            required
            rounded
            color="warning"
            min={new Date().toISOString().split('T')[0]}
          />
          <Button rounded type="submit">
            Tìm vé
            {loading && (
              <Loading
                type="points"
                css={{ pl: 4 }}
                color="currentColor"
                size="sm"
              />
            )}
          </Button>
        </InputGroup>
        {error && (
          <Input
            width="214px"
            readOnly
            aria-label="error"
            value={error}
            status="error"
          />
        )}
        <VehicleList vehicles={vehicles} />
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
