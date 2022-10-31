import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error) {
        if (error) this.setState({ hasError: true })
    }

    render() {
        return this.state.hasError ? (
            <h1 className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                Something went wrong !!!
            </h1>
        ) : (
            this.props.children
        )
    }
}

export default ErrorBoundary
