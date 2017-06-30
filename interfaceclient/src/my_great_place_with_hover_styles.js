const K_SIZE = 40;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #1d71b8',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#1d71b8',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer',
  outline: 'none',
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #1d71b8',
  color: '#1d71b8'
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};
