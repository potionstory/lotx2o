import React from 'react';

class Footer extends React.Component {
    render () {
        return (
            <footer className="footer">
                <div className="footer-inner blue center">
                    Coptyright &copy; 2017 potionstory. All rights reserved.
                    <a className="lighten-1 waves-effect waves-light btn white">
                        <i className="material-icons left">feedback</i>&alpha; 0.5
                    </a>
                </div>
            </footer>
        );
    }
}

export default Footer;
