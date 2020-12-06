import React, { useCallback, useRef, useState } from 'react';
import {
    EditorState,
    Editor,
    DraftHandleValue,
    RichUtils,
    DraftInlineStyleType,
    Modifier,
    convertToRaw,
    CompositeDecorator,
} from 'draft-js';
import { useField } from 'formik';

import { BlockType, Props } from './TextEditor.types';
import { Styled } from './TextEditor.styles';

import { inlineStylesControls, blockTypeControls } from './consts';

import 'draft-js/dist/Draft.css';

import { Token } from './Token';
import { getEntityStrategy } from './utils';
import { LinkModal } from './LinkModal';

import { useEffectOnce } from 'hooks/useEffectOnce';

export const TextEditor: React.FC<Props> = ({ name }) => {
    const [_, { value: editorState }, { setValue: setEditorState }] = useField<
        EditorState
    >(name);
    const editorRef = useRef<Editor>(null);

    const [linkModalCallback, setLinkModalCallback] = useState<
        ((url: string) => void) | null
    >(null);

    useEffectOnce(() => {
        const decorator = new CompositeDecorator([
            {
                component: Token,
                strategy: getEntityStrategy('LINK'),
            },
        ]);
        setEditorState(EditorState.set(editorState, { decorator }));
    });

    const applyLink = () => {
        setLinkModalCallback(() => (url: string) => {
            const contentState = editorState.getCurrentContent();
            const selectionState = editorState.getSelection();
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                {
                    url,
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
        });
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
        [setEditorState]
    );

    const toggleInlineStyle = (style: DraftInlineStyleType) =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));

    const toggleBlockType = (type: string) =>
        setEditorState(RichUtils.toggleBlockType(editorState, type));

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

    const onSubmitLinkModal = (url: string) => {
        linkModalCallback?.(url);
        setLinkModalCallback(null);
    };

    return (
        <Styled.TextEditor>
            <LinkModal
                onSubmit={onSubmitLinkModal}
                open={!!linkModalCallback}
                onClose={() => setLinkModalCallback(null)}
            />
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
                <Styled.ControlButton onClick={applyLink}>
                    Link
                </Styled.ControlButton>
                <Styled.ControlButton onClick={logContent}>
                    Log
                </Styled.ControlButton>
            </Styled.ControlsWrapper>
            <Editor
                ref={editorRef}
                tabIndex={3}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
                customStyleMap={Styled.lineStyleMap}
            />
        </Styled.TextEditor>
    );
};
