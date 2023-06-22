import {} from 'dotenv/config';
import { bootstrapCameraKit, createUserMediaSource, Transform2D } from "@snap/camera-kit";

const apiToken = process.env.APITOKEN;
const groupId = process.env.GROUPID;
const lensId = process.env.LENSID;

let source;

window.addEventListener("load", async () => {
  document.getElementById('loader').remove();
  try {
    const cameraKit = await bootstrapCameraKit({ apiToken: apiToken });
    const session = await cameraKit.createSession();

    session.events.addEventListener("error", (event) => console.error(event.detail));

    document.getElementById('canvas-output').replaceWith(session.output.live);

    const lens = await cameraKit.lensRepository.loadLens(lensId, groupId);

    //console.log(lens);

    session.applyLens(lens);

    source = await createUserMediaSource();
    await session.setSource(source);
    source.setTransform(Transform2D.MirrorX);
    setRenderSize();

    session.play("live");
        
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener("resize", async () => {
  try {
    setRenderSize();        
  } catch (error) {
    console.error(error);
  }
});

function setRenderSize() {
  let screenWidth = window.screen.availWidth;

  if(screenWidth < 576) {
    resolutionDebug('< 576');
    source.setRenderSize(360, 640);

  } else if (screenWidth < 768) {
    resolutionDebug('< 768');
    source.setRenderSize(480, 854);

  } else if (screenWidth < 992) {
    resolutionDebug('< 992');
    source.setRenderSize(540, 960);

  } else if (screenWidth < 1200) {
    resolutionDebug('< 1200');
    source.setRenderSize(720, 1280);

  } else if (screenWidth < 1536) {
    resolutionDebug('< 1536');
    source.setRenderSize(1080, 1920);   

  } else if (screenWidth < 1920) {
    resolutionDebug('< 1920');
    source.setRenderSize(1440, 2560);  

  } else {
    resolutionDebug('> 1920');
    source.setRenderSize(2160, 3840);    
  }

  //--- 9:16 resolutions ---//
  //(2160 X 3840)
  //(1440 X 2560) 
  //(1080 X 1920) //FHD
  //(720 X 1280)  //SD
  //(540 X 960)   //qHD
  //(480 X 854)   //FWVGA
  //(360 X 640)   //nHD
}

function setRenderSize2() {
  let screenWidth = window.screen.availWidth;

  if(screenWidth < 576) {
    resolutionDebug('< 576');
    source.setRenderSize(576, 1024);

  } else if (screenWidth < 765) {
    resolutionDebug('< 765');
    source.setRenderSize(765, 1360);

  } else if (screenWidth < 990) {
    resolutionDebug('< 990');
    source.setRenderSize(990, 1760);

  } else if (screenWidth < 1224) {
    resolutionDebug('< 1224');
    source.setRenderSize(1224, 2176);

  } else if (screenWidth < 1530) {
    resolutionDebug('< 1530');
    source.setRenderSize(1530, 2720);   

  } else if (screenWidth < 1908) {
    resolutionDebug('< 1908');
    source.setRenderSize(1908, 3392);  

  } else {
    resolutionDebug('> 1920');
    source.setRenderSize(2160, 3840);    
  }

  //--- 9:16 resolutions ---//
  //(2160 X 3840)
  //(1440 X 2560) 
  //(1080 X 1920) //FHD
  //(720 X 1280)  //SD
  //(540 X 960)   //qHD
  //(480 X 854)   //FWVGA
  //(360 X 640)   //nHD
}

function resolutionDebug(val) {
  console.log(val);
  document.getElementById("debug").innerHTML = val.toString();
}