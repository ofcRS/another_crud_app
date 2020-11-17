import React, { useCallback, useRef, useState } from 'react';
import {
    EditorState,
    Editor,
    DraftHandleValue,
    RichUtils,
    DraftInlineStyleType,
    Modifier,
    CompositeDecorator,
    convertToRaw,
} from 'draft-js';

import { BlockType, Props } from './TextEditor.types';
import { Styled } from './TextEditor.styles';
import { getEntityStrategy } from './utils';
import { inlineStylesControls, blockTypeControls } from './consts';

import 'draft-js/dist/Draft.css';
import { Token } from './Token';

export const TextEditor: React.FC<Props> = () => {
    const editorRef = useRef<Editor>(null);
    const [editorState, setEditorState] = useState<EditorState>(() => {
        const decorator = new CompositeDecorator([
            {
                component: Token,

                strategy: getEntityStrategy('IMMUTABLE'),
            },
        ]);
        return EditorState.createEmpty(decorator);
    });

    const applyLink = () => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'IMMUTABLE',
            {
                url: 'http://www.ozon.com',
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const contentStateWithLink = Modifier.applyEntity(
            contentStateWithEntity,
            selectionState,
            entityKey
        );
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithLink,
        });
        setEditorState(newEditorState);
    };

    const getEntity = () => {
        const contentState = editorState.getCurrentContent();
        const blockWithLinkAtBeginning = contentState.getFirstBlock();
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);
        const linkInstance = contentState.getEntity(linkKey);
        const { url } = linkInstance.getData();
    };

    const handleKeyCommand = useCallback(
        (command: string, editorState: EditorState): DraftHandleValue => {
            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setEditorState(newState);
                return 'handled';
            }

            return 'not-handled';
        },
        []
    );

    const toggleInlineStyle = (style: DraftInlineStyleType) => {
        setEditorState(prevState =>
            RichUtils.toggleInlineStyle(prevState, style)
        );
    };

    const toggleBlockType = (type: string) => {
        setEditorState(prevState => RichUtils.toggleBlockType(prevState, type));
    };

    const logContent = () => {
        console.log(convertToRaw(editorState.getCurrentContent()));

        // getEntity();
    };

    const isTypeSelected = (type: BlockType) => {
        const anchorKey = editorState.getSelection().getAnchorKey();
        const currentBlock = editorState
            .getCurrentContent()
            .getBlockForKey(anchorKey);
        return currentBlock.getType() === type;
    };

    return (
        <Styled.TextEditor>
            <Styled.ControlsWrapper>
                {blockTypeControls.map(({ label, type }) => (
                    <Styled.ControlButton
                        selected={isTypeSelected(type)}
                        onClick={() => toggleBlockType(type)}
                        key={type}
                    >
                        {label}
                    </Styled.ControlButton>
                ))}
                {inlineStylesControls.map(({ inlineStyle, label }) => (
                    <Styled.ControlButton
                        key={inlineStyle}
                        onClick={() => toggleInlineStyle(inlineStyle)}
                    >
                        {label}
                    </Styled.ControlButton>
                ))}
                <button onClick={applyLink}>Link</button>
                <button onClick={logContent}>Log</button>
            </Styled.ControlsWrapper>
            <Editor
                ref={editorRef}
                tabIndex={2}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
                customStyleMap={Styled.lineStyleMap}
            />
        </Styled.TextEditor>
    );
};
