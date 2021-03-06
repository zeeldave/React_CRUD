import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBarSemantiUI from './NavBarSemanticUI';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavBarSemantiUI />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
