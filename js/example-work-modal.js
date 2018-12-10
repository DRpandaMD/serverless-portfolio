import React from "react";


class ExampleWorkModal extends React.Component{

    render() {
        const { example, close, open } = this.props;
        let modalClass = open ? 'modal--open' : 'modal--closed';
        return(
        <div className={"background--skyBlue " + modalClass} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ example.image.src })`}}>
            <span className="color--cloud modal__closeButton" onClick={() => close()}>
                <i className="fa fa-window-close-o"></i>
            </span>
            <div className="color--cloud modal__text">
                <div className="modal__text--inner">
                    <h2 className="modal__title">
                    {example.title}
                    </h2>
                    <a className="color--skyBlue modal__link"
                    href={example.href}>
                    Check it out
                    </a>
                    <p className="modal__description">
                    {example.desc}
                    </p>
                </div>
            </div>
        </div>
        );
    };
};


export default ExampleWorkModal;