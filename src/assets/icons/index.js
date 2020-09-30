import Vue from "vue";

const requireComponent = require.context(
  // The relative path of the components folder
  ".",
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /\w+\.svg$/
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);
  // Get PascalCase name of component
  // Strip the leading `'./`, folder names and extension from the filename
  const componentName = `Icon${fileName.replace(/^\.\/(.*\/)?(.*)\.\w+$/, "$2")}`;

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});
