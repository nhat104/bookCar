import { Spacer } from '@nextui-org/react';
import VehicleInfo from '../VehicleInfo';

export default function VehicleList() {
  return (
    <div>
      {Array.from(new Array(3)).map((_, index) => (
        <div key={index}>
          <VehicleInfo />
          <Spacer />
        </div>
      ))}
    </div>
  );
}
