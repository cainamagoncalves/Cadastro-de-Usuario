import './Main.css'
import './Header'
import React from 'react'
import Header from './Header'

export default props =>
    <React.Fragment>
        <Header {...props} />
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children} {/*Tags filho*/}
            </div>
        </main>
    </React.Fragment>