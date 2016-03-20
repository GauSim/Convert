import * as React from 'react';
var fetch: (url: string) => Promise<{ status: number, json: () => any }> = require('universal-fetch');


function startJob(url: string) {
    return fetch(`/api/convert/?type=wav&url=${url}`)
        .then(r => {
            if (r.status !== 200) {
                throw new Error('Bad response from server');
            }
            return r.json();
        });
}


const demoFile = "http://www.html5tutorial.info/media/vincent.mp3"

class ConvertForm extends React.Component<{}, {}> {

    state: { inputURL: string, isLoading: boolean, downloadURL: string } = { inputURL: demoFile, isLoading: false, downloadURL: null };
    inputField: HTMLInputElement;


    handleChange = (event) => {
        if (this.inputField.validity.valid) {
            this.setState({ inputURL: event.target.value });
        }
    }

    handleClick = () => {
        const url = this.state.inputURL + `?${Date.now()}`;
        this.setState({ isLoading: true });
        startJob(url)
            .then((result: { id: string, downloadURL: string; deleteURL: string; }) => {
                console.log(result);
                this.setState({ inputURL: null, downloadURL: result.downloadURL });
            })
            .catch(r => console.log(r))
            .then(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        return <div>

            <div className='form-group'>
                <label htmlFor='url-input'>enter url: </label>
                <input
                    ref={(ref) => this.inputField = ref}
                    onChange={ this.handleChange }
                    readOnly={ this.state && this.state.isLoading }
                    value={ this.state ? this.state.inputURL : '' }
                    type='url'
                    className='form-control'
                    id='url-input'
                    placeholder={ demoFile } />
            </div>
            <input
                disabled={ this.state.isLoading || !this.state.inputURL }
                type="button"
                value="to wav"
                className='btn btn-primary'
                onClick={this.handleClick}
                />

            { this.state.downloadURL ? <a className="btn btn-default" href={ this.state.downloadURL } target='_blank' > download </a> : '' }

        </div>;
    }
}



const Page = <div className='container'><h1> converter </h1> <ConvertForm/> </div>;
export { Page };


