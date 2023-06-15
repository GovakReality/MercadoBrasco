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
      //source.setRenderSize(480, 640);

      session.play("live");
        
  } catch (error) {
      console.error(error);
  }
});