import * as React from 'react';
const { Component } = React;


class ConvertForm extends Component<{}, {}> {
    inputField: HTMLInputElement = null;

    handleClick = () => {
        if (this.inputField.validity.valid) {
            console.log(this.inputField.value);
        }
    }

    render() {
        return <div>
            <div className='form-group'>
                <label htmlFor='url-input'>enter url: </label>
                <input ref={(ref) => this.inputField = ref} type='url' className='form-control' id='url-input' placeholder='http:// ... ' />
            </div>
            <input
                disabled={ true }
                type="button"
                value="Focus the text input"
                className='btn btn-primary'
                onClick={this.handleClick}
                />
        </div>;
    }
}



const Page = <div className='container'><h1> converter </h1> <ConvertForm/> </div>;
export { Page };


