import React, {PropTypes, Component} from 'react';

import {greatPlaceStyle, greatPlaceStyleHover} from './my_great_place_with_hover_styles.js';

export default class MyGreatPlaceWithHover extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;

    return (
       <button onClick={this.props.onClick} style={style}>
          {this.props.text}
       </button>
    );
  }
}
