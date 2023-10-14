import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center">
            <strong role="status" className='mx-1'>Loading...</strong>
            <div className="spinner-border" aria-hidden="true"></div>
        </div>
      </div>
    )
  }
}
