import React, { useCallback, useState } from 'react';
import {
    EditorState,
    DraftHandleValue,
    RichUtils,
    DraftInlineStyleType,
    Modifier,
    convertToRaw,
    AtomicBlockUtils,
} from 'draft-js';

import { useField } from 'formik';

import { TextEditor as CommonTextEditor } from 'components/TextEditor';

import { BlockType, LinkModalState, Props } from './TextEditor.types';
import { Styled } from './TextEditor.styles';

import { inlineStylesControls, blockTypeControls } from './consts';

import { UrlModal } from './UrlModal';

import { Icon } from 'components/Icon';

import 'draft-js/dist/Draft.css';

export const TextEditor: React.FC<Props> = ({ name }) => {
    const [_, { value: editorState }, { setValue: setEditorState }] = useField<
        EditorState
    >(name);

    const [urlModalState, setUrlModalState] = useState<LinkModalState>(null);

    const applyLink = () => {
        const callback = (url: string) => {
            const contentState = editorState.getCurrentContent();
            const selectionState = editorState.getSelection();
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                {
                    src: url,
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
        setUrlModalState({
            callback,
            selectedUrl: '',
        });
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
        urlModalState?.callback(url);
        setUrlModalState(null);
    };

    const handleClickImageIcon = () => {
        setUrlModalState({
            selectedUrl: '',
            callback: url => {
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    'IMAGE',
                    'IMMUTABLE',
                    { src: url }
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, {
                    currentContent: contentStateWithEntity,
                });
                setEditorState(
                    AtomicBlockUtils.insertAtomicBlock(
                        newEditorState,
                        entityKey,
                        ' '
                    )
                );
            },
        });
    };

    return (
        <Styled.TextEditor>
            <UrlModal
                initialValues={{
                    url: urlModalState?.selectedUrl || '',
                }}
                onSubmit={onSubmitLinkModal}
                open={urlModalState !== null}
                onClose={() => setUrlModalState(null)}
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
                <Styled.ControlButton onClick={handleClickImageIcon}>
                    <Icon iconName="gallery" />
                </Styled.ControlButton>
            </Styled.ControlsWrapper>
            <CommonTextEditor
                setEditorState={setEditorState}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                urlModalState={urlModalState}
                setUrlModalState={setUrlModalState}
                customStyleMap={Styled.lineStyleMap}
                tabIndex={2}
            />
        </Styled.TextEditor>
    );
};
