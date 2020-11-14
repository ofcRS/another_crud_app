import { GetEntityStrategy } from './TextEditor.types';
import { DraftEntityMutability } from 'draft-js';

export const getEntityStrategy: GetEntityStrategy = (
    mutability: DraftEntityMutability
) => (block, callback, contentState) =>
    block.findEntityRanges(character => {
        const entityKey = character.getEntity();
        if (entityKey === null) return false;
        // Для каждой сущности проверяем удовлетворяет ли она условию
        return contentState.getEntity(entityKey).getMutability() === mutability;
    }, callback);
