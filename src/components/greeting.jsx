import React, { PropTypes } from 'react';

export default function Greeting(props) {
  return (
    <div>
      Hi {props.name}
    </div>
  )
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
