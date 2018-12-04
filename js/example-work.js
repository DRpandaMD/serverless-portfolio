import React from 'react';
import ExampleWorkModal from './example-work-modal'

class ExampleWork extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            // we want to manage the state of our model open or close
            // and we want to manage which selection (bubble) is selected
            'modalOpen': false, // we want to leave it closed
            'selectedExample': this.props.work[0] // our default selection
        }

        //object binding
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    };

    // logic to control modal state and selection based on button events
    openModal(evt, example)
    {
        this.setState({
            'modalOpen' : true,
            'selectedExample' : example
        });
    };

    closeModal(evt)
    {
        this.setState({
            'modalOpen' : false
        });
    };
    render () {
        return(
            <span> //normally we can only return ONE JSX element
                <section className="section section--alignCentered section--description">
                { this.props.work.map( (example, idx) => {
                    //console.log("Inside this.props.work.map")
                    return(
                        <ExampleWorkBubble example={example} key={idx}
                            openModal={this.openModal}/>
                        )
                    })
                };
                </section>
                <ExampleWorkModal example={this.state.selectedExample}
                    open={this.state.modalOpen} close={this.state.modalClose}/>
            </span> // but if we wrap everyting in a span element we can
            // return both our Example Work bubbles and the modals
        );
    }
};

class ExampleWorkBubble extends React.Component {
    render () {
        let example = this.props.example;
        return (
            <div className="section__exampleWrapper"
            onClick={ (evt) => this.props.openModal(evt, example)}>
              <div className="section__example">
                <img alt={example.image.desc}
                     className="section__exampleImage"
                     src={example.image.src}/>
                <dl className="color--cloud">
                  <dt className="section__exampleTitle section__text--centered">
                    Work Example
                  </dt>
                  <dd></dd>
                </dl>
              </div>
            </div>
        )
    }
};
export default ExampleWork;
export { ExampleWorkBubble }; // this will be asked for and used in our jest tests