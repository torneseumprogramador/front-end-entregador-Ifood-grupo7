export default () => {
  return window.localStorage.getItem("ksToken") || null;
};
