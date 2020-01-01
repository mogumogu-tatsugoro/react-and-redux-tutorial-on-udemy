const setScriptTag = () => {
  const el = document.createElement('script');
  el.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${process.env.GEOLOCATION_API_KEY}`);
  document.head.appendChild(el);
};

export default setScriptTag
