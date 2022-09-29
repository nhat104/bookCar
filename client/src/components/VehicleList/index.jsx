import { Spacer } from '@nextui-org/react';
import { useState } from 'react';
import VehicleInfo from '../VehicleInfo';

export default function VehicleList({ vehicles, placeFrom, placeTo }) {
  const [chooseVehicle, setChooseVehicle] = useState();
  return (
    <div>
      {vehicles &&
        vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <VehicleInfo
              vehicle={vehicle}
              placeFrom={placeFrom}
              placeTo={placeTo}
              chooseVehicle={chooseVehicle}
              setChooseVehicle={setChooseVehicle}
            />
            <Spacer />
          </div>
        ))}
    </div>
  );
}
