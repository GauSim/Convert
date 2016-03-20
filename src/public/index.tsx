import * as React from 'react';
const fetch: (url: string) => Promise<{ status: number, headers: any; type: "basic", statusText: string, body: any, json: () => any }> = require('universal-fetch');


function startJob(type: string, url: string) {
    return fetch(`/api/convert/?type=${type}&url=${url}`)
        .then(r => {
            if (r.status !== 200) {
                throw new Error('Bad response from server');
            }
            return r.json();
        });
}


const demoFile = "http://www.html5tutorial.info/media/vincent.mp3"
const validate = (file) => (file && file.indexOf('mp3') > -1);


interface IConvertFormState {
    inputURL: string;
    isLoading: boolean;
    downloadURL: string;
    isValid: boolean;
}

class ConvertForm extends React.Component<{}, {}> {

    state: IConvertFormState = { inputURL: demoFile, isLoading: false, downloadURL: null, isValid: validate(demoFile) };
    inputField: HTMLInputElement = null;

    handleChange = (event) => {
        const isValid = (this.inputField.validity.valid && validate(event.target.value));
        this.setState({ inputURL: event.target.value, isValid: isValid });
    }

    handleClick = () => {
        const url = this.state.inputURL + `?${Date.now()}`;
        this.setState({ isLoading: true });

        startJob('wav', url)
            .then((result: { id: string, downloadURL: string; deleteURL: string; }) => {
                this.setState({ inputURL: null, isValid: false, downloadURL: result.downloadURL });
            })
            .catch(r => console.error(r))
            .then(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        return <div>
            { this.state.isValid ? null : 'error' }
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
                onClick={ this.handleClick }
                />

            { this.state.downloadURL ? <a className="btn btn-default" href={ this.state.downloadURL } target='_blank' > download </a> : '' }

        </div>;
    }
}



const Page = <div className='container'><h1> converter </h1> <ConvertForm/> </div>;
export { Page };


