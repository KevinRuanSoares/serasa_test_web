import { PropsWithChildren, useEffect } from 'react';
import { IRootState } from './redux/store';
import store from './redux/store';

function App({ children }: PropsWithChildren) {
    return (
        <div>
            {children}
        </div>
    );
}

export default App;
