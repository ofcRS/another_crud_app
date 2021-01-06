import React, { useContext } from 'react';

import { Icon } from 'components/Icon';

import { Props } from './Link.types';
import { Styled } from './Link.styles';

import { textEditorContext } from '../context';

export const Link: React.FC<Props> = ({ entityKey, ...props }) => {
    const { setUrlModalState, editorState } = useContext(textEditorContext);

    const onSelectLink = () => {
        const data = editorState
            ?.getCurrentContent()
            ?.getEntity(entityKey)
            ?.getData();

        if (data) {
            setUrlModalState?.({
                selectedUrl: data.url,
                callback: url =>
                    editorState
                        .getCurrentContent()
                        .replaceEntityData(entityKey, {
                            url,
                        }),
            });
        }
    };

    return (
        <Styled.Link>
            <Icon iconName="attach" onClick={onSelectLink} />
            {props.children}
        </Styled.Link>
    );
};
