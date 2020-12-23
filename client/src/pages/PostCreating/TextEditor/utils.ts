import { GetEntityStrategy } from './TextEditor.types';
import { ContentBlock, DraftEntityType } from 'draft-js';
import { Image } from './Image';

export const getEntityStrategy: GetEntityStrategy = (type: DraftEntityType) => (
    block,
    callback,
    contentState
) =>
    block.findEntityRanges(character => {
        const entityKey = character.getEntity();
        if (entityKey === null) return false;
        // Для каждой сущности проверяем удовлетворяет ли она условию
        return contentState.getEntity(entityKey).getType() === type;
    }, callback);

export const blockRenderer = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    console.log(contentBlock.getType());
    if (type === 'image') {
        return {
            component: Image,
            editable: false,
        };
    }
};
