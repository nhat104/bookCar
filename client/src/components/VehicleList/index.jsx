import { Spacer } from '@nextui-org/react';
import VehicleInfo from '../VehicleInfo';

// Hiển thị danh sách các tuyến xe có thể đặt
export default function VehicleList({ vehicles }) {
  return (
    <div>
      {vehicles.length &&
        vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <VehicleInfo vehicle={vehicle} />
            <Spacer />
          </div>
        ))}
    </div>
  );
}
