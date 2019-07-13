import { ReactInstance } from "react-360-web";
import KeyboardModule from "react-360-keyboard/KeyboardModule";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [KeyboardModule.addModule],
    ...options
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot("TwitterVR", {
      /* initial props */
    }),
    r360.getDefaultSurface()
  );

  KeyboardModule.setInstance(r360);

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("bg.jpeg"));
}

window.React360 = { init };
