import React, { useCallback, useRef, useState } from 'react';
import {
    EditorState,
    DraftHandleValue,
    RichUtils,
    DraftInlineStyleType,
    Modifier,
    convertToRaw,
    CompositeDecorator,
    AtomicBlockUtils,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import { useField } from 'formik';

import { BlockType, LinkModalState, Props } from './TextEditor.types';
import { Styled } from './TextEditor.styles';

import { inlineStylesControls, blockTypeControls } from './consts';

import 'draft-js/dist/Draft.css';

import { Token } from './Token';
import { getEntityStrategy } from './utils';
import { UrlModal } from './UrlModal';

import { useEffectOnce } from 'hooks/useEffectOnce';
import { textEditorContext } from './context';
import { Icon } from 'components/Icon';

const imagePlugin = createImagePlugin();

export const TextEditor: React.FC<Props> = ({ name }) => {
    const [_, { value: editorState }, { setValue: setEditorState }] = useField<
        EditorState
    >(name);
    const editorRef = useRef<Editor>(null);

    const [urlModalState, setUrlModalState] = useState<LinkModalState>(null);

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
        const callback = (url: string) => {
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
        <textEditorContext.Provider
            value={{
                urlModalState,
                setUrlModalState,
                editorState,
            }}
        >
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
                <Editor
                    ref={editorRef}
                    tabIndex={3}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                    customStyleMap={Styled.lineStyleMap}
                    plugins={[imagePlugin]}
                />
            </Styled.TextEditor>
        </textEditorContext.Provider>
    );
};
