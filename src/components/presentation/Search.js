import React from 'react';

export default props => {
  return (
    <div className="form-inputs p-20">
      <div>
        <div className="input-field animated fadeinright">
          <input
            onKeyDown={props.onSearch.bind(this)}
            placeholder="Type podcasts... and click enter to search"
            type="text"
            className="validate"
          />
        </div>
      </div>
    </div>
  );
};
