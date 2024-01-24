import type {ForwardedRef, RefObject} from 'react';
import React, {forwardRef, useEffect} from 'react';
import E2EClient from '@libs/E2E/client';
import type {ComposerRef} from '@pages/home/report/ReportActionCompose/ReportActionCompose';
import type {ComposerWithSuggestionsProps} from './ComposerWithSuggestions';
import ComposerWithSuggestions from './ComposerWithSuggestions';

let rerenderCount = 0;
const getRerenderCount = () => rerenderCount;
const resetRerenderCount = () => {
    rerenderCount = 0;
};

function IncrementRenderCount() {
    rerenderCount += 1;
    return null;
}

function ComposerWithSuggestionsE2e(props: ComposerWithSuggestionsProps, ref: ForwardedRef<ComposerRef | null>) {
    // Eventually Auto focus on e2e tests
    useEffect(() => {
        if ((E2EClient.getCurrentActiveTestConfig()?.reportScreen?.autoFocus ?? false) === false) {
            return;
        }

        // We need to wait for the component to be mounted before focusing
        setTimeout(() => {
            if (!(ref as RefObject<ComposerRef>)?.current) {
                return;
            }

            (ref as RefObject<ComposerRef>).current?.focus(true);
        }, 1);
    }, [ref]);

    return (
        <ComposerWithSuggestions
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            ref={ref}
        >
            {/* Important: 
                    this has to be a child, as this container might not
                    re-render while the actual ComposerWithSuggestions will.
            */}
            <IncrementRenderCount />
        </ComposerWithSuggestions>
    );
}

ComposerWithSuggestionsE2e.displayName = 'ComposerWithSuggestionsE2e';

export default forwardRef(ComposerWithSuggestionsE2e);
export {getRerenderCount, resetRerenderCount};
