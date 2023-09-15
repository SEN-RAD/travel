import React, { ChangeEvent } from 'react';
import './SearchBox.css';

interface Props {
	onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
	fetchOnKeyDown:  (event: React.KeyboardEvent<HTMLInputElement>) => void;
	fetchOnClick: () => void;
}

const SearchBox: React.FC<Props> = ({ onInputChange, fetchOnKeyDown, fetchOnClick }) => {
   
    return (
        <div>
            <div className='flex justify-start'>
                <img className="logo" src={require('./logo.png')} alt="Logo" />
            </div>
            <div className='flex flex-column items-center'>
                <h1> Where are you going? </h1>
                <div className='flex items-center'>
                    <input
                        onChange={onInputChange}
                        onKeyDown={fetchOnKeyDown}
                        placeholder='Type in city'
                    />
                    <button onClick={fetchOnClick}> Go!</button> <br />
                </div>
                <p> The name of the city must be in English. </p>
            </div>
        </div>
    );
};

export default SearchBox;