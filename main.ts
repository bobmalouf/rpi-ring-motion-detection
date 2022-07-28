import { RingApi, RingDeviceType, RingDevice } from "ring-client-api";
import * as cp from 'child_process';

const ringApi = new RingApi({
    refreshToken: "INSERT_TOKEN_HERE"
});

class Timer {

    constructor() {
        this.countDown();
    }

    private countDown() {
        setTimeout(() => {
            console.log('turning off');
            cp.exec('vcgencmd display_power 0');
        }, 30000);
    };
}

let timer: Timer;

test();

async function test() {

    const locations = await ringApi.getLocations();
    const devices = await locations[0].getDevices();
    const motionSensor = devices.find(device => device.data.deviceType === RingDeviceType.MotionSensor);
    motionSensor?.onData.subscribe(data => {
        console.log('turning on screen');
        cp.exec('vcgencmd display_power 1');
        timer = new Timer();
    });

}
