import React from 'react';

function isElemVisible(options) {
    const ref = React.useRef();
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            console.log("IN THE OBSEVER HER ETHE RATIO ", entry.intersectionRatio)
            if(entry.intersectionRatio === .01) {
                callback();
            }
        }, options);

        if(ref.current){
            observer.observe(ref.current)
        }

    }, []);

    return [ref, visible];
}
