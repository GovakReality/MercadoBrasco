import 'dotenv/config';
import { bootstrapCameraKit, createUserMediaSource, Transform2D } from "@snap/camera-kit";

const apiToken = process.env.APITOKEN;
const groupId = process.env.GROUPID;
const lensId = process.env.LENSID;

window.addEventListener("load", async () => {
  try {
      const cameraKit = await bootstrapCameraKit({ apiToken: apiToken });
      const session = await cameraKit.createSession();

      session.events.addEventListener("error", (event) => console.error(event.detail));

      document.getElementById('canvas-output').replaceWith(session.output.live);

      const lens = await cameraKit.lensRepository.loadLens(lensId, groupId);

      //console.log(lens);

      session.applyLens(lens);

      const source = await createUserMediaSource();
      await session.setSource(source);
      source.setTransform(Transform2D.MirrorX);

      // 9:16 resolutions
      //source.setRenderSize(1080, 1920);  //FHD
      //source.setRenderSize(720, 1280);  //SD
      source.setRenderSize(540, 960);   //qHD
      //source.setRenderSize(480, 854);   //FWVGA
      //source.setRenderSize(360, 640);   //nHD

      session.play("live");
        
  } catch (error) {
      console.error(error);
  }
});