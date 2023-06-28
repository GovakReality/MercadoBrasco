import {} from 'dotenv/config';
import { bootstrapCameraKit, createMediaStreamSource, Transform2D } from "@snap/camera-kit";

const apiToken = process.env.APITOKEN;
const groupId = process.env.GROUPID;
const lensId = process.env.LENSID;

let source;

// when window load
window.addEventListener("load", async () => {

  // check if camera permission is granted
  navigator.permissions
  .query({ name: "camera" })
  .then((permissionStatus) => {
    permissionHandle(permissionStatus.state);
    permissionStatus.onchange = () => {
      permissionHandle(permissionStatus.state);
    };
  });
        
  // start snapchat lens
  try {
    const cameraKit = await bootstrapCameraKit({ apiToken: apiToken });

    const canvas = document.getElementById("canvas-output");
    const session = await cameraKit.createSession(canvas);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    source = createMediaStreamSource(stream, {
        transform: Transform2D.MirrorX,
        cameraType: "back",
    });

    //setRenderSize();

    session.setSource(source);

    const lens = await cameraKit.lensRepository.loadLens(lensId, groupId);
    await session.applyLens(lens);

    await session.play();

  } catch (error) {
    console.error(error);
  }

});

// when window is resized
window.addEventListener("resize", async () => {
  try {
    setRenderSize();        
  } catch (error) {
    console.error(error);
  }
});

// helper functions
function setRenderSize() {
  let h = document.documentElement.clientHeight;
  let w = document.documentElement.clientWidth;
  //let w = getWidth(h);
  source.setRenderSize(w, h);
  //resolutionDebug();
}

function getWidth(value) {
  let ratio = (9/16);
  let width = value * ratio;
  return Math.round(width);
}

function permissionHandle(status) {

  OSHandle();

  if(status == "granted"){

    // hide loader gif
    document.getElementById('loader').style.display = 'none';
    // hide warning message
    document.getElementById('warning-camera').style.display = 'none';

  } else if(status == "denied"){

    // hide loader gif
    document.getElementById('loader').style.display = 'none';
    //show warning message
    document.getElementById('warning-camera').style.display = 'block';

  } else { //status == prompt

    // show loader gif
    document.getElementById('loader').style.display = 'block';

  }
}

function OSHandle() {
  if(getMobileOS() == "iOS"){
    document.getElementById('warning-iphone').style.display = 'block';
    document.getElementById('warning-android').style.display = 'none';
  }  else { 
    document.getElementById('warning-android').style.display = 'block';
    document.getElementById('warning-iphone').style.display = 'none';
  }
}

function getMobileOS() {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) {
    return "Android"
  }
  else if (/iPad|iPhone|iPod/.test(ua) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return "iOS"
  }
  return "Other"
}

function resolutionDebug() {

  //--- 9:16 resolutions ---//
  //(2160 X 3840)
  //(1440 X 2560) 
  //(1080 X 1920) //FHD
  //(720 X 1280)  //SD
  //(540 X 960)   //qHD
  //(480 X 854)   //FWVGA
  //(360 X 640)   //nHD

  let size = '<br> screen size: ' + window.screen.width.toString() + ' x ' + window.screen.height.toString();
  let avail = '<br> avail: ' + window.screen.availWidth.toString() + ' x ' + window.screen.availHeight.toString();
  let outer = '<br> window outer: ' + window.outerWidth.toString() + ' x ' + window.outerHeight.toString();
  let inner = '<br> window inner: ' + window.innerWidth.toString() + ' x ' + window.innerHeight.toString();
  let client = '<br> document client: ' + document.documentElement.clientWidth.toString() + ' x ' + document.documentElement.clientHeight.toString();

  console.log(size + avail + outer + inner + client);

  document.getElementById("debug").innerHTML = size + avail + outer + inner + client;
}