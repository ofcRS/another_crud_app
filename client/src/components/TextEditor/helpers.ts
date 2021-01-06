import { GetEntityStrategy } from './TextEditor.types';

export const getEntityStrategy: GetEntityStrategy = type => (
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
