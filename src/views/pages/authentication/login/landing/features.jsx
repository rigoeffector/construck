import React from "react";

export const Features = (props) => {
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h5 style={{
color: '#000',
fontSize: '24px',
fontWeight: '500',
lineHeight: '159%' ,
textTransform: 'lower-case'

          }}>You will be in good company</h5>
        </div>
        <div className="row" style={{padding: '20px'}}>
        <img
                                    src="/img/frame.png"
                                    alt=""
                                    style={{
                                     
                                        height: '120px'
                                    }}
                                />
        </div>
      </div>
    </div>
  );
};
