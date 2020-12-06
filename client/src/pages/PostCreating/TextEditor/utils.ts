import { GetEntityStrategy } from './TextEditor.types';
import { DraftEntityType } from 'draft-js';

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
