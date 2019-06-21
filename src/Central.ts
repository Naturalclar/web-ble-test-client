// @ts-ignore
import * as Bluetooth from "react-bluetooth";

export const getAnyDeviceAsync = async () => {
  const isAvailable = await Bluetooth.getAvailabilityAsync();
  if (!isAvailable) {
    return;
  }
  try {
    const device = await Bluetooth.requestDeviceAsync();
    console.log("Success: Got any device: ", device);
  } catch (error) {
    console.log(`Error: Couldn't get any device`, error);
    console.error(`Error: Couldn't get any device`, error);
  }
};

export const getBatteryLevelAsync = async () => {
  const isAvailable = await Bluetooth.getAvailabilityAsync();
  if (!isAvailable) {
    return;
  }

  const options = {
    filters: [{ namePrefix: "Prezen" }]
  };

  try {
    const result = await Bluetooth.requestDeviceAsync(options);
    if (result.type === "cancel") {
      return;
    }
    const { device } = result;

    console.log(`Bluetooth: Got device:`, device);
    if (device.gatt) {
      const server = await device.gatt.connect();
      console.log(`Bluetooth: Got server:`, server);
      const service = await server.getPrimaryService("180a");
      console.log(`Bluetooth: Got service:`, service);
      const characteristic = await service.getCharacteristic("2a22");
      console.log(`Bluetooth: Got characteristic:`, characteristic);
      const value = await characteristic.readValue();
      console.log(`Bluetooth: Got value:`, value);
      const battery = value.getUint8(0);
      console.log(`Success: Got battery:`, battery);
    } else {
      // TODO: Bacon: Can we connect to the GATT or is that a no-op?
      console.error(`Error: connected device did not have a GATT`);
    }
  } catch ({ message }) {
    console.error(`Error: Couldn't get battery level: ${message}`);
  }
};
