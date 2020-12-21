import React, { useContext } from 'react';

import { Icon } from 'components/Icon';

import { Styled } from './TextEditor.styles';
import { TokenProps } from './TextEditor.types';
import { textEditorContext } from './context';

export const Token: React.FC<TokenProps> = ({
    offsetKey,
    children,
    ...props
}) => {
    const { setLinkModalState, editorState } = useContext(textEditorContext);

    const onSelectLink = () => {
        const data = editorState
            ?.getCurrentContent()
            ?.getEntity(props.entityKey)
            ?.getData();

        if (data) {
            setLinkModalState({
                selectedUrl: data.url,
                callback: url =>
                    editorState
                        .getCurrentContent()
                        .replaceEntityData(props.entityKey, {
                            url,
                        }),
            });
        }
    };

    return (
        <Styled.Token data-offset-key={offsetKey}>
            <Icon iconName="attach" onClick={onSelectLink} />
            {children}
        </Styled.Token>
    );
};
